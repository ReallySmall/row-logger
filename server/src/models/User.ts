const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  email: { type: String, unique: true },
  userName: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  rowingRowerType: String,
  rowingRowerDamping: String,
  rowingLoggingTimeout: Number,
  rowingShareData: Boolean,
  shareRowingData: Boolean,
  rowingTotalMetres: Number,
  rowingTotalTime: Number

}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {

  const user: any = this;

  if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (error: Error, salt: any) => {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, null, (error: Error, hash: any) => {
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
userSchema.methods.comparePassword = function(candidatePassword: string, cb: Function){
  bcrypt.compare(candidatePassword, this.password, (error: Error, isMatch: boolean) => {
    cb(error, isMatch);
  });
};

export const User = mongoose.model('User', userSchema);