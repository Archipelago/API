let sendResponse = require('../sendResponse');
let avail = ['movie', 'release', 'link', 'user'];

function getType(query) {
  let type = query.type || query.t || '*';
  if (type instanceof Array)
    type = type[type.length - 1];
  type = type.split(',');
  for (i in type) {
    if (type === '*') {
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

module.exports = function(app) {
  app.get('/search', function(req, res) {
    let type = req.query.type || req.query.t || '*';
    try {
      console.log(getType(req.query));
    } catch(e) {
      sendResponse(res, 400, {status: "Error", message: e});
    }
  });
}
