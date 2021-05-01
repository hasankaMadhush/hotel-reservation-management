const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config');
const passport = require('passport');

const router = new express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Please register to login',
      });
    }

    bcrypt.compare(password, user.password).then(isValidLogin => {
      if (!isValidLogin) {
        return res.status(401).json({
          success: false,
          message: 'Password incorrect',
        });
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      // Sign token
      jwt.sign(
        payload,
        config.privateKey,
        {
          expiresIn: config.expiresIn,
        },
        (err, token) => {
          if (err) {
            res.json({
              success: false,
              message: err,
            });
          }
          res.json({
            success: true,
            token: token,
          });
        },
      );
    });
  });
});

router.post('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user);
});

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(400).json({ email: `Already registered with ${email}` });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
