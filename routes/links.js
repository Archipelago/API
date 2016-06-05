let sendResponse = require('../sendResponse');

module.exports = function(app) {
  app.post('/video_release/:id/link/add', function(req, res) {
    req.body = {links: req.body};
    token.checkAuthentication(req, res, function(req, res) {
      // TODO: add permission
      req.body.user_id = token.getId(req.body.token);
      req.body.release_type = 'movie';
      req.body.release_id = req.params.id;
      require('../models/links.js').add(req.body, function(e, r) {
	if (e)
	  sendResponse(res, 400, {status: "Error", message: e});
	else
	  sendResponse(res, 201, {status: "Created"});
      });
    });
  });

  app.get('/video_release/:id/links', function(req, res) {
    require('../models/links.js').getByRelease(req.params.id, function(e, r) {
      if (e)
	sendResponse(res, 404, {status: "Error", message: e});
      else
	sendResponse(res, 200, r);
    });
  });
}
