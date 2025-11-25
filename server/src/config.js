const dotenv = require('dotenv');

dotenv.config();

const config = {
  port: Number(process.env.PORT) || 4000,
  aqiToken: process.env.AQI_TOKEN,
  cacheTtlMs: Number(process.env.CACHE_TTL_MS) || 300000,
  cacheMaxEntries: Number(process.env.CACHE_MAX_ENTRIES) || 100
};

if (!config.aqiToken) {
  throw new Error('AQI_TOKEN is required in .env');
}

module.exports = config;
