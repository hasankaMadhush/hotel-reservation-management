const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config');
const passport = require('passport');

const router = new express.Router();

// login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then(user => {
    // Check if user exists
    if (!user) {
      res.json({
        success: false,
        message: 'Please sign up to login',
      });
    }

    // validate password
    bcrypt.compare(password, user.password).then(isValidLogin => {
      if (!isValidLogin) {
        return res.json({
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
              user: null,
            });
          }
          res.json({
            success: true,
            token: token,
            user: user,
          });
        },
      );
    });
  });
});

// registration
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.json({ success: false, message: `Already registered with ${email}`, user: null });
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
            .then(user =>
              res.json({
                success: true,
                message: 'successfully registered, Please sign in',
                user: user,
              }),
            )
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user);
});

module.exports = router;
