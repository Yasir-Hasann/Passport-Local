// module imports
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    gender: { type: String, enum: ['male', 'female'] },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.setPassword = async function (newPass) {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(newPass, salt);
  return pass;
};

UserSchema.methods.matchPasswords = async function (enteredPassword) {
  const isMatched = await bcrypt.compare(enteredPassword, this.password);
  return isMatched;
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ _id: this._id, type: 'user' }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('user', UserSchema);
