const Rate = require('../models/rate.model');
const Property = require('../models/property.model');

exports.getRateByProperty = (req, res) => {
  const { propertyId } = req.params;

  Rate.find({ property: propertyId }).exec((err, rates) => {
    if (err) {
      return;
    }
    res.send({
      data: rates,
    });
  });
};

exports.getProperties = (req, res) => {
  Property.find().exec((err, properties) => {
    if (err) {
      return;
    }

    res.send({
      data: properties,
    });
  });
};
