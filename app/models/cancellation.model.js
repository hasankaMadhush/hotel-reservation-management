const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CancellationSchema = Schema(
  {
    checkout: {
      type: Date,
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Cancellation', CancellationSchema);
