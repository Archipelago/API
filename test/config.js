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
