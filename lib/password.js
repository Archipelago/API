let crypto = require('crypto');

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
    ret.hash = crypto.createHmac('sha256', ret.salt + password).digest('hex');
    break;
  case 'sha1-salt-sha1':
    let sha1 = function(str) {
      return crypto.createHash('sha1').update(str).digest('hex');
    }
    ret.hash = sha1(sha1(password) + '52422a');
  }
  return ret;
}

module.exports.check = function(password, hash, salt, method) {
  if (method === undefined)
    method = module.exports.preferred();

  switch(method) {
  case 'sha256-salt':
    return hash === crypto.createHmac('sha256', salt + password).digest('hex');
  case 'sha1-salt-sha1':
    let sha1 = function(str) {
      return crypto.createHash('sha1').update(str).digest('hex');
    }
    return hash === sha1(sha1(password) + '52422a');
  }
  return false;
}
