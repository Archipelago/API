let crypto = require('crypto');
let hash = crypto.randomBytes(4).toString('hex');

exports.add = {
  unlogged: function(test) {
    request('/movie', {
      "title": "foobar" + hash,
      "release_date": "1999-03-31",
      "production_year": 1998
    }, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  valid: function(test) {
    request('/movie', global.token, {
      "title": "foobar" + hash,
      "release_date": "1999-03-31",
      "production_year": 1998
    }, function(res) {
      test.equal(res.statusCode, 201);
      test.done();
    });
  },

  duplicate: function(test) {
    request('/movie', global.token, {
      "title": "foobar" + hash,
      "release_date": "1999-03-31",
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
    request('/movie/1', function(res) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },

  logged: function(test) {
    request('/movie/1', global.token, undefined, function(res) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },

  notExisting: function(test) {
    request('/movie/toto', global.token, undefined, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  }
};

exports.last = {
  unlogged: function(test) {
    request('/movies/last/5', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  logged: function(test) {
    request('/movies/last/5', global.token, undefined, function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  default: function(test) {
    request('/movies/last', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  limits: {
    min: function(test) {
      request('/movies/last/1', function(res) {
	test.equal(res.statusCode, 200);
	test.equal(res.body instanceof Array, true);
	test.done();
      });
    },

    max: function(test) {
      request('/movies/last/100', function(res) {
	test.equal(res.statusCode, 200);
	test.equal(res.body instanceof Array, true);
	test.done();
      });
    }
  },

  invalid: {
    nbTooSmall: function(test) {
      request('/movies/last/0', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    nbTooLarge: function(test) {
      request('/movies/last/101', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    }
  }
}
