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
//mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/top_dev', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });
app.use(express.urlencoded());
app.use("/",routes);
app.use("/static", express.static(path.join(__dirname, "assets")));
app.use("/polls/static", express.static(path.join(__dirname, "assets"))); 
app.set("view engine", "ejs");
app.set("views", "views");
//  ----------

module.exports = app;