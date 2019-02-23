const mongoose = require('mongoose');
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/quizapp");
autoIncrement.initialize(connection);

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true,
    default: Date.now
  },
  score: [{
    category:{
        type:String,
        required:false
    },
    subcategory:{
      type:String,
      required:false
    },
    value:{
        type:String,
        required:false
    }  
}],
  flag:{
      type:String,
      default:0
  },
  type:{
    type:String,
    required:true,
    default:'user'
  }
});

userSchema.plugin(autoIncrement.plugin, 'id');


module.exports = mongoose.model('user', userSchema);
