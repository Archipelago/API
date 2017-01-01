let _ = require('lodash');
let sendResponse = require('../sendResponse');

module.exports = function(app) {
  app.get('/config', function(req, res) {
    token.checkPermission(req, res, 'GET_CONFIG', function(req, res) {
      require('../models/config.js').get(function(e, r) {
	sendResponse(res, 200, r);
      });
    });
  });

  app.put('/config', function(req, res) {
    token.checkPermission(req, res, 'EDIT_CONFIG', function(req, res) {
      require('../models/config.js').addOrUpdate(req.body, function(e, r) {
	if (e)
	  sendResponse(res, 400, e);
	else
	  sendResponse(res, 204);
      });
    });
  });


  app.delete('/config/:name', function(req, res) {
    token.checkPermission(req, res, 'EDIT_CONFIG', function(req, res) {
      require('../models/config.js').delete(req.params.name, function(e, r) {
	if (e)
	  sendResponse(res, 404, {message: e});
	else
	  sendResponse(res, 204);
      });
    });
  });
}
