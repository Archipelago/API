let _ = require('lodash');
let sendResponse = require('../lib/sendResponse');
let models = {
  'movie': global.models.Movie,
  'release': global.models.Release,
  'user': global.models.User,
  'link': global.models.Link
}

function getType(query) {
  let type = query.type || query.t || '*';
  if (type instanceof Array)
    type = type[type.length - 1];
  type = type.split(',');
  for (i in type) {
    if (type[i] === '*')
      return _.keys(models);
    else if (models[type[i]] === undefined)
      throw 'Invalid type "' + type[i] + '" found';
  }
  return type;
}

function searchTypes(query, types, cb) {
  let data = {};
  let j = 0;
  for (i in types) {
    let type = types[i];
    if (models[type].search) {
      ++j;
      models[type].search(query, function(e, r) {
	data[type] = r;
	if (_.size(data) === j)
	  cb(e, data);
      });
    }
  }
}

module.exports = function(app) {
  app.get('/search', function(req, res) {
    let query = req.query.query || req.query.q;
    if (query === undefined)
      sendResponse(res, 400, {message: 'Missing "query" parameter'});
    else {
      try {
	let type = getType(req.query);
	searchTypes(query, type, function(e, r) {
	  sendResponse(res, 200, r);
	});
      } catch(e) {
	sendResponse(res, 400, {message: e});
      }
    }
  });
}
