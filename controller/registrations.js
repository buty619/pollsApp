const mongoose = require("mongoose");
const User = require("../model/User");
var bcrypt = require('bcrypt-nodejs');

exports.new = (req,res) =>{
    res.render("registations");
}

exports.create = (req,res) => { 
    const hash = bcrypt.hashSync(req.body.password);  
    User.create({email:req.body.email,password:hash}, err => {
      if(err){
        return console.log("ocurrio un error: ",err)
      }
      console.log("usuario generado");
    });
  res.redirect("/logIn");
}


exports.oauth = (req,res) => { 
  res.send("https://api.twitter.com/oauth2/token?grant_type=7VKGQdqs1OwFqGu1a3jHQ1v0L");
}

exports.oauthcall = (req,res) => { 
  console.log(req.access_token);
  res.send({});
}
