const Rate = require('../models/rate.model');
const Property = require('../models/property.model');
const reservationController = require('../controllers/reservation.controller');
const mailService = require('../services/mail.service');

// get rates for given property
exports.getRateByProperty = (req, res) => {
  const { propertyId } = req.params;
  Rate.find({ property: propertyId }).exec((err, rates) => {
    if (err) {
      return;
    }
    res.send({
      data: rates,
    });
  });
};

// get all hotels/properties
exports.getProperties = (req, res) => {
  Property.find().exec((err, properties) => {
    if (err) {
      return;
    }
    res.send({
      data: properties,
    });
  });
};

// check for booking with give property ID and check in and checkout dates
exports.checkBooking = async (req, res) => {
  const { propertyId, checkIn, checkout } = req.params;

  reservationController.checkAvailability(propertyId, checkIn, checkout, result => {
    res.send(result);
  });
};

// reserve the provided dates for given user with relevant data
exports.bookReservation = (req, res) => {
  const {
    checkIn,
    checkout,
    property,
    rooms,
    board,
    occupancy,
    rate,
    user,
    paymentType,
  } = req.body;

  reservationController.checkAvailability(property, checkIn, checkout, availability => {
    if (availability.available) {
      reservationController.makeBooking(
        checkIn,
        checkout,
        property,
        rooms,
        board,
        occupancy,
        rate,
        user,
        paymentType,
        reservation => {
          mailService.sendReservationCompleteMail(user, reservation);
          res.json({
            status: true,
            data: reservation,
            message: `We have sent an email to ${user.email} for confirmation`,
          });
        },
      );
    } else {
      res.json({
        status: false,
        data: null,
        message:
          'Sorry Another one has booked this room before you. Please try another property or different days',
      });
    }
  });
};

exports.cancelReservation = (req, res) => {
  const { reservationId } = req.params;
  reservationController.cancelReservation(reservationId, result => {
    res.json(result);
  });
};
