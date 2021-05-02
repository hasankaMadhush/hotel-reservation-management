const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    name: {
      type: String,
      default: '',
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', UserSchema);
