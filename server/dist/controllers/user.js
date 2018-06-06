"use strict";
exports.__esModule = true;
var resHelpers = require("../helpers/resHelper");
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
 * GET /account
 * get user account data.
 */
exports.getUserData = function (req, res, next) {
    if (!req.user)
        return res.status(401).json(resHelpers.jsonUnauthorisedMessage);
    User_1.User.findById(req.user, function (error, user) {
        if (error)
            return res.status(500).json(resHelpers.jsonErrorMessage);
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
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            var errors = result.array().map(function (elem) { return elem.msg; });
            return res.status(400).json({ message: errors });
        }
        else {
            User_1.User.findById(req.user, function (error, user) {
                if (error)
                    return next(error);
                user.userName = req.body.userName || user.userName;
                user.email = req.body.email || user.email;
                user.save(function (error) {
                    if (error) {
                        if (error.code === 11000)
                            return res.status(500);
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
exports.postUpdatePassword = function (req, res, next) {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    var errors = req.validationErrors();
    if (errors)
        return res.status(400).json({ message: errors });
    User_1.User.findById(req.user.id, function (error, user) {
        if (error)
            return next(error);
        user.password = req.body.password;
        user.save(function (error) {
            if (error)
                return next(error);
            res.status(200);
        });
    });
};
/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = function (req, res, next) {
    User_1.User.remove({ _id: req.user }, function (error) {
        if (error)
            return next(error);
        req.logout();
        res.redirect('/');
    });
};
