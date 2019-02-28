const mongoose = require('mongoose');
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/quizapp");
autoIncrement.initialize(connection);

const chatSchema = new Schema({
  user1: {
    type: String
  },
  user2: {
    type: String
  },
  group: [{
    type: String
  }],
  chat: [{
    type: String
  }],
  createdAt: {
    type: String,
    required: true,
    default: Date.now
  }
});

chatSchema.plugin(autoIncrement.plugin, 'id');


module.exports = mongoose.model('chat', chatSchema);
