let crypto = require('crypto');
let hash = crypto.randomBytes(4).toString('hex');

exports.register = {
  valid: function(test) {
    request('/register', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(res.statusCode, 201);
      test.done();
    });
  },

  alreadyUsed: function(test) {
    request('/register', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  }
}
