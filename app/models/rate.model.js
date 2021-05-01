const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BOARD_TYPES = ['Bread & Breakfast', 'Half Board', 'Full Board'];
const OCCUPANCY_TYPES = ['single', 'double', 'triple'];

const RateSchema = Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Rate', RateSchema);
