let crypto = require('crypto');
let hash = crypto.randomBytes(4).toString('hex');
let id;

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
      test.equal(res.body.length, 2);
      test.equal(typeof res.body[0].id, 'number');
      test.equal(typeof res.body[0].url, 'string');
      test.equal(res.body[1] instanceof Array, true);
      test.equal(res.body[1].length, 3);
      test.done();
    });
  },

  logged: function(test) {
    request.get('/video_release/' + global.videoReleaseId + '/links', global.token, function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body instanceof Array, true);
      test.equal(res.body.length, 2);
      test.equal(typeof res.body[0].id, 'number');
      test.equal(typeof res.body[0].url, 'string');
      test.equal(res.body[1] instanceof Array, true);
      test.equal(res.body[1].length, 3);
      test.done();
    });
  }
};

exports.delete = {
  init: function(test) {
    request.post('/video_release/' + global.videoReleaseId + '/link', global.rootToken, [
      "https://foo.bar/releases" + hash + ".mkv",
    ], function(res) {
      test.equal(res.statusCode, 201);
      test.equal(res.body instanceof Array, true);
      test.equal(res.body.length, 1);
      id = res.body[0];
      test.done();
    });
  },

  unlogged: function(test) {
    request.delete('/link/' + id, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.delete('/link/' + id, global.token, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  rootUser: function(test) {
    request.delete('/link/' + id, global.rootToken, function(res) {
      test.equal(res.statusCode, 204);
      test.strictEqual(res.body, undefined);
      test.done();
    });
  },

  nonExisting: function(test) {
    request.delete('/link/' + id, global.rootToken, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  }
}
