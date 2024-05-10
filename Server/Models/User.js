const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  username: String,
  firstName: String,
  lastName: String,
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date,
  lastSignInAt: Date,

});

module.exports = mongoose.model('User', userSchema);
