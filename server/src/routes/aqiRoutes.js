const express = require('express');
const { searchCities, getCityAqi } = require('../aqiService');

const router = express.Router();

router.get('/search', async (req, res, next) => {
  try {
    const query = req.query.query;
    const result = await searchCities(query);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/city/:cityName', async (req, res, next) => {
  try {
    const cityName = req.params.cityName;
    const result = await getCityAqi(cityName);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
