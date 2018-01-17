/**
 * Created by mycroft on 2018/1/5.
 */

//person modules
var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
  name: {type: String, index: {unique: true}},
  gender: String,
  age: Number,
  phone: Number,
  department: String,
  degree: String,
  jobNumber: Number
})

module.exports = mongoose.model('Person',PersonSchema);
