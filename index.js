#!/usr/bin/env node

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
