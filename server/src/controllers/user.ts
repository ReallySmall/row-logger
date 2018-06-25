import * as resHelpers from '../helpers/resHelper';
const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

import { User } from '../models/User';

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();

/**
 * GET /account
 * get user account data.
 */
export const getUserData = (req, res, next) => {

  if(!req.user) return res.status(401).json(resHelpers.jsonUnauthorisedMessage);

  User.findById(req.user, (error, user) => {

    if (error) return res.status(500).json(resHelpers.jsonErrorMessage);

    res.status(200).json({
      email: user.email,
      userName: user.userName,
      rowerType: user.rowingRowerType,
      rowerDamping: user.rowingRowerDamping
    });

  });

};

/**
 * POST /login
 * Sign in using email and password.
 */
export const postLogin = (req, res, next) => {

  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  req.getValidationResult().then((result: any) => {

    if (!result.isEmpty()) {

        const errors = result.array().map((elem: any) => elem.msg);

        return res.status(401).json({ message: errors });

    } else {

      passport.authenticate('local', (error, user, info) => {

        if (error) return next(error);

        if (!user) return res.status(401).json({ message: 'Login failed.' });

        req.logIn(user, (error) => {

          if (error) return next(error);

          console.log('success');

          return res
                  .status(200)
                  .header('Transfer-Encoding', '')
                  .json({
                    token: jwt.sign({
                      user: user._id,
                      userName: user.userName,
                      isLogger: req.body.isLogger
                    }, process.env.JWT_TOKEN_SECRET),
                    timestamp: new Date().getTime()
                  });

        });

      })(req, res, next);

    }

  });

};

/**
 * GET /logout
 * Log out.
 */
export const logout = (req, res) => {

  req.logout();
  res.status(200).json({ message: 'Logged out.' });

};

/**
 * POST /signup
 * Create a new local account.
 */
export const postSignup = (req, res, next) => {

  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  req.getValidationResult().then((result: any) => {

    if (!result.isEmpty()) {

        const errors = result.array().map((elem: any) => elem.msg);

        return res.status(401).json({ message: errors });

    } else {

      const user: any = new User({
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
      });

      User.findOne({ email: req.body.email }, (error, existingUser) => {

        if (error) return next(error);
        if (existingUser) return res.status(200).json({ message: 'A user with this email already exists'});

        user.save((error) => {

          if (error) return next(error);

          req.logIn(user, (error) => {

            if (error) return next(error);

            return res
                    .status(200)
                    .json({
                      token: jwt.sign({
                        user: user._id,
                        userName: user.userName
                      }, process.env.JWT_TOKEN_SECRET),
                      timestamp: new Date().getTime()
                    });

          });

        });

      });

    }

  });

};

/**
 * POST /account/profile
 * Update profile information.
 */
export const postUpdateProfile = (req, res, next) => {

  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  req.getValidationResult().then((result: any) => {

    if (!result.isEmpty()) {

        const errors = result.array().map((elem: any) => elem.msg);

        return res.status(400).json({ message: errors });

    } else {

      User.findById(req.user, (error, user) => {

        if (error) return next(error);

        user.userName = req.body.userName || user.userName;
        user.email = req.body.email || user.email;

        user.save((error) => {

          if (error) {
            if (error.code === 11000) return res.status(500);
            return next(error);
          }

          return res.status(200).json({
            userName: user.userName,
            email: user.email
          });

        });

      });

    }

  });

};

/**
 * POST /account/password
 * Update current password.
 */
export const postUpdatePassword = (req, res, next) => {

  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) return res.status(400).json({ message: errors });

  User.findById(req.user.id, (error, user) => {

    if (error) return next(error);

    user.password = req.body.password;

    user.save((error) => {
      if (error) return next(error);
      res.status(200);
    });

  });

};

/**
 * POST /account/delete
 * Delete user account.
 */
export const postDeleteAccount = (req, res, next) => {

  User.remove({ _id: req.user }, (error) => {

    if (error) return next(error);

    req.logout();
    res.redirect('/');

  });

};