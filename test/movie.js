let crypto = require('crypto');
let hash = crypto.randomBytes(4).toString('hex');
let id, releaseId, linkId;

function randomElem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

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
      test.equal(typeof res.body.id, 'number');
      global.movieId = res.body.id;
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

exports.delete = {
  init: function(test) {
    request.post('/movie', global.rootToken, {
      "title": "foobor" + hash,
      "release_date": "1999-03-31",
      "image": "https://example.com/" + hash + ".png",
      "production_year": 1998
    }, function(res) {
      test.equal(res.statusCode, 201);
      test.equal(typeof res.body.id, 'number');
      id = res.body.id;
      request.post('/movie/' + id + '/release', global.rootToken, {
	"name": "foobar",
	"size": "2.1GB",
	"language": randomElem(global.lists.languages),
	"audio_codec": randomElem(global.lists.audio_codecs),
	"video_codec": randomElem(global.lists.video_codecs),
	"source": randomElem(global.lists.sources),
	"quality": randomElem(global.lists.qualities),
	"container": randomElem(global.lists.containers)
      }, function(res) {
	test.equal(res.statusCode, 201);
	test.equal(typeof res.body.id, 'number');
	releaseId = res.body.id;
	request.post('/video_release/' + releaseId + '/link', global.rootToken, [
	  "https://foo.bar/releases" + hash + ".mkv",
	], function(res) {
	  test.equal(res.statusCode, 201);
	  test.equal(res.body instanceof Array, true);
	  test.equal(res.body.length, 1);
	  linkId = res.body[0];
	  test.done();
	});
      });
    });
  },

  unlogged: function(test) {
    request.delete('/movie/' + id, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.delete('/movie/' + id, global.token, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  rootUser: function(test) {
    request.delete('/movie/' + id, global.rootToken, function(res) {
      test.equal(res.statusCode, 204);
      test.strictEqual(res.body, undefined);
      test.done();
    });
  },

  nonExisting: function(test) {
    request.delete('/movie/' + id, global.rootToken, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  },

  cascade: function(test) {
    request.delete('/link/' + linkId, global.rootToken, function(res) {
      test.equal(res.statusCode, 404);
      request.delete('/video_release/' + releaseId, global.rootToken, function(res) {
	test.equal(res.statusCode, 404);
      });
      test.done();
    });
  }
}

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

exports.alpha = {
  unlogged: function(test) {
    request.get('/movies/alpha/a', function(res) {
      test.equal(res.statusCode, 200);
      test.strictEqual(res.body.pagesNumber, 0);
      test.strictEqual(res.body.elementsNumber, 0);
      test.equal(res.body.elements instanceof Array, true);
      test.done();
    });
  },

  logged: function(test) {
    request.get('/movies/alpha/a', global.token, function(res) {
      test.equal(res.statusCode, 200);
      test.strictEqual(res.body.pagesNumber, 0);
      test.strictEqual(res.body.elementsNumber, 0);
      test.equal(res.body.elements instanceof Array, true);
      test.done();
    });
  },

  uppercase: function(test) {
    request.get('/movies/alpha/A', global.token, function(res) {
      test.equal(res.statusCode, 200);
      test.strictEqual(res.body.pagesNumber, 0);
      test.strictEqual(res.body.elementsNumber, 0);
      test.equal(res.body.elements instanceof Array, true);
      test.done();
    });
  },

  specialLetter: function(test) {
    request.get('/movies/alpha/*', global.token, function(res) {
      test.equal(res.statusCode, 200);
      test.strictEqual(res.body.pagesNumber, 0);
      test.strictEqual(res.body.elementsNumber, 0);
      test.equal(res.body.elements instanceof Array, true);
      test.done();
    });
  },

  metadata: function(test) {
    request.get('/movies/alpha/f', function(res) {
      test.equal(res.statusCode, 200);
      test.strictEqual(res.body.pagesNumber > 0, true);
      test.strictEqual(res.body.elementsNumber > 0, true);
      test.equal(res.body.elements instanceof Array, true);
      test.done();
    });
  },

  limits: {
    minNb: function(test) {
      request.get('/movies/alpha/a/1', function(res) {
	test.equal(res.statusCode, 200);
	test.strictEqual(res.body.pagesNumber, 0);
	test.strictEqual(res.body.elementsNumber, 0);
	test.equal(res.body.elements instanceof Array, true);
	test.done();
      });
    },

    maxNb: function(test) {
      request.get('/movies/alpha/a/100', function(res) {
	test.equal(res.statusCode, 200);
	test.strictEqual(res.body.pagesNumber, 0);
	test.strictEqual(res.body.elementsNumber, 0);
	test.equal(res.body.elements instanceof Array, true);
	test.done();
      });
    },

    minPage: function(test) {
      request.get('/movies/alpha/a/100/1', function(res) {
	test.equal(res.statusCode, 200);
	test.strictEqual(res.body.pagesNumber, 0);
	test.strictEqual(res.body.elementsNumber, 0);
	test.equal(res.body.elements instanceof Array, true);
	test.done();
      });
    }
  },

  invalid: {
    letter: function(test) {
      request.get('/movies/alpha/1', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    severalLetters: function(test) {
      request.get('/movies/alpha/aa', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    noParam: function(test) {
      request.get('/movies/alpha', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    nbTooSmall: function(test) {
      request.get('/movies/alpha/0', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    nbTooLarge: function(test) {
      request.get('/movies/alpha/101', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    pageTooSmall: function(test) {
      request.get('/movies/alpha/15/0', function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    }
  }
}

exports.update = {
  init: function(test) {
    request.post('/movie', global.rootToken, {
      "title": "foobar" + hash + "edit",
      "release_date": "1999-03-31",
      "image": "https://example.com/" + hash + ".png",
      "production_year": 1998
    }, function(res) {
      test.equal(res.statusCode, 201);
      id = res.body.id;
      test.done();
    });
  },

  unlogged: function(test) {
    request.patch('/movie/' + id, {
      "name": "foobar" + hash + "edited!",
      "release_date": "2002-03-12"
    }, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.patch('/movie/' + id, global.token, {
      "name": "foobar" + hash + "edited!",
      "release_date": "2002-03-12"
    }, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  rootUser: function(test) {
    request.patch('/movie/' + id, global.rootToken, {
      "name": "foobar" + hash + "edited!",
      "release_date": "2002-03-12"
    }, function(res) {
      test.equal(res.statusCode, 204);
      test.strictEqual(res.body, undefined);
      test.done();
    });
  },

  notFound: function(test) {
    request.patch('/movie/-1', global.rootToken, {
      "name": "foobar" + hash + "edited!",
      "release_date": "2002-03-12"
    }, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  }
}
