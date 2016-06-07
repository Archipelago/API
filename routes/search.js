let sendResponse = require('../sendResponse');
// TODO : merge those two objects
let avail = ['movie', 'release', 'link', 'user'];
let models = {
  'movie': require('../models/movie'),
  'release': require('../models/releases'),
  'user': require('../models/user'),
  'link': require('../models/links')
}

function getType(query) {
  let type = query.type || query.t || '*';
  if (type instanceof Array)
    type = type[type.length - 1];
  type = type.split(',');
  for (i in type) {
    if (type[i] === '*') {
      type = avail;
      break;
    }
    else {
      let found = false;
      for (j in avail)
	if (type[i] === avail[j]) {
	  found = true;
	  break;
	}
      if (!found)
	throw 'Invalid type "' + type[i] + '" found';
    }
  }
  return type;
}

function searchTypes(query, types, cb) {
  let data = {};
  for (i in types) {
    let type = types[i];
    if (models[type].search)
      models[type].search(query, function(e, r) {
	data[type] = r;
	cb(e, data);
      });
  }
}

module.exports = function(app) {
  app.get('/search', function(req, res) {
    let query = req.query.query || req.query.q;
    if (query === undefined)
      sendResponse(res, 400, {status: "Error", message: 'Missing "query" parameter'});
    else {
      try {
	let type = getType(req.query);
	searchTypes(query, type, function(e, r) {
	  sendResponse(res, 200, r);
	});
      } catch(e) {
	console.log(e);
	sendResponse(res, 400, {status: "Error", message: e});
      }
    }
  });
}
