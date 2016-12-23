let crypto = require('crypto');
let hash = crypto.randomBytes(4).toString('hex');

exports.add = {
  unlogged: function(test) {
    request.post('/video_release/' + global.videoReleaseId + '/link', [
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

  unauthorized: function(test) {
    request.post('/video_release/' + global.videoReleaseId + '/link', global.token, [
      "https://example.com/releases" + hash + ".mkv",
      [
	"https://example.com/release.mkv" + hash + ".part1.rar",
	"https://example.com/release.mkv" + hash + ".part2.rar",
	"https://example.com/release.mkv" + hash + ".part3.rar"
      ]
    ], function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  rootUser: function(test) {
    request.post('/video_release/' + global.videoReleaseId + '/link', global.rootToken, [
      "https://example.com/releases" + hash + ".mkv",
      [
	"https://example.com/release.mkv" + hash + ".part1.rar",
	"https://example.com/release.mkv" + hash + ".part2.rar",
	"https://example.com/release.mkv" + hash + ".part3.rar"
      ]
    ], function(res) {
      test.equal(res.statusCode, 201);
      test.equal(res.body instanceof Array, true);
      test.equal(res.body.length, 4);
      test.equal(res.body[1], res.body[0] + 1);
      test.equal(res.body[2], res.body[0] + 2);
      test.equal(res.body[3], res.body[0] + 3);
      test.done();
    });
  },

  duplicate: function(test) {
    request.post('/video_release/' + global.videoReleaseId + '/link', global.rootToken, [
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
    request.get('/video_release/' + global.videoReleaseId + '/links', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  },

  logged: function(test) {
    request.get('/video_release/' + global.videoReleaseId + '/links', global.token, function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.done();
    });
  }
};
