let crypto = require('crypto');

let sha1 = function(str) {
  return crypto.createHash('sha1').update(str).digest('hex');
}

let hashes = {
  'sha256-salt': function(password, salt) {
    return crypto.createHmac('sha256', salt + password).digest('hex');
  },

  'sha1-salt-sha1': function(password) {
    return sha1(sha1(password) + '52422a');
  }
}

module.exports.preferred = function() {
  return 'sha256-salt';
}

module.exports.hash = function(password, method) {
  if (method === undefined)
    method = module.exports.preferred();

  let ret = {
    method: method,
    salt: undefined
  };
  switch (method) {
  case 'sha256-salt':
    ret.salt = crypto.randomBytes(16).toString('hex');
    ret.hash = hashes[method](password, ret.salt);;
    break;
  case 'sha1-salt-sha1':
    ret.hash = hashes[method](password);
  }
  return ret;
}

module.exports.check = function(password, hash, salt, method) {
  if (method === undefined)
    method = module.exports.preferred();

  if (hashes[method])
    return hash === hashes[method](password, salt);
  return false;
}
