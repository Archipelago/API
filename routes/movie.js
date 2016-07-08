let sendResponse = require('../sendResponse');

module.exports = function(app) {
  app.post('/movie', function(req, res) {
    token.checkAuthentication(req, res, function(req, res) {
      // TODO: add permission
      req.body.user_id = token.getId(req.headers.token);
      require('../models/movie.js').add(req.body, function(e, r) {
	if (e)
	  sendResponse(res, 400, {message: e});
	else {
	  sendResponse(res, 201, {});
	}
      });
    });
  });

  app.get('/movie/:id', function(req, res) {
    require('../models/movie.js').getById(req.params.id, function(e, r) {
      if (e)
	sendResponse(res, 404, {message: e});
      else
	sendResponse(res, 200, r);
    });
  });

  app.get('/movies/last/:nb', function(req, res) {
    if (req.params.nb < 1 || req.params.nb > 100)
      sendResponse(res, 400, {message: 'Invalid number of movies provided'});
    else {
      require('../models/movie.js').getLasts(req.params.nb, function(e, r) {
	sendResponse(res, 200, r);
      });
    }
  });
}
