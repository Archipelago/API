#!/usr/bin/env node

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let Maria = require('mariasql');
let Token = require('./lib/token');
let epur = require('./lib/epur');
global.config = require(process.env.CONFIG_FILE || './config.json');
global.db = new Maria({host: config.db.host,
		       user: config.db.user,
		       password: config.db.password,
		       db: config.db.name});
global.token = new Token;
global.lists = {
  'audio_codecs': [],
  'video_codecs': [],
  'compressions': [],
  'languages': [],
  'qualities': [],
  'sources': [],
  'containers': []
};
global.otfConfig = {};
global.models = require('./models');
require('./models/config.js').get(function(e, r) {});

app.set('x-powered-by', false);
app.listen(process.env.PORT || config.port);
app.use(bodyParser.json({type: '*/*',
			 strict: false}));
app.use(function(req, res, next) {
  if (req.body)
    req.body = epur(req.body);
  next();
});

require('./routes/user.js')(app);
require('./routes/movie.js')(app);
require('./routes/releases.js')(app);
require('./routes/links.js')(app);
require('./routes/lists.js')(app);
require('./routes/search.js')(app);
require('./routes/config.js')(app);
require('./routes/garbage.js')(app);
