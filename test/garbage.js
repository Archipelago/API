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

exports.contribs = {
  unlogged: function(test) {
    request.get('/garbage/' + usersToCollect[0].id, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.get('/garbage/' + usersToCollect[0].id, global.token, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  rootUser: function(test) {
    request.get('/garbage/' + usersToCollect[0].id, global.rootToken, function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body.movies instanceof Array, true);
      test.equal(res.body.video_releases instanceof Array, true);
      test.equal(res.body.links instanceof Array, true);
      test.done();
    });
  },

  nonDeactivated: function(test) {
    request.get('/garbage/1', global.rootToken, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  },

  nonExisting: function(test) {
    request.get('/garbage/' + usersToCollect[3].id, global.rootToken, function(res) {
      test.equal(res.statusCode, 404);
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
    request.post('/garbage/' + usersToCollect[0].id + '/save', global.token, {}, function(res) {
      test.equal(res.statusCode, 403);
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
  },

  garbageRootUser: function(test) {
    request.post('/garbage/1/save', global.rootToken, {}, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  userIsDeleted: function(test) {
    request.get('/user/' + usersToCollect[0].id, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  },

  elementsAreSaved: {
    movie: function(test) {
      request.get('/movie/' + usersToCollect[0].movieId, function(res) {
	test.equal(res.statusCode, 200);
	test.done();
      });
    },

    videoRelease: function(test) {
      request.get('/video_release/' + usersToCollect[0].videoReleaseId + '/links', function(res) {
	test.equal(res.statusCode, 200);
	test.equal(res.body instanceof Array, true);
	test.strictEqual(res.body[0].id, usersToCollect[0].linkId);
	test.done();
      });
    }
  }
};

exports.dismiss = {
  unlogged: function(test) {
    request.post('/garbage/' + usersToCollect[1].id + '/dismiss', {}, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.post('/garbage/' + usersToCollect[1].id + '/dismiss', global.token, {}, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  rootUser: function(test) {
    request.post('/garbage/' + usersToCollect[1].id + '/dismiss', global.rootToken, {}, function(res) {
      test.equal(res.statusCode, 204);
      test.done();
    });
  },

  nonExisting: function(test) {
    request.post('/garbage/' + usersToCollect[1].id + '/dismiss', global.rootToken, {}, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  },

  garbageRootUser: function(test) {
    request.post('/garbage/1/dismiss', global.rootToken, {}, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  elementsAreDeleted: {
    user: function(test) {
      request.get('/user/' + usersToCollect[1].id, function(res) {
	test.equal(res.statusCode, 404);
	test.done();
      });
    },

    movie: function(test) {
      request.get('/movie/' + usersToCollect[1].movieId, function(res) {
	test.done();
      });
    },

    videoRelease: function(test) {
      request.get('/video_release/' + usersToCollect[1].videoReleaseId + '/links', function(res) {
	test.equal(res.statusCode, 200);
	test.deepEqual(res.body, []);
	test.done();
      });
    }
  }
};
