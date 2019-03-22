const mongoose = require("mongoose");

var pollSchema = mongoose.Schema({
  name: String,
  description:String,
  options:{
    option1:{
      texto: String,
      votes:Number
    },
    option2:{
      texto: String,
      votes:Number
    },
    option3:{
      texto: String,
      votes:Number
    },
    option4:{
      texto: String,
      votes:Number
    },
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports = mongoose.model("Poll", pollSchema);
