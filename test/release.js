function randomElem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

exports.add = {
  unlogged: function(test) {
    request('/movie/1/release', {
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
    request('/movie/1/release', global.token, {
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

  rootUser: function(test) {
    request('/movie/1/release', global.rootToken, {
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
      test.done();
    });
  }
};

exports.get = {
  unlogged: function(test) {
    request('/movie/1/releases', function(res) {
      test.equal(res.body instanceof Array, true);
      test.equal(res.statusCode, 200);
      test.done();
    });
  },

  logged: function(test) {
    request('/movie/1/releases', global.token, undefined, function(res) {
      global.videoReleaseId = res.body[0].id;
      test.equal(res.body instanceof Array, true);
      test.equal(res.statusCode, 200);
      test.done();
    });
  }
};
