var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  // _id: ObjectId is created by Mongo
});

module.exports = mongoose.model('User', UserSchema);
