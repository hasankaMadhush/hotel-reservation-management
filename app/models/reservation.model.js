const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = Schema(
  {
    checkIn: {
      type: Date,
    },
    checkout: {
      type: Date,
    },
    board: {
      type: String,
    },
    occupancy: {
      type: String,
    },
    nights: {
      type: Number,
    },
    rate: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    property: {
      type: mongoose.Types.ObjectId,
      ref: 'Property',
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    cancellationTime: {
      type: Date,
    },
    cancellationFee: {
      type: Number,
    },
    CancellationFeePercentage: {
      type: Number, // percentage
      default: 0,
      max: 100,
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: 'Payment',
    },
    guest: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Reservation', ReservationSchema);
