const express = require('express');
const router = new express.Router();
const bookingController = require('../controllers/booking.controller');

router.get('/rates/property/:propertyId', bookingController.getRateByProperty);

router.get('/property', bookingController.getProperties);

router.get(
  '/reservation/check/property/:propertyId/:checkIn/:checkout',
  bookingController.checkBooking,
);

router.post('/reservation/book', bookingController.bookReservation);
router.post('/reservation/cancel/:reservationId', bookingController.cancelReservation);

module.exports = router;
