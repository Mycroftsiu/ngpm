/**
 * Created by mycroft on 2018/1/17.
 */


//user modules
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  position: String
})

module.exports = mongoose.model('User',UserSchema);
