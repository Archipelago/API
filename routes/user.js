let sendResponse = require('../lib/sendResponse');

module.exports = function(app) {
  app.post('/register', function(req, res) {
    require('../models/user.js').register(req.body, function(e, r) {
      if (e)
	sendResponse(res, 400, {message: e});
      else
	sendResponse(res, 201, {id: parseInt(r.info.insertId)});
    });
  });

  app.post('/login', function(req, res) {
    require('../models/user.js').login(req.body, function(e, r) {
      if (e)
	sendResponse(res, 400, {message: e});
      else
	token.authenticate(res, r.id, req.body.login, r.permissions);
    });
  });

  // TODO: manage data hiding (mail, bm...)
  app.get(['/user', '/user/:id'], function(req, res) {
    if (req.params.id) {
      require('../models/user.js').getById(req.params.id, function(e, r) {
	if (e)
	  sendResponse(res, 404, {message: e});
	else {
	  r.permissions = token.getPermissions(r.permissions, r.id);
	  sendResponse(res, 200, r);
	}
      });
    } else {
      token.checkPermission(req, res, 'NONE', function(e, r) {
	require('../models/user.js').getById(token.getId(req.headers.token), function(e, r) {
	  if (e)
	    sendResponse(res, 404, {message: e});
	  else {
	    r.permissions = token.getPermissions(r.permissions, r.id);
	    sendResponse(res, 200, r);
	  }
	});
      });
    }
  });

  app.patch('/user/:id/permission', function(req, res) {
    token.checkPermission(req, res, 'EDIT_PERMISSION', function(req, res) {
      require('../models/user.js').getById(req.params.id, function(e, r) {
	if (e)
	  sendResponse(res, 404, {message: e});
	else
	  token.updatePermission(req, res, r);
      });
    });
  });

  app.patch(['/user', '/user/:id'], function(req, res) {
    token.checkPermission(req, res, 'NONE', function(req, res) {
      let cb = function(req, res) {
	require('../models/user.js').update(req.params.id, req.body, function(e, r) {
	  if (e)
	    sendResponse(res, 400, {message: e});
	  else if (r.info.affectedRows != 1)
	    sendResponse(res, 404, {message: "No user with id '" + req.params.id + "' found."});
	  else sendResponse(res, 204);
	});
      }
      if (!req.params.id)
	req.params.id = token.getId(req.headers.token);
      if (req.params.id != token.getId(req.headers.token)) {
	token.checkPermission(req, res, 'EDIT_USER', function(req, res) {
	  cb(req, res);
	});
      }
      else
	cb(req, res);
    });
  });

  app.delete(['/user/:id/', '/user/:id/complete'], function(req, res) {
    token.checkPermission(req, res, 'NONE', function(req, res) {
      let cb = function(req, res) {
	if (req.originalUrl.match(/^\/*user\/+.*\/+complete\/*$/)) {
	  require('../models/user.js').delete(req.params.id, function(e, r) {
	    token.disconnect(req.params.id);
	    sendResponse(res, 204);
	  });
	} else {
	  require('../models/user.js').deactivate(req.params.id, function(e, r) {
	    token.disconnect(req.params.id);
	    sendResponse(res, 204);
	  });
	}
      }

      if (req.params.id === 'me')
	req.params.id = token.getId(req.headers.token);
      if (req.params.id == 1
	  || req.params.id == global.otfConfig.garbageUserId) {
	sendResponse(res, 403, {message: 'This user can not be deleted'});
      }
      else if (req.params.id != token.getId(req.headers.token))
	token.checkPermission(req, res, 'DELETE_USER', function(req, res) {
	  cb(req, res);
	});
      else
	cb(req, res);
    });
  });
}
