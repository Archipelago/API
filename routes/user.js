let sendResponse = require('../sendResponse');

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
    token.checkPermission(req, res, 'EDIT_PERMISSION', function(e, r) {
      require('../models/user.js').getById(req.params.id, function(e, r) {
	if (e)
	  sendResponse(res, 404, {message: e});
	else
	  token.updatePermission(req, res, r);
      });
    });
  });
}
