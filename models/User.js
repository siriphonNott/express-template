const mongoose = require('mongoose'),
      { toDateTime } = require('../helpers'),
      uniqueValidator = require('mongoose-unique-validator'),
      crypto = require('crypto'),
      jwt = require('jsonwebtoken'),
      config = require('../configs/app')
 
const schema = new mongoose.Schema({
  username: { type: String, index: true, required: true, unique: true, uniqueCaseInsensitive: false },
  password: { type: String, index: true },
  email: { type: String },
  age: { type: Number },
  birthday: Date
}, { timestamps: true });

// Apply the uniqueValidator plugin to userSchema.
schema.plugin(uniqueValidator);

// Generate JWT
schema.methods.generateJWT = function(obj) {
  let today = new Date(),
      exp = new Date(today)
  exp.setDate(today.getDate() + config.token_exp_days || 1);
  
  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, config.secret)
}

// Custom JSON Response
schema.methods.toJSON = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    age: this.age,
    birthday: this.birthday,
    createdAt: toDateTime({_d: this.createdAt, locale: 'th'}),
    updatedAt: toDateTime({_d: this.updatedAt, locale: 'th'}),
  }
}

// Hash Password
schema.methods.passwordHash = function(password) {
  return crypto.createHash('sha1').update(password).digest('hex')
}

// Verify Password
schema.methods.validPassword = function(password) {
  return this.passwordHash(password) === this.password
}

// Custom field before save
schema.pre('save', function (next) {
  this.password = this.passwordHash(this.password)
  next();
});

module.exports = mongoose.model('User', schema)