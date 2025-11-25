const DOMINANT_LABELS = {
  pm25: 'PM2.5',
  pm10: 'PM10',
  o3: 'O₃',
  no2: 'NO₂',
  so2: 'SO₂',
  co: 'CO'
};

function formatCoord(value) {
  if (value == null) return 'N/A';
  const num = Number(value);
  if (Number.isNaN(num)) return 'N/A';
  return num.toFixed(3);
}

function formatNumber(value, decimals = 1) {
  if (value == null) return 'N/A';
  const num = Number(value);
  if (Number.isNaN(num)) return 'N/A';
  return num.toFixed(decimals);
}

function CitySummary({ data }) {
  const city = data.details.city || {};
  const category = data.details.category;
  const time = data.details.time || {};
  const station = data.station || {};
  const aqi = data.details.aqi;
  const weather = data.details.weather || {};

  const dominantCode = data.details.dominantPollutant;
  const dominantPretty =
    DOMINANT_LABELS[dominantCode] || (dominantCode || 'N/A');

  const chipStyle = {
    backgroundColor: `${category.color}20`,
    color: category.color,
    border: `1px solid ${category.color}55`
  };

  return (
    <div className="city-layout">
      <div className="city-main">
        <div>
          <div className="city-name">
            {city.name || station.stationName || 'Unknown location'}
          </div>
          <div className="city-meta-line">
            {city.geo && (
              <span>
                lat {formatCoord(city.geo.lat)}, lon {formatCoord(city.geo.lon)}
              </span>
            )}
            {time.localTime && <span>Updated: {time.localTime}</span>}
            {time.timezone && <span>TZ {time.timezone}</span>}
          </div>

          <div style={{ marginTop: 10 }}>
            <div className="aqi-value-row">
              <div className="aqi-value">{aqi != null ? aqi : '—'}</div>
              <div className="aqi-chip" style={chipStyle}>
                <span className="aqi-chip-dot" />
                <span>{category.label}</span>
              </div>
            </div>
            <div className="aqi-message">{category.message}</div>
          </div>

          {/* LEFT COLUMN: station / dominant / source as vertical list */}
          <div className="meta-vertical">
            <div className="meta-line">
              <span className="meta-label">Station</span>
              <span className="meta-value">
                {station.stationName || 'N/A'}
              </span>
            </div>
            <div className="meta-line">
              <span className="meta-label">Dominant pollutant</span>
              <span className="meta-value">{dominantPretty}</span>
            </div>
            <div className="meta-line">
              <span className="meta-label">Source</span>
              <span className="meta-value">WAQI</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: weather grid */}
        <div className="meta-grid">
          <div className="meta-item">
            <span className="meta-label">Temperature</span>
            <span className="meta-value">
              {weather.temperature != null
                ? `${formatNumber(weather.temperature, 0)} °C`
                : 'N/A'}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Humidity</span>
            <span className="meta-value">
              {weather.humidity != null
                ? `${formatNumber(weather.humidity, 0)} %`
                : 'N/A'}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Pressure</span>
            <span className="meta-value">
              {weather.pressure != null
                ? `${formatNumber(weather.pressure, 1)} hPa`
                : 'N/A'}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Wind</span>
            <span className="meta-value">
              {weather.wind != null
                ? `${formatNumber(weather.wind, 1)} m/s`
                : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CitySummary;
