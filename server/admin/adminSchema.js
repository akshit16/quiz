const mongoose = require("mongoose");
const Schema = mongoose.Schema;
autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection("mongodb://localhost/quizapp");
autoIncrement.initialize(connection);

const adminSchema = new Schema({
  name: {
    type: String,
    required: [true]
  },
  password: {
    type: String,
    required: [true]
  },
  fullname: {
    type: String,
    required: true
  }
});
adminSchema.plugin(autoIncrement.plugin, "id");
module.exports = mongoose.model("admin", adminSchema);
