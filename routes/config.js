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
}
