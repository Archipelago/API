let sendResponse = require('../sendResponse');

module.exports = function(app) {
  app.post('/movie', function(req, res) {
    token.checkPermission(req, res, 'ADD_ELEMENT', function(req, res) {
      req.body.user_id = token.getId(req.headers.token);
      require('../models/movie.js').add(req.body, function(e, r) {
	if (e)
	  sendResponse(res, 400, {message: e});
	else {
	  sendResponse(res, 201, {id: parseInt(r.info.insertId)});
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

  app.delete('/movie/:id', function(req, res) {
    token.checkPermission(req, res, 'DELETE_ELEMENT', function(req, res) {
      require('../models/movie.js').delete(req.params.id, function(e, r) {
	if (e)
	  sendResponse(res, 404, {message: e});
	else
	  sendResponse(res, 204);
      });
    });
  });

  app.get(['/movies/last/:nb', '/movies/last'], function(req, res) {
    let nb = req.params.nb || 15;
    if (nb < 1 || nb > 100)
      sendResponse(res, 400, {message: 'Invalid number of movies provided'});
    else {
      require('../models/movie.js').getLasts(nb, function(e, r) {
	sendResponse(res, 200, r);
      });
    }
  });

  app.get(['/movies/lastReleases/:nb', '/movies/lastReleases'], function(req, res) {
    let nb = req.params.nb || 15;
    if (nb < 1 || nb > 100)
      sendResponse(res, 400, {message: 'Invalid number of movies provided'});
    else {
      require('../models/movie.js').getLastReleases(nb, function(e, r) {
	sendResponse(res, 200, r);
      });
    }
  });

  app.get(['/movies/lastLinks/:nb', '/movies/lastLinks'], function(req, res) {
    let nb = req.params.nb || 15;
    if (nb < 1 || nb > 100)
      sendResponse(res, 400, {message: 'Invalid number of movies provided'});
    else {
      require('../models/movie.js').getLastLinks(nb, function(e, r) {
	sendResponse(res, 200, r);
      });
    }
  });

  app.get(['/movies/alpha', '/movies/alpha/:letter', '/movies/alpha/:letter/:nb', '/movies/alpha/:letter/:nb/:page'], function(req, res) {
    let nb = req.params.nb || 15;
    let page = req.params.page || 1;
    let letter = req.params.letter;
    if (nb < 1 || nb > 100)
      sendResponse(res, 400, {message: 'Invalid number of movies provided'});
    else if (page < 1)
      sendResponse(res, 400, {message: 'Invalid number of page provided'});
    else if (letter === undefined || !letter.match(/^[a-z\*]$/i))
      sendResponse(res, 400, {message: 'Invalid letter provided'});
    else {
      require('../models/movie.js').getAlpha(letter, nb, page, function(e, r) {
	sendResponse(res, 200, r);
      });
    }
  });
}
