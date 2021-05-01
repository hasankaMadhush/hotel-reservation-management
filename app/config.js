const env = process.env;

const config = {
  db: {
    /* don't expose password or any sensitive info, this is only for dev purpose */
    host: env.DB_HOST || 'mongodb://localhost:',
    dbPort: env.DB_PORT || '27017',
    database: env.DB_NAME || 'hrm',
  },
  maxRoomsPerProperty: 3,
  defaultPropertyDetails: [
    'Sea view',
    'Lake view',
    'Mountain view',
    'Bathtub',
    'Balcony',
    'Floor area(m2)',
    'Wifi',
  ],
  privateKey: 'mango',
  expiresIn: 3600, // 1 hour in seconds
};

module.exports = config;
