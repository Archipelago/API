let password = require('../lib/password');

exports.hash = {
  'sha256-salt': function(test) {
    let hash = password.hash('azerty42', 'sha256-salt');
    test.equal(hash.method, 'sha256-salt');
    test.equal(hash.salt.length, 32);
    test.equal(hash.hash.length, 64);
    test.done();
  },

  'sha1-salt-sha1': function(test) {
    let hash = password.hash('azerty42', 'sha1-salt-sha1');
    test.equal(hash.method, 'sha1-salt-sha1');
    test.equal(hash.salt, undefined);
    test.equal(hash.hash, '0831e1a4655b23eb1bb82632b647def2ae39a70e');
    test.done();
  },

  default: function(test) {
    let hash = password.hash('azerty42');
    test.equal(hash.method, 'sha256-salt');
    test.equal(hash.salt.length, 32);
    test.equal(hash.hash.length, 64);
    test.done();
  }
}

exports.preferred = function(test) {
  test.equal(password.preferred(), 'sha256-salt');
  test.done();
}
