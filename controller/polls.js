const app = require('express')();
const Poll = require("../model/Poll");

exports.init = async (req,res) =>{
  try{
    const polls = await Poll.find(function(err, notes) {
      if (err) return console.error(err);
      return notes;
    });
    res.render("polls",{polls});  
  }catch(e){
    console.error(e);
  }
}

exports.newPoll = (req,res) =>{
  res.render("newPoll");
}

exports.create = async (req,res) => {
  const poll = await Poll.create({name:req.body.name,
                                  description:req.body.description,
                                  user:req.session.userId,
                                  options:{option1: {texto:req.body.Option1, votes:0},
                                          option2:{texto:req.body.Option2, votes:0},
                                          option3:{texto:req.body.Option3, votes:0},
                                          option4:{texto:req.body.Option4, votes:0}}});    
  res.redirect("/polls");
}

exports.poll = async (req,res) => {
  const poll = await Poll.findById(req.params.id);
  res.render("vote",{poll});
}

exports.vote = async (req,res,next) => {
  const id = req.params.id;
  const poll = await  Poll.findById(id);
  const option = req.body.Radios;
  poll.options[option].votes = poll.options[option].votes +1;
  try{
    await poll.save({});
    res.status(204).send([]);
  }catch(e){
    return next(e);
  }
}

exports.result = async (req,res) => {
  const poll = await Poll.findById(req.params.id);
  res.render("results",{poll});
}

exports.delete = async (req,res,next) => {
  const poll = await  Poll.findById(req.params.id);
  try{
      poll.remove(function(err) {
      if (err) return console.error(err);
    });  
    res.status(204).send([]);
  }catch(e){
    return next(e);
  }
}