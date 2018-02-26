/**
 * Created by mycroft on 2018/2/26.
 */

//feedback module
var mongoose = require('mongoose');

var FeedbackSchema = new mongoose.Schema({
  user: {
    username: String,
    password: String,
    email: String,
    position: String
  },
  content: String,
  comment: String
})

module.exports = mongoose.model('Feedback',FeedbackSchema);
