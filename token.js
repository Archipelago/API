let crypto = require('crypto');
let sendResponse = require('./sendResponse');

module.exports = function() {
  // token: login
  let tokens = {};
  // login: {token, id, permissions}
  let users = {};
  const permissions = {
    'ADD_ELEMENT': 1 << 1,
    'EDIT_ELEMENT': 1 << 2,
    'DELETE_ELEMENT': 1 << 3,
    'ADD_RELEASE': 1 << 4,
    'EDIT_RELEASE': 1 << 5,
    'DELETE_RELEASE': 1 << 6,
    'ADD_LINK': 1 << 7,
    'EDIT_LINK': 1 << 8,
    'DELETE_LINK': 1 << 9,
    'EDIT_USER': 1 << 10,
    'DELETE_USER': 1 << 11,
    'BAN_USER': 1 << 12,
    'EDIT_PERMISSION': 1 << 13
  };

  this.getId = function(t) {
    return users[tokens[t]].id;
  }

  this.getLogin = function(t) {
    return users[tokens[t]].login;
  }

  this.authenticate = function(res, id, login, permissions) {
    login = login.trim();
    if (users[login]
	&& users[login].token)
      sendResponse(res, 200, {token: users[login].token});
    else {
      let t = crypto.randomBytes(32).toString('hex');
      users[login] = {token: t, id: parseInt(id), permissions: permissions}
      tokens[t] = login;
      sendResponse(res, 200, {token: t});
    }
  }

  // User with id 1 has all permission
  let hasPermission = function(user, permissionName) {
    return (user.id === 1 || user.permissions & permissions[permissionName] !== 0)
  }

  this.checkPermission = function(req, res, next) {
    if (req.headers.token === undefined)
      sendResponse(res, 401, {message: "You need to be logged to do it"});
    else if (tokens[req.headers.token] === undefined)
      sendResponse(res, 401, {message: "Invalid token"});
    else if (!hasPermission(users[tokens[req.headers.token]], permission))
      sendResponse(res, 403, {message: "You don't have the permission to do that."});
    else
      next(req, res);
  }

  this.checkAuthentication = function(req, res, next) {
    if (req.headers.token === undefined)
      sendResponse(res, 401, {message: "You need to be logged to do it"});
    else if (tokens[req.headers.token] === undefined)
      sendResponse(res, 401, {message: "Invalid token"});
    else
      next(req, res);
  }
}
