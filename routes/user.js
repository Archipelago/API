let crypto = require('crypto');
let sendResponse = require('../sendResponse');

module.exports = function(app) {
  app.post('/register', function(req, res) {
    require('../models/user.js').register(req.body, function(e, r) {
      if (e)
	sendResponse(res, 400, {status: "Error", message: e});
      else
	sendResponse(res, 201, {status: "Created"});
    });
  });

  app.post('/login', function(req, res) {
    require('../models/user.js').login(req.body, function(e, r) {
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
}
