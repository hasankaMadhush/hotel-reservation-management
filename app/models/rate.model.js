const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../config');

const BOARD_TYPES = ['Bread & Breakfast', 'Half Board', 'Full Board'];
const OCCUPANCY_TYPES = ['single', 'double', 'triple'];

const RateSchema = Schema(
  {
    occupancyIndex: {
      type: Number,
    },
    board: {
      type: String,
      enum: BOARD_TYPES,
    },
    occupancy: {
      type: String,
      enum: OCCUPANCY_TYPES,
    },
    rate: {
      type: Number,
      default: 0,
    },
    property: {
      type: mongoose.Types.ObjectId,
      ref: 'Property',
    },
    currency: {
      type: String,
      default: config.defaultCurrency,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Rate', RateSchema);
