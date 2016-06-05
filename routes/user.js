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
	token.authenticate(res, r[0].id, req.body.login, 0);
      }
    });
  });
}
