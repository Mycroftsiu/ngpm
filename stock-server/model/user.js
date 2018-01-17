/**
 * Created by mycroft on 2018/1/17.
 */


//user modules
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
})

module.exports = mongoose.model('User',UserSchema);
