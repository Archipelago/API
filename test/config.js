exports.get = {
  unlogged: function(test) {
    request.get('/config', function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.get('/config', global.token, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  rootUser: function(test) {
    request.get('/config', global.rootToken, function(res) {
      test.equal(res.statusCode, 200);
      test.strictEqual(res.body.defaultPermissions, 73);
      test.strictEqual(res.body.garbageUserId, 1);
      test.done();
    });
  }
};

exports.addOrUpdate = {
  unlogged: function(test) {
    request.put('/config', {"randomValue": 42}, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.put('/config', global.token, {"randomValue": 42}, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  rootUser: {
    addSeveral: function(test) {
      request.put('/config', global.rootToken, {
	"randomArray": [1, 2, 3],
	"randomBoolean": true,
	"randomInt": 42,
	"randomObject": {a: 1, b: 2},
	"randomString": "foobar",
	"randomUseless": null
      }, function(res) {
	test.equal(res.statusCode, 204);
	request.get('/config', global.rootToken, function(res) {
	  test.equal(res.statusCode, 200);
	  test.deepEqual(res.body.randomArray, [1, 2, 3]);
	  test.strictEqual(res.body.randomBoolean, true);
	  test.strictEqual(res.body.randomInt, 42);
	  test.deepEqual(res.body.randomObject, {a: 1, b: 2});
	  test.strictEqual(res.body.randomString, "foobar");
	  test.strictEqual(res.body.randomUseless, null);
	  test.done();
	});
      });
    },

    invalidVarName: function(test) {
      request.put('/config', global.rootToken, {
	"This variable name is way too long. It's longer than 64 chars (108 to be exact) and the api should reject it": 42
      }, function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    updateSeveral: function(test) {
      request.put('/config', global.rootToken, {
    	"randomArray": [2, 3, 4],
    	"randomBoolean": false,
    	"randomInt": 1337,
    	"randomObject": {a: 2, b: 3},
    	"randomString": "barfoo",
    	"randomUseless": 42
      }, function(res) {
    	test.equal(res.statusCode, 204);
    	request.get('/config', global.rootToken, function(res) {
    	  test.equal(res.statusCode, 200);
    	  test.deepEqual(res.body.randomArray, [2, 3, 4]);
    	  test.strictEqual(res.body.randomBoolean, false);
    	  test.strictEqual(res.body.randomInt, 1337);
    	  test.deepEqual(res.body.randomObject, {a: 2, b: 3});
    	  test.strictEqual(res.body.randomString, "barfoo");
    	  test.strictEqual(res.body.randomUseless, 42);
    	  test.done();
    	});
      });
    },
  }
}

exports.delete = {
  unlogged: function(test) {
    request.delete('/config/randomUseless', function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.delete('/config/randomUseless', global.token, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  rootUser: function(test) {
    request.delete('/config/randomUseless', global.rootToken, function(res) {
      test.equal(res.statusCode, 204);
      test.done();
    });
  },

  nonExisting: function(test) {
    request.delete('/config/randomUseless', global.rootToken, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  },

  clean: function(test) {
    request.delete('/config/randomArray', global.rootToken, function(res) {
      test.equal(res.statusCode, 204);
      request.delete('/config/randomBoolean', global.rootToken, function(res) {
	test.equal(res.statusCode, 204);
	request.delete('/config/randomInt', global.rootToken, function(res) {
	  test.equal(res.statusCode, 204);
	  request.delete('/config/randomObject', global.rootToken, function(res) {
	    test.equal(res.statusCode, 204);
	    request.delete('/config/randomString', global.rootToken, function(res) {
	      test.equal(res.statusCode, 204);
    	      request.get('/config', global.rootToken, function(res) {
    		test.equal(res.statusCode, 200);
    		test.strictEqual(res.body.randomArray, undefined);
    		test.strictEqual(res.body.randomBoolean, undefined);
    		test.strictEqual(res.body.randomInt, undefined);
    		test.strictEqual(res.body.randomObject, undefined);
    		test.strictEqual(res.body.randomString, undefined);
    		test.done();
    	      });
	    });
	  });
	});
      });
    });
  }
}
