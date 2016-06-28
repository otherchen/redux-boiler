var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
  // _id: ObjectId is created by Mongo
});

module.exports = mongoose.model('User', UserSchema);
