#!/usr/bin/env node

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Maria = require('mariasql');
GLOBAL.config = require('./config.json');
GLOBAL.db = new Maria({host: config.db.host,
		       user: config.db.user,
		       password: config.db.password,
		       db: config.db.name});

app.listen(process.env.PORT || config.port);
app.use(bodyParser.json({type: '*/*'}));
app.post('/register', function(req, res) {
  require('./models/user.js').register(req.body, function(e, r) {
    if (e) {
      res.statusCode = 400;
      res.end(JSON.stringify({status: "Error", message: e}));
    }
    else {
      res.statusCode = 201;
      res.end(JSON.stringify({status: "Created"}));
    }
  });
});
