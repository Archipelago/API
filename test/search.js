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
