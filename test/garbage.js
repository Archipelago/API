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

exports.save = {
  unlogged: function(test) {
    request.post('/garbage/' + usersToCollect[0].id + '/save', {}, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.post('/garbage/' + usersToCollect[0].id + '/save', {}, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  rootUser: function(test) {
    request.post('/garbage/' + usersToCollect[0].id + '/save', global.rootToken, {}, function(res) {
      test.equal(res.statusCode, 204);
      test.done();
    });
  },

  nonExisting: function(test) {
    request.post('/garbage/' + usersToCollect[0].id + '/save', global.rootToken, {}, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  }
};

exports.dismiss = {
  unlogged: function(test) {
    request.post('/garbage/' + usersToCollect[1].id + '/save', {}, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.post('/garbage/' + usersToCollect[1].id + '/save', {}, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  rootUser: function(test) {
    request.post('/garbage/' + usersToCollect[1].id + '/save', global.rootToken, {}, function(res) {
      test.equal(res.statusCode, 204);
      test.done();
    });
  },

  nonExisting: function(test) {
    request.post('/garbage/' + usersToCollect[1].id + '/save', global.rootToken, {}, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  }
};

//TODO: root user can not be collected/dismissed
//TODO: check if contributions are really collected/dismissed
