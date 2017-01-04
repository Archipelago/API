let sendResponse = require('../sendResponse');

module.exports = function(app) {
  app.get('/garbage', function(req, res) {
    token.checkPermission(req, res, 'GARBAGE', function(req, res) {
      require('../models/garbage.js').list(function(e, r) {
	sendResponse(res, 200, r);
      });
    });
  });
}
