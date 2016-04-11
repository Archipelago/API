#!/usr/bin/env node

var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Maria = require('mariasql');
var sendResponse = require('./sendResponse');
GLOBAL.config = require('./config.json');
GLOBAL.db = new Maria({host: config.db.host,
		       user: config.db.user,
		       password: config.db.password,
		       db: config.db.name});
GLOBAL.tokens = {};
GLOBAL.users = {};

function checkToken(req, res, next) {
  delete req.headers.login;
  if (req.headers.token === undefined)
    sendResponse(res, 401, {status: "Error", message: "You need to be logged to do it"})
  else if (tokens[req.headers.token] === undefined)
    sendResponse(res, 401, {status: "Error", message: "Invalid token"})
  else {
    req.headers.login = tokens[req.headers.token];
    next(req, res);
  }
}

app.listen(process.env.PORT || config.port);
app.use(bodyParser.json({type: '*/*'}));
app.post('/register', function(req, res) {
  require('./models/user.js').register(req.body, function(e, r) {
    if (e)
      sendResponse(res, 400, {status: "Error", message: e});
    else
      sendResponse(res, 201, {status: "Created"});
  });
});

app.post('/login', function(req, res) {
  require('./models/user.js').login(req.body, function(e, r) {
    if (e)
      sendResponse(res, 400, {status: "Error", message: e});
    else {
      var login = req.body.login.trim();
      if (users[login]
	  && users[login].token)
	sendResponse(res, 200, {status: "OK", token: users[login].token});
      else {
	var t = crypto.randomBytes(32).toString('hex');
	users[login] = {token: t, id: r[0].id};
	tokens[t] = login;
	sendResponse(res, 200, {status: "OK", token: t});
      }
    }
  });
});
