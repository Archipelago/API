#!/usr/bin/env node

let crypto = require('crypto');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let Maria = require('mariasql');
let sendResponse = require('./sendResponse');
global.config = require('./config.json');
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


function checkToken(req, res, next) {
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
      let login = req.body.login.trim();
      if (users[login]
	  && users[login].token)
	sendResponse(res, 200, {status: "OK", token: users[login].token});
      else {
	let t = crypto.randomBytes(32).toString('hex');
	users[login] = {token: t, id: r[0].id};
	tokens[t] = login;
	sendResponse(res, 200, {status: "OK", token: t});
      }
    }
  });
});

app.post('/movie/add', function(req, res) {
  checkToken(req, res, function(req, res) {
    // TODO: add permission
    require('./models/movie.js').add(req.body, function(e, r) {
      if (e)
	sendResponse(res, 400, {status: "Error", message: e});
      else {
	sendResponse(res, 201, {status: "Created"});
      }
    });
  });
});

app.get('/movie/get/:id', function(req, res) {
  require('./models/movie.js').getById(req.params.id, function(e, r) {
    if (e)
      sendResponse(res, 404, {status: "Error", message: e});
    else
      sendResponse(res, 200, r);
  });
});

//TODO: fix it, server crash if invalid parameters are provided
app.post('/movie/:id/release/add', function(req, res) {
  checkToken(req, res, function(req, res) {
    // TODO: add permission
    req.body.id = req.params.id;
    require('./models/releases.js').add(req.body, function(e, r) {
      if (e)
	sendResponse(res, e.match('found') ? 404 : 400, {status: "Error", message: e});
      else
	sendResponse(res, 201, {status: "Created"});
    });
  });
});

app.get('/movie/:id/releases', function(req, res) {
  require('./models/releases.js').getByMovie(req.params.id, function(e, r) {
    if (e)
      sendResponse(res, 404, {status: "Error", message: e});
    else
      sendResponse(res, 200, r);
  });
});

app.post('/video_release/:id/link/add', function(req, res) {
  req.body = {links: req.body};
  checkToken(req, res, function(req, res) {
    // TODO: add permission
    req.body.user_id = users[tokens[req.body.token]].id;
    req.body.release_type = 'movie';
    req.body.release_id = req.params.id;
    require('./models/links.js').add(req.body, function(e, r) {
      if (e)
	sendResponse(res, 400, {status: "Error", message: e});
      else
	sendResponse(res, 201, {status: "Created"});
    });
  });
});

app.get('/video_release/:id/links', function(req, res) {
  require('./models/links.js').getByRelease(req.params.id, function(e, r) {
    if (e)
      sendResponse(res, 404, {status: "Error", message: e});
    else
      sendResponse(res, 200, r);
  });
});

function listRoute(routeName) {
  app.get('/list/' + routeName, function(req, res) {
    require('./models/lists.js').get(routeName[0].toUpperCase() + routeName.slice(1), function(e, r) {
      sendResponse(res, 200, r);
    });
  });
}

// TODO: find a way to update it.
function initList(listName) {
  require('./models/lists.js').get(listName[0].toUpperCase() + listName.slice(1), function(e, r) {
    lists[listName] = r;
  });
}

for (i in lists) {
  initList(i);
  listRoute(i);
}
