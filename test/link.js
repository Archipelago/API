let crypto = require('crypto');
let hash = crypto.randomBytes(4).toString('hex');

exports.add = {
  unlogged: function(test) {
    request('/video_release/' + global.videoReleaseId + '/link/add', [
      "https://example.com/releases" + hash + ".mkv",
      [
	"https://example.com/release.mkv" + hash + ".part1.rar",
	"https://example.com/release.mkv" + hash + ".part2.rar",
	"https://example.com/release.mkv" + hash + ".part3.rar"
      ]
    ], function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  valid: function(test) {
    request('/video_release/' + global.videoReleaseId + '/link/add', global.token, [
      "https://example.com/releases" + hash + ".mkv",
      [
	"https://example.com/release.mkv" + hash + ".part1.rar",
	"https://example.com/release.mkv" + hash + ".part2.rar",
	"https://example.com/release.mkv" + hash + ".part3.rar"
      ]
    ], function(res) {
      test.equal(res.statusCode, 201);
      test.done();
    });
  },

  duplicate: function(test) {
    request('/video_release/' + global.videoReleaseId + '/link/add', global.token, [
      "https://example.com/releases" + hash + ".mkv",
      [
	"https://example.com/release.mkv" + hash + ".part1.rar",
	"https://example.com/release.mkv" + hash + ".part2.rar",
	"https://example.com/release.mkv" + hash + ".part3.rar"
      ]
    ], function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  }
};

exports.get = {
  unlogged: function(test) {
    request('/video_release/' + global.videoReleaseId + '/links', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  logged: function(test) {
    request('/video_release/' + global.videoReleaseId + '/links', global.token, undefined, function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  }
};
