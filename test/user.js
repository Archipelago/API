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
};

exports.login = {
  erroneousPassword: function(test) {
    request('/login', {
      "login": "tmp" + hash,
      "password": "foobar41"
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  },

  noPassword: function(test) {
    request('/login', {
      "login": "tmp" + hash
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  },

  invalidLogin: function(test) {
    request('/login', {
      "login": crypto.randomBytes(16).toString('hex')
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  },

  valid: {
    stdUser: function(test) {
      request('/login', {
	"login": "tmp" + hash,
	"password": "foobar42"
      }, function(res) {
	global.token = res.body.token;
	test.equal(res.statusCode, 200);
	test.done();
      });
    },

    root: function(test) {
      request('/login', {
	"login": "root",
	"password": "foobar42"
      }, function(res) {
	global.rootToken = res.body.token;
	test.equal(res.statusCode, 200);
	test.done();
      });
    }
  }
};

exports.token = {
  sameToken: function(test) {
    request('/login', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(global.token, res.body.token);
      test.done();
    });
  },

  differentToken: function(test) {
    let hash = crypto.randomBytes(4).toString('hex');
    request('/register', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(res.statusCode, 201);
      request('/login', {
	"login": "tmp" + hash,
	"password": "foobar42"
      }, function(res) {
	test.notEqual(global.token, res.body.token);
	test.done();
      });
    });
  }
};

exports.get = {
  valid: function(test) {
    request('/user/1', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body.id, 1);
      test.equal(res.body.permissions.length > 0, true);
      test.done();
    });
  },

  invalid: function(test) {
    request('/user/-1', function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  },

  default: {
    unlogged: function(test) {
      request('/user', function(res) {
	test.equal(res.statusCode, 401);
	test.done();
      });
    },

    logged: function(test) {
      request('/user', global.token, undefined, function(res) {
	test.equal(res.statusCode, 200);
	test.equal(res.body.permissions.length, 0);
	test.done();
      });
    },

    rootUser: function(test) {
      request('/user', global.rootToken, undefined, function(res) {
	test.equal(res.body.login, 'root');
	test.equal(res.statusCode, 200);
	test.equal(res.body.permissions.length > 0, true);
	test.done();
      });
    }
  }
};
