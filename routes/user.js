let sendResponse = require('../sendResponse');

module.exports = function(app) {
  app.post('/register', function(req, res) {
    require('../models/user.js').register(req.body, function(e, r) {
      if (e)
	sendResponse(res, 400, {message: e});
      else
	sendResponse(res, 201, {});
    });
  });

  app.post('/login', function(req, res) {
    require('../models/user.js').login(req.body, function(e, r) {
      if (e)
	sendResponse(res, 400, {message: e});
      else
	token.authenticate(res, r.id, req.body.login, r.permissions);
    });
  });
}
