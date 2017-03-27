let sendResponse = require('../lib/sendResponse');

module.exports = function(app) {
  app.get('/garbage', function(req, res) {
    token.checkPermission(req, res, 'GARBAGE', function(req, res) {
      models.Garbage.list(function(e, r) {
	sendResponse(res, 200, r);
      });
    });
  });

  app.get('/garbage/:id', function(req, res) {
    token.checkPermission(req, res, 'GARBAGE', function(req, res) {
      models.Garbage.contribs(req.params.id, function(e, r) {
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
	models.Garbage.save(req.params.id, global.otfConfig.garbageUserId, function(e, r) {
	  models.User.delete(req.params.id, function(e, r) {
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
	models.User.delete(req.params.id, function(e, r) {
	  if (r.info.affectedRows < 1)
	    sendResponse(res, 404, {message: 'User with id "' + req.params.id + '" does not exist'});
	  else
	    sendResponse(res, 204);
	});
      }
    });
  });
}
