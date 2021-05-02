const mongoose = require('mongoose');
const config = require('../config');

const dbConfig = config.db;
const dbURL = `${dbConfig.host}${dbConfig.dbPort}/${dbConfig.database}`;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'database connection initializing error'));
database.once('open', err => {
  if (err) {
    console.log('database connection initializing error');
    process.exit(1);
  }
  console.log('connected to mongodb with ' + dbConfig.database + ' database');
});

module.exports = database;
