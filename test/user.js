let crypto = require('crypto');
let hash = crypto.randomBytes(4).toString('hex');
let async = require('async');
global.usersToCollect = [];

exports.register = {
  valid: function(test) {
    request.post('/register', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(res.statusCode, 201);
      test.equal(typeof res.body.id, 'number');
      test.done();
    });
  },

  alreadyUsed: function(test) {
    request.post('/register', {
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
    request.post('/login', {
      "login": "tmp" + hash,
      "password": "foobar41"
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  },

  noPassword: function(test) {
    request.post('/login', {
      "login": "tmp" + hash
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  },

  invalidLogin: function(test) {
    request.post('/login', {
      "login": crypto.randomBytes(16).toString('hex')
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  },

  valid: {
    stdUser: function(test) {
      request.post('/login', {
	"login": "tmp" + hash,
	"password": "foobar42"
      }, function(res) {
	global.token = res.body.token;
	test.equal(res.statusCode, 200);
	test.done();
      });
    },

    root: function(test) {
      request.post('/login', {
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
    request.post('/login', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(global.token, res.body.token);
      test.done();
    });
  },

  differentToken: function(test) {
    let hash = crypto.randomBytes(4).toString('hex');
    request.post('/register', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(res.statusCode, 201);
      request.post('/login', {
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
    request.get('/user/1', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body.id, 1);
      test.equal(res.body.permissions.length > 0, true);
      test.done();
    });
  },

  invalid: function(test) {
    request.get('/user/-1', function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  },

  default: {
    unlogged: function(test) {
      request.get('/user', function(res) {
	test.equal(res.statusCode, 401);
	test.done();
      });
    },

    logged: function(test) {
      request.get('/user', global.token, function(res) {
	test.equal(res.statusCode, 200);
	test.equal(res.body.permissions.length, 0);
	test.done();
      });
    },

    rootUser: function(test) {
      request.get('/user', global.rootToken, function(res) {
	test.equal(res.body.login, 'root');
	test.equal(res.statusCode, 200);
	test.equal(res.body.permissions.length > 0, true);
	test.done();
      });
    }
  }
};

exports.delete = {
  init: function(test) {
    async.times(6, function(i, cb) {
      request.post('/register', {
	"login": "tmp" + i + hash,
	"password": "foobar42"
      }, function(res) {
	test.equal(res.statusCode, 201);
	let newUser = {id: res.body.id};
	request.post('/login', {
	  "login": "tmp" + i + hash,
	  "password": "foobar42"
	}, function(res) {
	  test.equal(res.statusCode, 200);
	  newUser.token = res.body.token;
	  global.usersToCollect.push(newUser);
	  cb();
	});
      });
    }, function() {
      test.done();
    });
  },

  deactivate: {
    id: {
      unlogged: function(test) {
	request.delete('/user/' + usersToCollect[0].id, function(res) {
	  test.equal(res.statusCode, 401);
	  test.done();
	});
      },

      unauthorized: function(test) {
	request.delete('/user/' + usersToCollect[0].id, global.token, function(res) {
	  test.equal(res.statusCode, 403);
	  test.done();
	});
      },

      rootUser: function(test) {
	request.delete('/user/' + usersToCollect[0].id, global.rootToken, function(res) {
	  test.equal(res.statusCode, 204);
	  test.done();
	});
      },

      self: function(test) {
	request.delete('/user/' + usersToCollect[1].id, usersToCollect[1].token, function(res) {
	  test.equal(res.statusCode, 204);
	  test.done();
	});
      }
    },

    me: {
      unlogged: function(test) {
	request.delete('/user/me', function(res) {
	  test.equal(res.statusCode, 401);
	  test.done();
	});
      },

      valid: function(test) {
	request.delete('/user/me', usersToCollect[2].token, function(res) {
	  test.equal(res.statusCode, 204);
	  test.done();
	});
      }
    }
  },

  complete: {
    id: {
      unlogged: function(test) {
	request.delete('/user/' + usersToCollect[3].id + '/complete', function(res) {
	  test.equal(res.statusCode, 401);
	  test.done();
	});
      },

      unauthorized: function(test) {
	request.delete('/user/' + usersToCollect[3].id + '/complete', global.token, function(res) {
	  test.equal(res.statusCode, 403);
	  test.done();
	});
      },

      rootUser: function(test) {
	request.delete('/user/' + usersToCollect[3].id + '/complete', global.rootToken, function(res) {
	  test.equal(res.statusCode, 204);
	  test.done();
	});
      },

      self: function(test) {
	request.delete('/user/' + usersToCollect[4].id + '/complete', usersToCollect[4].token, function(res) {
	  test.equal(res.statusCode, 204);
	  test.done();
	});
      }
    },

    me: {
      unlogged: function(test) {
	request.delete('/user/me/complete', function(res) {
	  test.equal(res.statusCode, 401);
	  test.done();
	});
      },

      valid: function(test) {
	request.delete('/user/me/complete', usersToCollect[5].token, function(res) {
	  test.equal(res.statusCode, 204);
	  test.done();
	});
      }
    }
  }
//TODO: login and retrieving data should fail after deactivation
//TODO: root can not deleted its own account
//TODO: invalidate token on account deletion
//TODO: test deletion of related elements
}
