const express = require('express');
const router = new express.Router();
const bookingService = require('../controllers/booking.controller');

router.get('/rates/property/:propertyId', bookingService.getRateByProperty);

router.get('/property', bookingService.getProperties);

module.exports = router;
