let sendResponse = require('../lib/sendResponse');

module.exports = function(app) {
  //TODO: fix it, server crash if invalid parameters are provided
  app.post('/movie/:id/release', function(req, res) {
    token.checkPermission(req, res, 'ADD_RELEASE', function(req, res) {
      req.body.id = req.params.id;
      req.body.user_id = token.getId(req.headers.token);
      models.Release.add(req.body, function(e, r) {
	if (e)
	  sendResponse(res, e.match('found') ? 404 : 400, {message: e});
	else
	  sendResponse(res, 201, {id: parseInt(r.info.insertId)});
      });
    });
  });

  app.get('/movie/:id/releases', function(req, res) {
    models.Release.getByMovie(req.params.id, function(e, r) {
      if (e)
	sendResponse(res, 404, {message: e});
      else
	sendResponse(res, 200, r);
    });
  });

  app.delete('/video_release/:id', function(req, res) {
    token.checkPermission(req, res, 'DELETE_RELEASE', function(req, res) {
      models.Release.delete(req.params.id, function(e, r) {
	if (e)
	  sendResponse(res, 404, {message: e});
	else
	  sendResponse(res, 204);
      });
    })
  });

  app.patch('/video_release/:id', function(req, res) {
    token.checkPermission(req, res, 'EDIT_RELEASE', function(req, res) {
      models.Release.update(req.params.id, req.body, function(e, r) {
	if (e)
	  sendResponse(res, 404, {message: e});
	else
	  sendResponse(res, 204);
      });
    })
  });
}
