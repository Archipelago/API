let crypto = require('crypto');
let sendResponse = require('./sendResponse');

module.exports = function() {
  // token: login
  let tokens = {};
  // login: {token, id, permissions}
  let users = {};
  // id: token
  let ids = {};
  const permissions = {
    'ADD_ELEMENT': 1 << 0,
    'EDIT_ELEMENT': 1 << 1,
    'DELETE_ELEMENT': 1 << 2,
    'ADD_RELEASE': 1 << 3,
    'EDIT_RELEASE': 1 << 4,
    'DELETE_RELEASE': 1 << 5,
    'ADD_LINK': 1 << 6,
    'EDIT_LINK': 1 << 7,
    'DELETE_LINK': 1 << 8,
    'EDIT_USER': 1 << 9,
    'DELETE_USER': 1 << 10,
    'BAN_USER': 1 << 11,
    'EDIT_PERMISSION': 1 << 12,
    'GET_CONFIG': 1 << 13,
    'EDIT_CONFIG': 1 << 14,
    'GARBAGE': 1 << 15
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
      ids[parseInt(id)] = t;
      sendResponse(res, 200, {token: t});
    }
  }

  this.disconnect = function(id) {
    delete users[tokens[ids[id]]];
    delete tokens[ids[id]];
    delete ids[id];
  }

  // User with id 1 has all permission
  let hasPermission = function(user, permissionName) {
    return (permissionName === 'NONE' || user.id === 1 || (user.permissions & permissions[permissionName]) !== 0)
  }

  this.getPermissions = function(value, id) {
    let array = [];
    let fakeUser = {id: id, permissions: value};
    for (let i in permissions) {
      if (hasPermission(fakeUser, i))
	array.push(i);
    }
    return array;
  }

  this.getPermissionInt = function(array, id) {
    if (id === 1)
      return ~0;
    let ret = 0;
    for (let i in array) {
      if (permissions[array[i]] === undefined)
	return null;
      ret |= permissions[array[i]];
    }
    return ret;
  }

  this.checkPermission = function(req, res, permission, next) {
    if (req.headers.token === undefined)
      sendResponse(res, 401, {message: "You need to be logged to do it"});
    else if (tokens[req.headers.token] === undefined)
      sendResponse(res, 401, {message: "Invalid token"});
    else if (!hasPermission(users[tokens[req.headers.token]], permission))
      sendResponse(res, 403, {message: "You don't have the permission to do that."});
    else
      next(req, res);
  }

  let canUpdatePermission = function(permissions, toUpdate) {
    return permissions | toUpdate === permissions;
  }

  this.updatePermission = function(req, res, user) {
    let addPermissions = this.getPermissionInt(req.body.add, req.params.id);
    let removePermissions = this.getPermissionInt(req.body.remove, req.params.id);
    let myRights = users[tokens[req.headers.token]].id === 1 ? ~0 : users[tokens[req.headers.token]].permissions;
    if (addPermissions === null
	|| removePermissions === null)
      sendResponse(res, 400, {message: "One of the given permissions is incorrect"});
    else if (parseInt(req.params.id) === users[tokens[req.headers.token]].id)
      sendResponse(res, 403, {message: "You cannot change your own permissions"});
    else if ((myRights | addPermissions) !== myRights
	     || (myRights | removePermissions) !== myRights)
      sendResponse(res, 403, {message: "You don't have the permission to change those permissions"});
    else {
      let newPermissions = (user.permissions & ~removePermissions) | addPermissions;
      if (users[user.login] !== undefined) {
	users[user.login].permissions = newPermissions;
      }
      require('../models/user').updatePermission(req.params.id, newPermissions, function(e, r) {
	sendResponse(res, 200, {});
      });
    }
  }
}
