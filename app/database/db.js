// var mongoose = require('mongoose');
// var config = require('../config');

// class DB {
//   constructor() {
//     try {
//       const dbConfig = config.db;
//       const uri = `${dbConfig.host}${dbConfig.dbPort}/${dbConfig.database}`;
//       this.db = mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true,
//       });
//       console.log(`MongoDB is connected to ${dbConfig.host}${dbConfig.dbPort}`);
//     } catch (err) {
//       console.error(err.message);
//       process.exit(1);
//     }
//   }
// }

// module.exports = new DB();
const mongoose = require('mongoose');
const config = require('../config');
const dbConfig = config.db;
const dbURL = `${dbConfig.host}${dbConfig.dbPort}/${dbConfig.database}`;
// var dbURL = 'mongodb://' + config.databaseHost + ':' + config.databasePort + '/' + config.database;
// var dbURL = 'mongodb://' + "localhost" + ':' +'27017' + '/' + 'optical-character-recognition';

const currentDate = new Date();
const dateTime =
  currentDate.getFullYear() +
  '-' +
  (currentDate.getMonth() + 1) +
  '-' +
  currentDate.getDate() +
  ' ' +
  currentDate.getHours() +
  ':' +
  currentDate.getMinutes() +
  ':' +
  currentDate.getSeconds();

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'database connection initializing error'));
database.once('open', err => {
  if (err) {
    console.log('database connection initializing error');
    process.exit(1);
  }
  console.log('connected to mongodb with ' + dbConfig.database + ' database at ' + dateTime);
});

module.exports = database;
