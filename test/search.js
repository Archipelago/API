let _ = require('lodash');

exports.parameters = {
  invalid: {
    noArgument: function(test) {
      request('/search', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    invalidType: function(test) {
      request('/search?query=foobar&type=toto', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    }
  },

  valid: {
    longQuery: function(test) {
      request('/search?query=foobar', function(res) {
	test.equal(res.statusCode, 200);
	test.done();
      });
    },

    shortQuery: function(test) {
      request('/search?q=foobar', function(res) {
	test.equal(res.statusCode, 200);
	test.done();
      });
    },

    longType: function(test) {
      request('/search?q=foobar&type=movie', function(res) {
	test.equal(res.statusCode, 200);
	test.equal(_.size(res.body), 1);
	test.done();
      });
    },

    shortQuery: function(test) {
      request('/search?q=foobar&t=movie', function(res) {
	test.equal(res.statusCode, 200);
	test.equal(_.size(res.body), 1);
	test.done();
      });
    }
  }
};

exports.searchedValues = {
  movie: function(test) {
    request('/search?query=foo%20bar&t=movie', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(_.size(res.body), 1);
      test.equal(res.body.movie instanceof Array, true);
      test.done();
    });
  },

  user: function(test) {
    request('/search?query=foo%20bar&t=user', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(_.size(res.body), 1);
      test.equal(res.body.user instanceof Array, true);
      test.done();
    });
  },

  release: function(test) {
    request('/search?query=foo%20bar&t=release', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(_.size(res.body), 1);
      test.equal(res.body.release instanceof Array, true);
      test.done();
    });
  },

  link: function(test) {
    request('/search?query=foo%20bar&t=link', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(_.size(res.body), 1);
      test.equal(res.body.link instanceof Array, true);
      test.done();
    });
  },

  several: function(test) {
    request('/search?query=foo%20bar&t=movie,user', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(_.size(res.body), 2);
      test.equal(res.body.movie instanceof Array, true);
      test.equal(res.body.user instanceof Array, true);
      test.done();
    });
  },

  wildcard: function(test) {
    request('/search?query=foo%20bar&t=*', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(_.size(res.body), 4);
      test.equal(res.body.movie instanceof Array, true);
      test.equal(res.body.user instanceof Array, true);
      test.equal(res.body.release instanceof Array, true);
      test.equal(res.body.link instanceof Array, true);
      test.done();
    });
  },

  default: function(test) {
    request('/search?query=foo%20bar', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(_.size(res.body), 4);
      test.equal(res.body.movie instanceof Array, true);
      test.equal(res.body.user instanceof Array, true);
      test.equal(res.body.release instanceof Array, true);
      test.equal(res.body.link instanceof Array, true);
      test.done();
    });
  }
}
