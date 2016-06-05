let sendResponse = require('../sendResponse');

module.exports = function(app) {
  //TODO: fix it, server crash if invalid parameters are provided
  app.post('/movie/:id/release/add', function(req, res) {
    token.checkAuthentication(req, res, function(req, res) {
      // TODO: add permission
      req.body.id = req.params.id;
      require('../models/releases.js').add(req.body, function(e, r) {
	if (e)
	  sendResponse(res, e.match('found') ? 404 : 400, {status: "Error", message: e});
	else
	  sendResponse(res, 201, {status: "Created"});
      });
    });
  });

  app.get('/movie/:id/releases', function(req, res) {
    require('../models/releases.js').getByMovie(req.params.id, function(e, r) {
      if (e)
	sendResponse(res, 404, {status: "Error", message: e});
      else
	sendResponse(res, 200, r);
    });
  });
}
