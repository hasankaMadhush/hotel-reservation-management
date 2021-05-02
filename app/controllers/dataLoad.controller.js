const db = require('../database/db');
const properties = require('../models/data/property.json');
const rates = require('../models/data/rates.json');

const Property = require('../models/property.model');
const Rate = require('../models/rate.model');

// for development purpose creating properties and relevant rates
const createInitialModels = () => {
  Property.find().then(results => {
    if (!results.length) {
      properties.forEach(property => {
        const Prop = new Property(property);
        Prop.save(error => {
          if (error) {
            return;
          }
          rates.forEach(rate => {
            rate.property = Prop._id;
            const newRate = new Rate(rate);
            newRate.save();
          });
        });
      });
    }
  });
};

module.exports = createInitialModels;
