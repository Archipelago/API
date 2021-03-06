let _ = require('lodash');
let sendResponse = require('../lib/sendResponse');

module.exports = function(app) {
  app.get('/config', function(req, res) {
    token.checkPermission(req, res, 'GET_CONFIG', function(req, res) {
      models.Config.get(function(e, r) {
	sendResponse(res, 200, r);
      });
    });
  });

  app.put('/config', function(req, res) {
    token.checkPermission(req, res, 'EDIT_CONFIG', function(req, res) {
      models.Config.addOrUpdate(req.body, function(e, r) {
	if (e)
	  sendResponse(res, 400, {message: e});
	else
	  sendResponse(res, 204);
      });
    });
  });

  app.delete('/config/:name', function(req, res) {
    token.checkPermission(req, res, 'EDIT_CONFIG', function(req, res) {
      models.Config.delete(req.params.name, function(e, r) {
	if (e)
	  sendResponse(res, 404, {message: e});
	else
	  sendResponse(res, 204);
      });
    });
  });
}
