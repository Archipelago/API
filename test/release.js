function randomElem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

exports.add = {
  unlogged: function(test) {
    request.post('/movie/1/release', {
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
    request.post('/movie/1/release', global.token, {
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
      request.post('/movie/1/release', global.rootToken, {
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
      request.post('/movie/1/release', global.rootToken, {
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
      request.post('/movie/1/release', global.rootToken, {
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
      request.post('/movie/1/release', global.rootToken, {
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
      request.post('/movie/1/release', global.rootToken, {
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
      request.post('/movie/1/release', global.rootToken, {
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
      request.post('/movie/1/release', global.rootToken, {
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
      request.post('/movie/1/release', global.rootToken, {
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
    request.post('/movie/1/release', global.rootToken, {
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
      test.done();
    });
  }
};

exports.get = {
  unlogged: function(test) {
    request.get('/movie/1/releases', function(res) {
      test.equal(res.body instanceof Array, true);
      test.equal(res.statusCode, 200);
      test.done();
    });
  },

  logged: function(test) {
    request.get('/movie/1/releases', global.token, function(res) {
      global.videoReleaseId = res.body[0].id;
      test.equal(res.body instanceof Array, true);
      test.equal(res.statusCode, 200);
      test.done();
    });
  }
};
