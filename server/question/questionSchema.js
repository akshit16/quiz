const mongoose = require('mongoose');
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/quizapp");
autoIncrement.initialize(connection);


const questionSchema = new Schema({
  questions: [{
      question:{
          type:String,
          required:true
      },
      answer:{
          type:String,
          required:true
      },
      option1:{
          type:String,
          required:true,
          
      },
      option2:{
        type:String,
        required:true,
        
    },
    option3:{
        type:String,
        required:true,
        
    },option4:{
        type:String,
        required:true,
        
    },
      score:{
          type:String,
          required:true
      }
  }],
  quizname:{
    type:String,
    required:false
  },
  category:{
    type:String,
    required:false
},
subcategory:{
    type:String,
    required:false
},
  createdAt: {
    type: String,
    required: [true],
    default: Date.now
  }
});

questionSchema.plugin(autoIncrement.plugin, 'id');


module.exports = mongoose.model('question', questionSchema);
