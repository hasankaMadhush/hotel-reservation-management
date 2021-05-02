const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../config');

const PAYMENT_TYPES = ['CCO', 'CCL', 'CAS'];
const PAYMENT_STATUS = ['pending', 'complete', 'error'];

const PaymentSchema = Schema(
  {
    method: {
      type: String,
      enum: PAYMENT_TYPES,
    },
    amount: {
      type: Number,
    },
    currency: {
      type: String,
      default: config.defaultCurrency,
    },
    status: {
      type: String,
      enum: PAYMENT_STATUS,
      default: PAYMENT_STATUS[0],
    },
    // other related fields
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Payment', PaymentSchema);
