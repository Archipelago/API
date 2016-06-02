function randomElem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

exports.add = {
  unlogged: function(test) {
    request('/movie/1/release/add', {
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

  valid: function(test) {
    request('/movie/1/release/add', global.token, {
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
