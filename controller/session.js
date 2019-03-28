const app = require('express')();
const User = require("../model/User");
const Poll = require("../model/Poll");

exports.new = (req,res) =>{
  res.render("logIn");
}

exports.create =  async function(req, res, next) {  
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.authenticate(email, password);
    if (user) {
      req.session.userId = user._id;
      return res.redirect("/polls");
    } else {
      res.render("logIn", { error: "Wrong email or password. Try again!" });
    }
  } catch (e) {
    return next(e);
  }
}

exports.logOut = async function(req, res){
  req.session = null;
  try{
    const polls = await Poll.find(function(err, notes) {
      if (err) return console.error(err);
      return notes;
    });
    res.redirect("/");  
  }catch(e){
    console.error(e);
  }  
}

exports.index = async function(req, res){
  try{
      const polls = await Poll.find();
      res.render("index",{polls});  
    }catch(e){
      console.error(e);
  }
}