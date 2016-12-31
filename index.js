#!/usr/bin/env node

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let Maria = require('mariasql');
let Token = require('./token');
global.config = require(process.env.CONFIG_FILE || './config.json');
global.db = new Maria({host: config.db.host,
		       user: config.db.user,
		       password: config.db.password,
		       db: config.db.name});
global.token = new Token;
global.lists = {
  'audioCodecs': [],
  'videoCodecs': [],
  'compressions': [],
  'languages': [],
  'qualities': [],
  'sources': [],
  'containers': []
};

app.set('x-powered-by', false);
app.listen(process.env.PORT || config.port);
app.use(bodyParser.json({type: '*/*'}));

require('./routes/user.js')(app);
require('./routes/movie.js')(app);
require('./routes/releases.js')(app);
require('./routes/links.js')(app);
require('./routes/lists.js')(app);
require('./routes/search.js')(app);
require('./routes/config.js')(app);
