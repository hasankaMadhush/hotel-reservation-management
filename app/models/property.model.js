const mongoose = require('mongoose');

const config = require('../config');

const PropertySchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
    },
    noOfRooms: {
      type: Number,
      default: config.maxRoomsPerProperty,
      max: config.maxRoomsPerProperty,
    },
    details: {
      type: [String],
      default: config.propertyDetails, //available reservation details
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Property', PropertySchema);
