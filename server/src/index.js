const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const aqiRoutes = require('./routes/aqiRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/aqi', aqiRoutes);

app.use((err, req, res, next) => {
  const status =
    err.code === 'NOT_FOUND' ? 404 :
    err.code === 'UPSTREAM_ERROR' ? 502 :
    err.message === 'Query must not be empty' ||
    err.message === 'City name must not be empty'
      ? 400
      : 500;

  res.status(status).json({
    error: true,
    message: err.message || 'Internal server error'
  });
});

app.listen(config.port, () => {
  console.log(`AQI backend listening on port ${config.port}`);
});
