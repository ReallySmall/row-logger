const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
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
userSchema.methods.comparePassword = (candidatePassword: string, cb: Function) => {
  bcrypt.compare(candidatePassword, this.password, (error: Error, isMatch: boolean) => {
    cb(error, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = (size: number) => {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const User = mongoose.model('User', userSchema);