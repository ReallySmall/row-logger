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
        if (!user) return res.status(401).json({ message: 'Authentication failed.' });

        req.logIn(user, (error) => {

          if (error) return next(error);

          return res
                  .status(200)
                  .json({
                    token: jwt.sign({
                      user: user._id,
                      role: ['admin']
                    }, process.env.JWT_TOKEN_SECRET)
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
        password: req.body.password
      });

      User.findOne({ email: req.body.email }, (error, existingUser) => {

        if (error) return next(error);
        if (existingUser) return res.redirect('/signup');

        user.save((error) => {

          if (error) return next(error);

          req.logIn(user, (error) => {

            if (error) return next(error);

            res.status(200).json({ message: 'Sign up successful'});

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

  const errors = req.validationErrors();

  if (errors) return res.status(400).json({ message: errors });

  User.findById(req.user.id, (error, user) => {

    if (error) return next(error);

    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.rowingDataApiKey = req.body.rowingDataApiKey || '';

    user.save((error) => {

      if (error) {
        if (error.code === 11000) return res.redirect('/account');
        return next(error);
      }

      res.redirect('/account');

    });

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

  if (errors) return res.redirect('/account');

  User.findById(req.user.id, (error, user) => {

    if (error) return next(error);

    user.password = req.body.password;
    user.save((error) => {
      if (error) return next(error);
      res.redirect('/account');
    });

  });

};

/**
 * POST /account/delete
 * Delete user account.
 */
export const postDeleteAccount = (req, res, next) => {

  User.remove({ _id: req.user.id }, (error) => {

    if (error) return next(error);

    req.logout();
    res.redirect('/');

  });

};

/**
 * GET /reset/:token
 * Reset Password page.
 */
export const getReset = (req, res, next) => {

  if (req.isAuthenticated()) return res.redirect('/');

  User
    .findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .exec((error, user) => {

      if (error) return next(error);
      if (!user) return res.redirect('/forgot');

      res.render('account/reset', {
        title: 'Password Reset'
      });

    });

};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
export const postReset = (req, res, next) => {

  req.assert('password', 'Password must be at least 4 characters long.').len(4);
  req.assert('confirm', 'Passwords must match.').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) return res.redirect('back');

  const resetPassword = () =>
    User
      .findOne({ passwordResetToken: req.params.token })
      .where('passwordResetExpires').gt(Date.now())
      .then((user) => {

        if (!user) return res.redirect('back');

        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        return user.save().then(() => new Promise((resolve, reject) => {

          req.logIn(user, (err) => {

            if (err) return reject(err);

            resolve(user);

          });

        }));

      });

  const sendResetPasswordEmail = (user) => {

    if (!user) return;

    const transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });

    const mailOptions = {
      to: user.email,
      from: 'hackathon@starter.com',
      subject: 'Your Hackathon Starter password has been changed',
      text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
    };

    return transporter
            .sendMail(mailOptions)
            .then(() => {});
  };

  resetPassword()
    .then(sendResetPasswordEmail)
    .then(() => { if (!res.finished) res.redirect('/'); })
    .catch(error => next(error));

};

/**
 * GET /forgot
 * Forgot Password page.
 */
export const getForgot = (req, res) => {

  if (req.isAuthenticated()) return res.redirect('/');

  res.render('account/forgot', {
    title: 'Forgot Password'
  });

};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
export const postForgot = (req, res, next) => {

  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) return res.redirect('/forgot');

  const createRandomToken = crypto
    .randomBytesAsync(16)
    .then(buf => buf.toString('hex'));

  const setRandomToken = token =>
    User
      .findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {

        } else {
          user.passwordResetToken = token;
          user.passwordResetExpires = Date.now() + 3600000; // 1 hour
          user = user.save();
        }
        return user;
      });

  const sendForgotPasswordEmail = (user) => {
    if (!user) { return; }
    const token = user.passwordResetToken;
    const transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: 'hackathon@starter.com',
      subject: 'Reset your password on Hackathon Starter',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    return transporter.sendMail(mailOptions)
      .then(() => {

      });
  };

  createRandomToken
    .then(setRandomToken)
    .then(sendForgotPasswordEmail)
    .then(() => res.redirect('/forgot'))
    .catch(next);
};
