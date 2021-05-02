const dayjs = require('dayjs');

const Reservation = require('../models/reservation.model');
const Payment = require('../models/payment.model');
const config = require('../config');

// check for room availability based on the check in, checkout and property
exports.checkAvailability = async (propertyId, checkIn, checkout, callback) => {
  Reservation.find({ property: propertyId, checkIn: { $gte: checkIn, $lt: checkout } }).exec(
    (err, reservations) => {
      if (err) {
        callback({ available: false }, null);
      }

      const totalReservations = reservations.length;

      callback(
        {
          available: totalReservations < config.maxRoomsPerProperty,
        },
        null,
      );
    },
  );
};

// making the reservation
exports.makeBooking = (
  checkIn,
  checkout,
  property,
  rooms,
  board,
  occupancy,
  rate,
  user,
  paymentType,
  callback,
) => {
  const nights = calculateNights(checkIn, checkout);
  const totalAmount = calculateTotalAmount(nights, rate);

  const payment = new Payment({
    method: paymentType,
    amount: totalAmount,
  });
  const reservation = new Reservation({
    checkIn,
    checkout,
    board,
    occupancy,
    nights,
    rate,
    totalAmount,
    property,
    guest: user._id,
  });

  payment.save(err => {
    if (err) {
      callback(err, null);
    }
    reservation.payment = payment._id;
    reservation.save(err => {
      callback(reservation, null);
    });
  });
};

exports.cancelReservation = (reservationId, callback) => {
  Reservation.findById(reservationId, (err, doc) => {
    if (err) {
      callback({ message: err }, null);
    }
    const cancellationFee = calculateCancellationFee(doc);
    Reservation.findByIdAndUpdate(
      reservationId,
      {
        cancellationTime: dayjs(),
        isCancelled: true,
        cancellationFee: cancellationFee,
        CancellationFeePercentage: config.cancellationFeePercentage,
      },
      (err, docs) => {
        if (err) {
          callback({ message: err }, null);
        }
        callback({ message: docs }, null);
      },
    );
    //should handle payment separately when making a cancellation
  });
};

// calculate staying days
const calculateNights = (checkIn, checkout) => {
  return dayjs(checkout).diff(dayjs(checkIn), 'day');
};

// calculate total amount based on the staying days
const calculateTotalAmount = (nights, rate) => {
  return Number(nights) * Number(rate);
};

const calculateCancellationFee = reservation => {
  const hoursToCancel = dayjs(reservation.checkIn).diff(dayjs(), 'hour');
  const cancellationFee =
    hoursToCancel <= config.cancellationPriorHrs
      ? (reservation.totalAmount * config.cancellationFeePercentage) / 100
      : 0;
  return cancellationFee;
};
