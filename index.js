const app = require('express')();
const express = require("express");
const http = require('http').Server(app);
const path = require("path");
const mongoose = require("mongoose");
const routes= require('./routes');
const Poll = require("./model/Poll");
const middlewares= require('./middlewares');
const cookieSession = require('cookie-session');
app.use(cookieSession({secret:"Shh! It's a secret"}));

//  ----------
const PORT = process.env.PORT  || 3000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });
app.use(express.urlencoded());
app.use("/",routes);
app.use("/static", express.static(path.join(__dirname, "assets")));
app.use("/polls/static", express.static(path.join(__dirname, "assets"))); 
app.set("view engine", "ejs");
app.set("views", "views");
//  ----------

app.get('/', async function(req, res){
  try{
      const polls = await Poll.find();
      res.render("index",{polls});  
    }catch(e){
      console.error(e);
  }
});


app.listen(PORT, () => console.log("Inició en puerto .." + PORT));