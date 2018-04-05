"use strict";
exports.__esModule = true;
var passport = require('passport');
var request = require('request');
var LocalStrategy = require('passport-local').Strategy;
var User_1 = require("../models/User");
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User_1.User.findById(id, function (err, user) {
        done(err, user);
    });
});
/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
    User_1.User.findOne({ email: email.toLowerCase() }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { msg: "Email " + email + " not found." });
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, { msg: 'Invalid email or password.' });
        });
    });
}));
/**
 * Login Required middleware.
 */
exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};
/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function (req, res, next) {
    var provider = req.path.split('/').slice(-1)[0];
    var token = req.user.tokens.find(function (token) { return token.kind === provider; });
    if (token) {
        next();
    }
    else {
        res.redirect("/auth/" + provider);
    }
};
