"use strict";
var _this = this;
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
    rowingDataApiKey: String,
    rowingLoggingTimeout: Number,
    shareRowingData: Boolean,
    rowingTotalMetres: Number,
    rowingTotalTime: Number,
    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
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
    bcrypt.compare(candidatePassword, _this.password, function (error, isMatch) {
        cb(error, isMatch);
    });
};
/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size) {
    if (!size) {
        size = 200;
    }
    if (!_this.email) {
        return "https://gravatar.com/avatar/?s=" + size + "&d=retro";
    }
    var md5 = crypto.createHash('md5').update(_this.email).digest('hex');
    return "https://gravatar.com/avatar/" + md5 + "?s=" + size + "&d=retro";
};
exports.User = mongoose.model('User', userSchema);
