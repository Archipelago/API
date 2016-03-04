#!/usr/bin/env node

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Maria = require('mariasql');
GLOBAL.db = new Maria({host: '127.0.0.1', user: 'root', password: 'toor', db: 'foobar'});

app.listen(8000);
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
