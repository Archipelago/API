#!/usr/bin/env node

let crypto = require('crypto');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let Maria = require('mariasql');
let sendResponse = require('./sendResponse');
global.config = require(process.env.CONFIG_FILE || './config.json');
global.db = new Maria({host: config.db.host,
		       user: config.db.user,
		       password: config.db.password,
		       db: config.db.name});
global.tokens = {};
global.users = {};
global.lists = {
  'audioCodecs': [],
  'videoCodecs': [],
  'compressions': [],
  'languages': [],
  'qualities': [],
  'sources': [],
  'containers': []
};


global.checkToken = function(req, res, next) {
  delete req.headers.login;
  if (req.headers.token === undefined)
    sendResponse(res, 401, {status: "Error", message: "You need to be logged to do it"})
  else if (tokens[req.headers.token] === undefined)
    sendResponse(res, 401, {status: "Error", message: "Invalid token"})
  else {
    req.headers.login = tokens[req.headers.token];
    req.body.token = req.headers.token;
    next(req, res);
  }
}

app.listen(process.env.PORT || config.port);
app.use(bodyParser.json({type: '*/*'}));

require('./routes/user.js')(app);
require('./routes/movie.js')(app);
require('./routes/releases.js')(app);
require('./routes/links.js')(app);
require('./routes/lists.js')(app);
