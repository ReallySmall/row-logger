"use strict";
exports.__esModule = true;
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    userName: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    facebook: String,
    twitter: String,
    google: String,
    github: String,
    instagram: String,
    linkedin: String,
    steam: String,
    tokens: Array,
    rowingLoggingTimeout: Number,
    shareRowingData: Boolean,
    rowingTotalMetres: Number,
    rowingTotalTime: Number,
    profile: {
        name: String,
        picture: String
    }
}, { timestamps: true });
/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (error, salt) {
        if (error) {
            return next(error);
        }
        bcrypt.hash(user.password, salt, null, function (error, hash) {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});
/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (error, isMatch) {
        cb(error, isMatch);
    });
};
exports.User = mongoose.model('User', userSchema);
