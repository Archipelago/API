let sendResponse = require('../lib/sendResponse');

module.exports = function(app) {
  app.get('/garbage', function(req, res) {
    token.checkPermission(req, res, 'GARBAGE', function(req, res) {
      require('../models/garbage.js').list(function(e, r) {
	sendResponse(res, 200, r);
      });
    });
  });

  app.get('/garbage/:id', function(req, res) {
    token.checkPermission(req, res, 'GARBAGE', function(req, res) {
      require('../models/garbage.js').contribs(req.params.id, function(e, r) {
	if (e)
	  sendResponse(res, 404, {message: e});
	else
	  sendResponse(res, 200, r);
      });
    });
  });

  app.post('/garbage/:id/save', function(req, res) {
    token.checkPermission(req, res, 'GARBAGE', function(req, res) {
      if (req.params.id == global.otfConfig.garbageUserId
	  || req.params.id == 1) {
	sendResponse(res, 403, {message: 'This user can not be garbaged'});
      } else {
	require('../models/garbage.js').save(req.params.id, global.otfConfig.garbageUserId, function(e, r) {
	  require('../models/user.js').delete(req.params.id, function(e, r) {
	    if (r.info.affectedRows < 1)
	      sendResponse(res, 404, {message: 'User with id "' + req.params.id + '" does not exist'});
	    else
	      sendResponse(res, 204);
	  });
	});
      }
    });
  });

  app.post('/garbage/:id/dismiss', function(req, res) {
    token.checkPermission(req, res, 'GARBAGE', function(req, res) {
      if (req.params.id == global.otfConfig.garbageUserId
	  || req.params.id == 1) {
	sendResponse(res, 403, {message: 'This user can not be garbaged'});
      } else {
	require('../models/user.js').delete(req.params.id, function(e, r) {
	  if (r.info.affectedRows < 1)
	    sendResponse(res, 404, {message: 'User with id "' + req.params.id + '" does not exist'});
	  else
	    sendResponse(res, 204);
	});
      }
    });
  });
}
