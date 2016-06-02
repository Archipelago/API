global.lists = {};

exports.audioCodecs = function(test) {
  request('/list/audioCodecs', function(res) {
    global.lists.audioCodecs = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.compressions = function(test) {
  request('/list/compressions', function(res) {
    global.lists.compressions = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.containers = function(test) {
  request('/list/containers', function(res) {
    global.lists.containers = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.languages = function(test) {
  request('/list/languages', function(res) {
    global.lists.languages = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.qualities = function(test) {
  request('/list/qualities', function(res) {
    global.lists.qualities = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.sources = function(test) {
  request('/list/sources', function(res) {
    global.lists.sources = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};

exports.videoCodecs = function(test) {
  request('/list/videoCodecs', function(res) {
    global.lists.videoCodecs = res.body;
    test.equal(res.body instanceof Array, true);
    test.equal(res.statusCode, 200);
    test.done();
  });
};
