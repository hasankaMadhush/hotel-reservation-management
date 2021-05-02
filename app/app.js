const express = require('express');
const cors = require('cors');
const database = require('./database/db');

const createInitialModels = require('./controllers/dataLoad.controller');
const appRoutes = require('./routes/app.route');
const authRoutes = require('./routes/auth.route');

const app = express();
app.use(express.json({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

const passport = require('passport');
process.title = 'hrm-server';

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./passport')(passport);

app.get('/', (req, res) => res.status(200).json({ data: 'We are communicating' }));

createInitialModels();

app.use('/app', appRoutes);
app.use('/auth', authRoutes);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

const port = process.env.port || 5000;

app.listen(port, () => console.log(`server is up & running on port:${port}`));
