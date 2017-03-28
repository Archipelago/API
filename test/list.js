let async = require('async');
let lists = ['audio_codecs', 'compressions', 'containers', 'languages', 'qualities', 'sources', 'video_codecs'];
global.lists = {};

exports.single = function(test) {
  async.eachSeries(lists, function(l, cb) {
    request.get('/list/' + l, function(res) {
      test.equal(res.body instanceof Array, true);
      test.equal(res.statusCode, 200);
      global.lists[l] = res.body;
      cb();
    });
  }, function() {
    test.done();
  });
}

exports.all = function(test) {
  request.get('/lists', function(res) {
    test.equal(res.statusCode, 200);
    for (let i in lists) {
      test.deepEqual(res.body[lists[i]], global.lists[lists[i]]);
    }
    test.done();
  });
}
