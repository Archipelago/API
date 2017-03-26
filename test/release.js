let crypto = require('crypto');
let hash = crypto.randomBytes(4).toString('hex');
let releaseId, linkId;

function randomElem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

exports.add = {
  unlogged: function(test) {
    request.post('/movie/' + global.movieId + '/release', {
      "name": "foobar",
      "size": "2.1GB",
      "language": randomElem(global.lists.languages),
      "audio_codec": randomElem(global.lists.audioCodecs),
      "video_codec": randomElem(global.lists.videoCodecs),
      "source": randomElem(global.lists.sources),
      "quality": randomElem(global.lists.qualities),
      "container": randomElem(global.lists.containers)
    }, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.post('/movie/' + global.movieId + '/release', global.token, {
      "name": "foobar",
      "size": "2.1GB",
      "language": randomElem(global.lists.languages),
      "audio_codec": randomElem(global.lists.audioCodecs),
      "video_codec": randomElem(global.lists.videoCodecs),
      "source": randomElem(global.lists.sources),
      "quality": randomElem(global.lists.qualities),
      "container": randomElem(global.lists.containers)
    }, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  missingField: {
    name: function(test) {
      request.post('/movie/' + global.movieId + '/release', global.rootToken, {
	"size": "2.1GB",
	"language": randomElem(global.lists.languages),
	"audio_codec": randomElem(global.lists.audioCodecs),
	"video_codec": randomElem(global.lists.videoCodecs),
	"source": randomElem(global.lists.sources),
	"quality": randomElem(global.lists.qualities),
	"container": randomElem(global.lists.containers)
      }, function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    size: function(test) {
      request.post('/movie/' + global.movieId + '/release', global.rootToken, {
	"name": "foobar",
	"language": randomElem(global.lists.languages),
	"audio_codec": randomElem(global.lists.audioCodecs),
	"video_codec": randomElem(global.lists.videoCodecs),
	"source": randomElem(global.lists.sources),
	"quality": randomElem(global.lists.qualities),
	"container": randomElem(global.lists.containers)
      }, function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    language: function(test) {
      request.post('/movie/' + global.movieId + '/release', global.rootToken, {
	"name": "foobar",
	"size": "2.1GB",
	"audio_codec": randomElem(global.lists.audioCodecs),
	"video_codec": randomElem(global.lists.videoCodecs),
	"source": randomElem(global.lists.sources),
	"quality": randomElem(global.lists.qualities),
	"container": randomElem(global.lists.containers)
      }, function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    audioCodec: function(test) {
      request.post('/movie/' + global.movieId + '/release', global.rootToken, {
	"name": "foobar",
	"size": "2.1GB",
	"language": randomElem(global.lists.languages),
	"video_codec": randomElem(global.lists.videoCodecs),
	"source": randomElem(global.lists.sources),
	"quality": randomElem(global.lists.qualities),
	"container": randomElem(global.lists.containers)
      }, function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    videoCodec: function(test) {
      request.post('/movie/' + global.movieId + '/release', global.rootToken, {
	"name": "foobar",
	"size": "2.1GB",
	"language": randomElem(global.lists.languages),
	"audio_codec": randomElem(global.lists.audioCodecs),
	"source": randomElem(global.lists.sources),
	"quality": randomElem(global.lists.qualities),
	"container": randomElem(global.lists.containers)
      }, function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    source: function(test) {
      request.post('/movie/' + global.movieId + '/release', global.rootToken, {
	"name": "foobar",
	"size": "2.1GB",
	"language": randomElem(global.lists.languages),
	"audio_codec": randomElem(global.lists.audioCodecs),
	"video_codec": randomElem(global.lists.videoCodecs),
	"quality": randomElem(global.lists.qualities),
	"container": randomElem(global.lists.containers)
      }, function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    quality: function(test) {
      request.post('/movie/' + global.movieId + '/release', global.rootToken, {
	"name": "foobar",
	"size": "2.1GB",
	"language": randomElem(global.lists.languages),
	"audio_codec": randomElem(global.lists.audioCodecs),
	"video_codec": randomElem(global.lists.videoCodecs),
	"source": randomElem(global.lists.sources),
	"container": randomElem(global.lists.containers)
      }, function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    },

    container: function(test) {
      request.post('/movie/' + global.movieId + '/release', global.rootToken, {
	"name": "foobar",
	"size": "2.1GB",
	"language": randomElem(global.lists.languages),
	"audio_codec": randomElem(global.lists.audioCodecs),
	"video_codec": randomElem(global.lists.videoCodecs),
	"source": randomElem(global.lists.sources),
	"quality": randomElem(global.lists.qualities),
      }, function(res) {
	test.equal(res.statusCode, 400);
	test.done();
      });
    }
  },

  rootUser: function(test) {
    request.post('/movie/' + global.movieId + '/release', global.rootToken, {
      "name": "foobar",
      "size": "2.1GB",
      "language": randomElem(global.lists.languages),
      "audio_codec": randomElem(global.lists.audioCodecs),
      "video_codec": randomElem(global.lists.videoCodecs),
      "source": randomElem(global.lists.sources),
      "quality": randomElem(global.lists.qualities),
      "container": randomElem(global.lists.containers)
    }, function(res) {
      test.equal(res.statusCode, 201);
      test.equal(typeof res.body.id, 'number');
      global.videoReleaseId = res.body.id;
      test.done();
    });
  }
};

exports.get = {
  unlogged: function(test) {
    request.get('/movie/' + global.movieId + '/releases', function(res) {
      test.equal(res.body instanceof Array, true);
      test.equal(res.statusCode, 200);
      test.done();
    });
  },

  logged: function(test) {
    request.get('/movie/' + global.movieId + '/releases', global.token, function(res) {
      test.equal(res.body instanceof Array, true);
      test.equal(res.statusCode, 200);
      test.done();
    });
  }
};

exports.delete = {
  init: function(test) {
    request.post('/movie/' + global.movieId + '/release', global.rootToken, {
      "name": "foobar",
      "size": "2.1GB",
      "language": randomElem(global.lists.languages),
      "audio_codec": randomElem(global.lists.audioCodecs),
      "video_codec": randomElem(global.lists.videoCodecs),
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
  },

  unlogged: function(test) {
    request.delete('/video_release/' + releaseId, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.delete('/video_release/' + releaseId, global.token, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  rootUser: function(test) {
    request.delete('/video_release/' + releaseId, global.rootToken, function(res) {
      test.equal(res.statusCode, 204);
      test.strictEqual(res.body, undefined);
      test.done();
    });
  },

  nonExisting: function(test) {
    request.delete('/video_release/' + releaseId, global.rootToken, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  },

  cascade: function(test) {
    request.delete('/link/' + linkId, global.rootToken, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  }
}


exports.update = {
  init: function(test) {
    request.post('/movie/' + global.movieId + '/release', global.rootToken, {
      "name": "foobar",
      "size": "2.1GB",
      "language": randomElem(global.lists.languages),
      "audio_codec": randomElem(global.lists.audioCodecs),
      "video_codec": randomElem(global.lists.videoCodecs),
      "source": randomElem(global.lists.sources),
      "quality": randomElem(global.lists.qualities),
      "container": randomElem(global.lists.containers)
    }, function(res) {
      test.equal(res.statusCode, 201);
      test.equal(typeof res.body.id, 'number');
      releaseId = res.body.id;
      test.done();
    });
  },

  unlogged: function(test) {
    request.patch('/video_release/' + releaseId, {
      "name": "foobar.REPACK",
      "size": "1.4GiB"
    }, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.patch('/video_release/' + releaseId, global.token, {
      "name": "foobar.REPACK",
      "size": "1.4GiB"
    }, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  rootUser: function(test) {
    request.patch('/video_release/' + releaseId, global.rootToken, {
      "name": "foobar.REPACK",
      "size": "1.4GiB"
    }, function(res) {
      test.equal(res.statusCode, 204);
      test.strictEqual(res.body, undefined);
      test.done();
    });
  },

  notFound: function(test) {
    request.patch('/video_release/-1', global.rootToken, {
      "name": "foobar.REPACK",
      "size": "1.4GiB"
    }, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  },
}
