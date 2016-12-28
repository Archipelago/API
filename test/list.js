global.lists = {};

exports.audioCodecs = function(test) {
  request.get('/list/audioCodecs', function(res) {
    global.lists.audioCodecs = res.body;
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

exports.videoCodecs = function(test) {
  request.get('/list/videoCodecs', function(res) {
    global.lists.videoCodecs = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.all = function(test) {
  request.get('/lists', function(res) {
    test.equal(res.statusCode, 200);
    let lists = ['audioCodecs', 'compressions', 'containers', 'languages', 'qualitites', 'sources', 'videoCodecs'];
    for (let i in lists) {
      test.deepEqual(res.body[lists[i]], global.lists[lists[i]]);
    }
    test.done();
  });
}
