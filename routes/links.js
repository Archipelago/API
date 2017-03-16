let sendResponse = require('../lib/sendResponse');

module.exports = function(app) {
  app.post('/video_release/:id/link', function(req, res) {
    req.body = {links: req.body};
    token.checkPermission(req, res, 'ADD_LINK', function(req, res) {
      req.body.user_id = token.getId(req.headers.token);
      req.body.release_type = 'movie';
      req.body.release_id = req.params.id;
      require('../models/links.js').add(req.body, function(e, r) {
	if (e)
	  sendResponse(res, 400, {message: e});
	else {
	  let response = [];
	  for (let i = 0; i < r.info.affectedRows; ++i)
	    response.push(parseInt(r.info.insertId) + i);
	  sendResponse(res, 201, response);
	}
      });
    });
  });

  app.get('/video_release/:id/links', function(req, res) {
    require('../models/links.js').getByRelease(req.params.id, function(e, r) {
      if (e)
	sendResponse(res, 404, {message: e});
      else
	sendResponse(res, 200, r);
    });
  });

  app.delete('/link/:id', function(req, res) {
    token.checkPermission(req, res, 'DELETE_LINK', function(req, res) {
      require('../models/links.js').delete(req.params.id, function(e, r) {
	if (e)
	  sendResponse(res, 404, {message: e});
	else
	  sendResponse(res, 204);
      });
    })
  });

  app.patch('/link/:id', function(req, res) {
    token.checkPermission(req, res, 'EDIT_LINK', function(res, res) {
      require('../models/links.js').update(req.params.id, req.body, function(e, r) {
	if (e)
	  sendResponse(res, 400, {message: 'This link is a duplicate.'});
	else if (r.info.affectedRows != 1)
	  sendResponse(res, 404, {message: 'No link with id "' + req.params.id + '" found.'});
	else
	  sendResponse(res, 204);
      });
    });
  });
}
