exports.list = {
  unlogged: function(test) {
    request.get('/garbage', function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.get('/garbage', global.token, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  rootUser: function(test) {
    request.get('/garbage', global.rootToken, function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.equal(res.body.length > 2, true);
      test.done();
    });
  }
};
