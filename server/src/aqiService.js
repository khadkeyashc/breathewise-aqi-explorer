const axios = require('axios');
const config = require('./config');
const LruCache = require('./cache');

const cache = new LruCache(config.cacheMaxEntries, config.cacheTtlMs);
const BASE_URL = 'https://api.waqi.info';

function buildAqiCategory(aqi) {
  if (aqi == null || Number.isNaN(Number(aqi))) {
    return {
      code: 'unknown',
      label: 'Unknown',
      color: '#9ca3af',
      message: 'No AQI data available'
    };
  }
  const value = Number(aqi);
  if (value <= 50) {
    return {
      code: 'good',
      label: 'Good',
      color: '#22c55e',
      message: 'Air quality is considered satisfactory.'
    };
  }
  if (value <= 100) {
    return {
      code: 'moderate',
      label: 'Moderate',
      color: '#eab308',
      message: 'Air quality is acceptable; some pollutants may be a concern for a few sensitive people.'
    };
  }
  if (value <= 150) {
    return {
      code: 'unhealthy-sensitive',
      label: 'Unhealthy for Sensitive Groups',
      color: '#f97316',
      message: 'Members of sensitive groups may experience health effects.'
    };
  }
  if (value <= 200) {
    return {
      code: 'unhealthy',
      label: 'Unhealthy',
      color: '#ef4444',
      message: 'Everyone may begin to experience health effects.'
    };
  }
  if (value <= 300) {
    return {
      code: 'very-unhealthy',
      label: 'Very Unhealthy',
      color: '#a855f7',
      message: 'Health warnings of emergency conditions.'
    };
  }
  return {
    code: 'hazardous',
    label: 'Hazardous',
    color: '#7f1d1d',
    message: 'Health alert: everyone may experience serious health effects.'
  };
}

function mapSearchResult(raw) {
  return {
    uid: raw.uid,
    aqi: raw.aqi === '-' ? null : Number(raw.aqi),
    stationName: raw.station && raw.station.name ? raw.station.name : null,
    geo: raw.station && raw.station.geo
      ? { lat: raw.station.geo[0], lon: raw.station.geo[1] }
      : null,
    stationUrl: raw.station && raw.station.url ? raw.station.url : null,
    time: raw.time && raw.time.stime ? raw.time.stime : null,
    timezone: raw.time && raw.time.tz ? raw.time.tz : null
  };
}

function mapFeedResult(raw) {
  const data = raw.data;
  const iaqi = data.iaqi || {};
  const city = data.city || {};
  const time = data.time || {};
  const aqi = data.aqi;

  const pollutants = {
    pm25: iaqi.pm25 ? iaqi.pm25.v : null,
    pm10: iaqi.pm10 ? iaqi.pm10.v : null,
    o3: iaqi.o3 ? iaqi.o3.v : null,
    no2: iaqi.no2 ? iaqi.no2.v : null,
    so2: iaqi.so2 ? iaqi.so2.v : null,
    co: iaqi.co ? iaqi.co.v : null
  };

  const weather = {
    temperature: iaqi.t ? iaqi.t.v : null,
    humidity: iaqi.h ? iaqi.h.v : null,
    pressure: iaqi.p ? iaqi.p.v : null,
    wind: iaqi.w ? iaqi.w.v : null
  };

  const category = buildAqiCategory(aqi);

  return {
    city: {
      name: city.name || null,
      url: city.url || null,
      geo: city.geo
        ? { lat: city.geo[0], lon: city.geo[1] }
        : null
    },
    aqi,
    category,
    dominantPollutant: data.dominentpol || null,
    pollutants,
    weather,
    time: {
      iso: time.iso || null,
      localTime: time.s || null,
      timezone: time.tz || null
    },
    attributions: Array.isArray(data.attributions) ? data.attributions : []
  };
}

async function searchCities(query) {
  const trimmed = String(query || '').trim();
  if (!trimmed) {
    throw new Error('Query must not be empty');
  }

  const normalized = trimmed.toLowerCase();
  const cacheKey = `search:${normalized}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return { fromCache: true, ...cached };
  }

  const url = `${BASE_URL}/search/`;
  const response = await axios.get(url, {
    params: {
      token: config.aqiToken,
      keyword: normalized
    },
    timeout: 5000
  });

  if (response.data.status !== 'ok') {
    const message = typeof response.data.data === 'string'
      ? response.data.data
      : 'Upstream search error';
    const error = new Error(message);
    error.code = 'UPSTREAM_ERROR';
    throw error;
  }

  const results = (response.data.data || []).map(mapSearchResult);
  const payload = {
    query: normalized,
    count: results.length,
    results
  };

  cache.set(cacheKey, payload);
  return { fromCache: false, ...payload };
}

async function getCityAqi(cityName) {
  const trimmed = String(cityName || '').trim();
  if (!trimmed) {
    throw new Error('City name must not be empty');
  }

  const normalized = trimmed.toLowerCase();
  const cacheKey = `feed:${normalized}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return { fromCache: true, ...cached };
  }

  const searchResult = await searchCities(normalized);
  if (!searchResult.results.length) {
    const error = new Error('No station found for given city');
    error.code = 'NOT_FOUND';
    throw error;
  }

  const station = searchResult.results[0];
  if (!station.stationUrl) {
    const error = new Error('Station URL missing for top result');
    error.code = 'NOT_FOUND';
    throw error;
  }

  const url = `${BASE_URL}/feed/${station.stationUrl}/`;
  const response = await axios.get(url, {
    params: {
      token: config.aqiToken
    },
    timeout: 5000
  });

  if (response.data.status !== 'ok') {
    const message = typeof response.data.data === 'string'
      ? response.data.data
      : 'Upstream feed error';
    const error = new Error(message);
    error.code = 'UPSTREAM_ERROR';
    throw error;
  }

  const dto = mapFeedResult(response.data);
  const payload = {
    fromCache: false,
    station,
    details: dto
  };

  cache.set(cacheKey, payload);
  return payload;
}

module.exports = {
  searchCities,
  getCityAqi
};
