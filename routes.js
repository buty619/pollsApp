const express = require("express");
const app = require('express')();
const router = express.Router();
const cookieSession = require('cookie-session');
app.use(cookieSession({secret:"Shh! It's a secret"}));
const registrations = require("./controller/registrations");
const session = require("./controller/session");
const polls = require("./controller/polls");
const middlewares= require('./middlewares');

router.get("/register", registrations.new);
router.post("/register",registrations.create);
router.get("/logIn", session.new);
router.post("/logIn", session.create);
router.get("/logOut", session.logOut);

router.get("/polls",middlewares.requireUser,polls.init);
router.get("/polls/new",middlewares.requireUser,polls.newPoll);
router.post("/polls/new",middlewares.requireUser,polls.create);
router.get("/polls/:id",polls.poll);
router.patch("/polls/:id/vote",polls.vote);
router.delete('/polls/:id',middlewares.requireUser,polls.delete);
router.get("/polls/:id/result",polls.result);


module.exports = router;