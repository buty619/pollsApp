const mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  email: String,
  password:String
});

userSchema.statics.authenticate = async (email, password) => {
  // buscamos el usuario utilizando el email
  const user = await mongoose.model("User").findOne({ email: email });  
  if (user) {   
    // si existe comparamos la contraseña
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) reject(err);
        resolve(result === true ? user : null);
      });
      return user;
    });    
  }
  return null;
};

module.exports = mongoose.model("User", userSchema);
