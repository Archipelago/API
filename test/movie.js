let crypto = require('crypto');
let hash = crypto.randomBytes(4).toString('hex');

exports.add = {
  unlogged: function(test) {
    request.post('/movie', {
      "title": "foobar" + hash,
      "release_date": "1999-03-31",
      "image": "https://example.com/" + hash + ".png",
      "production_year": 1998
    }, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.post('/movie', global.token, {
      "title": "foobar" + hash,
      "release_date": "1999-03-31",
      "image": "https://example.com/" + hash + ".png",
      "production_year": 1998
    }, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  missingFields: {
    title: function(test) {
      request.post('/movie', global.rootToken, {
	"release_date": "1999-03-31",
	"image": "https://example.com/" + hash + ".png"
      }, function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    releaseDate: function(test) {
      request.post('/movie', global.token, {
	"title": "foobar" + hash,
	"image": "https://example.com/" + hash + ".png"
      }, function(res) {
	test.equal(res.statusCode, 403);
	test.done();
      });
    },

    image: function(test) {
      request.post('/movie', global.rootToken, {
	"title": "foobar" + hash,
	"release_date": "1999-03-31"
      }, function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    }
  },

  rootUser: function(test) {
    request.post('/movie', global.rootToken, {
      "title": "foobar" + hash,
      "release_date": "1999-03-31",
      "image": "https://example.com/" + hash + ".png",
      "production_year": 1998
    }, function(res) {
      test.equal(res.statusCode, 201);
      test.done();
    });
  },

  duplicate: function(test) {
    request.post('/movie', global.rootToken, {
      "title": "foobar" + hash,
      "release_date": "1999-03-31",
      "image": "https://example.com/" + hash + ".png",
      "production_year": 1998
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  }
};

//This assume that the movie with id 1 exists. We must retrieve the last movie inserted
exports.get = {
  unlogged: function(test) {
    request.get('/movie/1', function(res) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },

  logged: function(test) {
    request.get('/movie/1', global.token, function(res) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },

  notExisting: function(test) {
    request.get('/movie/toto', global.token, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  }
};

exports.last = {
  unlogged: function(test) {
    request.get('/movies/last/5', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  logged: function(test) {
    request.get('/movies/last/5', global.token, function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  default: function(test) {
    request.get('/movies/last', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  limits: {
    min: function(test) {
      request.get('/movies/last/1', function(res) {
	test.equal(res.statusCode, 200);
	test.equal(res.body instanceof Array, true);
	test.done();
      });
    },

    max: function(test) {
      request.get('/movies/last/100', function(res) {
	test.equal(res.statusCode, 200);
	test.equal(res.body instanceof Array, true);
	test.done();
      });
    }
  },

  invalid: {
    nbTooSmall: function(test) {
      request.get('/movies/last/0', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    nbTooLarge: function(test) {
      request.get('/movies/last/101', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    }
  }
}

exports.lastReleases = {
  unlogged: function(test) {
    request.get('/movies/lastReleases/5', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  logged: function(test) {
    request.get('/movies/lastReleases/5', global.token, function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  default: function(test) {
    request.get('/movies/lastReleases', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  limits: {
    min: function(test) {
      request.get('/movies/lastReleases/1', function(res) {
	test.equal(res.statusCode, 200);
	test.equal(res.body instanceof Array, true);
	test.done();
      });
    },

    max: function(test) {
      request.get('/movies/lastReleases/100', function(res) {
	test.equal(res.statusCode, 200);
	test.equal(res.body instanceof Array, true);
	test.done();
      });
    }
  },

  invalid: {
    nbTooSmall: function(test) {
      request.get('/movies/lastReleases/0', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    nbTooLarge: function(test) {
      request.get('/movies/lastReleases/101', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    }
  }
}

exports.lastLinks = {
  unlogged: function(test) {
    request.get('/movies/lastLinks/5', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  logged: function(test) {
    request.get('/movies/lastLinks/5', global.token, function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  default: function(test) {
    request.get('/movies/lastLinks', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  limits: {
    min: function(test) {
      request.get('/movies/lastLinks/1', function(res) {
	test.equal(res.statusCode, 200);
	test.equal(res.body instanceof Array, true);
	test.done();
      });
    },

    max: function(test) {
      request.get('/movies/lastLinks/100', function(res) {
	test.equal(res.statusCode, 200);
	test.equal(res.body instanceof Array, true);
	test.done();
      });
    }
  },

  invalid: {
    nbTooSmall: function(test) {
      request.get('/movies/lastLinks/0', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    nbTooLarge: function(test) {
      request.get('/movies/lastLinks/101', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    }
  }
}
