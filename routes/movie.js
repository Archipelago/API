let sendResponse = require('../sendResponse');

module.exports = function(app) {
  app.post('/movie/add', function(req, res) {
    token.checkAuthentication(req, res, function(req, res) {
      // TODO: add permission
      require('../models/movie.js').add(req.body, function(e, r) {
	if (e)
	  sendResponse(res, 400, {status: "Error", message: e});
	else {
	  sendResponse(res, 201, {status: "Created"});
	}
      });
    });
  });

  app.get('/movie/get/:id', function(req, res) {
    require('../models/movie.js').getById(req.params.id, function(e, r) {
      if (e)
	sendResponse(res, 404, {status: "Error", message: e});
      else
	sendResponse(res, 200, r);
    });
  });
}
