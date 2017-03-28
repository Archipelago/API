global.lists = {};

exports.audio_codecs = function(test) {
  request.get('/list/audio_codecs', function(res) {
    global.lists.audio_codecs = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.compressions = function(test) {
  request.get('/list/compressions', function(res) {
    global.lists.compressions = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.containers = function(test) {
  request.get('/list/containers', function(res) {
    global.lists.containers = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.languages = function(test) {
  request.get('/list/languages', function(res) {
    global.lists.languages = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.qualities = function(test) {
  request.get('/list/qualities', function(res) {
    global.lists.qualities = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.sources = function(test) {
  request.get('/list/sources', function(res) {
    global.lists.sources = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.video_codecs = function(test) {
  request.get('/list/video_codecs', function(res) {
    global.lists.video_codecs = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.all = function(test) {
  request.get('/lists', function(res) {
    test.equal(res.statusCode, 200);
    let lists = ['audio_codecs', 'compressions', 'containers', 'languages', 'qualitites', 'sources', 'video_codecs'];
    for (let i in lists) {
      test.deepEqual(res.body[lists[i]], global.lists[lists[i]]);
    }
    test.done();
  });
}
