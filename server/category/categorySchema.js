const mongoose = require("mongoose");
const Schema = mongoose.Schema;
autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection("mongodb://localhost/quizapp");
autoIncrement.initialize(connection);

const categorySchema = new Schema({
  category: {
    name: {
      type: String,
      required: true,
      unique: true
    },
    subcategory: [
      {
        type: String,
        required: true,
        unique: true
      }
    ]
  }
});

categorySchema.plugin(autoIncrement.plugin, "id");

module.exports = mongoose.model("category", categorySchema);
