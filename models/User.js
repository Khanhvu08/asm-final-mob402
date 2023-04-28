const  mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    maxlength:50
  },
  password: {
    type: String,
    require: true,
    minlength:3
  },
  fullName: {
    type: String,
    require: true,
  },
  isAdmin:{
    type: Boolean,
    default: false
  }
},{timestamps:true});

const accountModel = mongoose.model("user", accountSchema);


module.exports =  accountModel ;



