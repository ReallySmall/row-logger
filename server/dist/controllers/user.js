"use strict";
exports.__esModule = true;
var bluebird = require('bluebird');
var crypto = bluebird.promisifyAll(require('crypto'));
var nodemailer = require('nodemailer');
var passport = require('passport');
var dotenv = require('dotenv');
var jwt = require('jsonwebtoken');
var User_1 = require("../models/User");
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();
/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            var errors = result.array().map(function (elem) { return elem.msg; });
            return res.status(401).json({ message: errors });
        }
        else {
            passport.authenticate('local', function (error, user, info) {
                if (error)
                    return next(error);
                if (!user)
                    return res.status(401).json({ message: 'Login failed.' });
                req.logIn(user, function (error) {
                    if (error)
                        return next(error);
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
exports.logout = function (req, res) {
    req.logout();
    res.status(200).json({ message: 'Logged out.' });
};
/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            var errors = result.array().map(function (elem) { return elem.msg; });
            return res.status(401).json({ message: errors });
        }
        else {
            var user_1 = new User_1.User({
                email: req.body.email,
                userName: req.body.userName,
                password: req.body.password
            });
            User_1.User.findOne({ email: req.body.email }, function (error, existingUser) {
                if (error)
                    return next(error);
                if (existingUser)
                    return res.status(200).json({ message: 'A user with this email already exists' });
                user_1.save(function (error) {
                    if (error)
                        return next(error);
                    req.logIn(user_1, function (error) {
                        if (error)
                            return next(error);
                        return res
                            .status(200)
                            .json({
                            token: jwt.sign({
                                user: user_1._id,
                                userName: user_1.userName
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
exports.postUpdateProfile = function (req, res, next) {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
    var errors = req.validationErrors();
    if (errors)
        return res.status(400).json({ message: errors });
    User_1.User.findById(req.user.id, function (error, user) {
        if (error)
            return next(error);
        user.email = req.body.email || '';
        user.profile.name = req.body.name || '';
        user.rowingDataApiKey = req.body.rowingDataApiKey || '';
        user.save(function (error) {
            if (error) {
                if (error.code === 11000)
                    return res.redirect('/account');
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
exports.postUpdatePassword = function (req, res, next) {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    var errors = req.validationErrors();
    if (errors)
        return res.redirect('/account');
    User_1.User.findById(req.user.id, function (error, user) {
        if (error)
            return next(error);
        user.password = req.body.password;
        user.save(function (error) {
            if (error)
                return next(error);
            res.redirect('/account');
        });
    });
};
/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = function (req, res, next) {
    User_1.User.remove({ _id: req.user.id }, function (error) {
        if (error)
            return next(error);
        req.logout();
        res.redirect('/');
    });
};
/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = function (req, res, next) {
    if (req.isAuthenticated())
        return res.redirect('/');
    User_1.User
        .findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires').gt(Date.now())
        .exec(function (error, user) {
        if (error)
            return next(error);
        if (!user)
            return res.redirect('/forgot');
        res.render('account/reset', {
            title: 'Password Reset'
        });
    });
};
/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = function (req, res, next) {
    req.assert('password', 'Password must be at least 4 characters long.').len(4);
    req.assert('confirm', 'Passwords must match.').equals(req.body.password);
    var errors = req.validationErrors();
    if (errors)
        return res.redirect('back');
    var resetPassword = function () {
        return User_1.User
            .findOne({ passwordResetToken: req.params.token })
            .where('passwordResetExpires').gt(Date.now())
            .then(function (user) {
            if (!user)
                return res.redirect('back');
            user.password = req.body.password;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            return user.save().then(function () { return new Promise(function (resolve, reject) {
                req.logIn(user, function (err) {
                    if (err)
                        return reject(err);
                    resolve(user);
                });
            }); });
        });
    };
    var sendResetPasswordEmail = function (user) {
        if (!user)
            return;
        var transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                user: process.env.SENDGRID_USER,
                pass: process.env.SENDGRID_PASSWORD
            }
        });
        var mailOptions = {
            to: user.email,
            from: 'hackathon@starter.com',
            subject: 'Your Hackathon Starter password has been changed',
            text: "Hello,\n\nThis is a confirmation that the password for your account " + user.email + " has just been changed.\n"
        };
        return transporter
            .sendMail(mailOptions)
            .then(function () { });
    };
    resetPassword()
        .then(sendResetPasswordEmail)
        .then(function () { if (!res.finished)
        res.redirect('/'); })["catch"](function (error) { return next(error); });
};
/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = function (req, res) {
    if (req.isAuthenticated())
        return res.redirect('/');
    res.render('account/forgot', {
        title: 'Forgot Password'
    });
};
/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = function (req, res, next) {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
    var errors = req.validationErrors();
    if (errors)
        return res.redirect('/forgot');
    var createRandomToken = crypto
        .randomBytesAsync(16)
        .then(function (buf) { return buf.toString('hex'); });
    var setRandomToken = function (token) {
        return User_1.User
            .findOne({ email: req.body.email })
            .then(function (user) {
            if (!user) {
            }
            else {
                user.passwordResetToken = token;
                user.passwordResetExpires = Date.now() + 3600000; // 1 hour
                user = user.save();
            }
            return user;
        });
    };
    var sendForgotPasswordEmail = function (user) {
        if (!user) {
            return;
        }
        var token = user.passwordResetToken;
        var transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                user: process.env.SENDGRID_USER,
                pass: process.env.SENDGRID_PASSWORD
            }
        });
        var mailOptions = {
            to: user.email,
            from: 'hackathon@starter.com',
            subject: 'Reset your password on Hackathon Starter',
            text: "You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n\n        Please click on the following link, or paste this into your browser to complete the process:\n\n\n        http://" + req.headers.host + "/reset/" + token + "\n\n\n        If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };
        return transporter.sendMail(mailOptions)
            .then(function () {
        });
    };
    createRandomToken
        .then(setRandomToken)
        .then(sendForgotPasswordEmail)
        .then(function () { return res.redirect('/forgot'); })["catch"](next);
};
