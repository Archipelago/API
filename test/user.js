let crypto = require('crypto');
let hash = crypto.randomBytes(4).toString('hex');
let async = require('async');
global.usersToCollect = [];

function randomElem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

exports.register = {
  valid: function(test) {
    request.post('/register', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(res.statusCode, 201);
      test.equal(typeof res.body.id, 'number');
      test.done();
    });
  },

  alreadyUsed: function(test) {
    request.post('/register', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  }
};

exports.login = {
  erroneousPassword: function(test) {
    request.post('/login', {
      "login": "tmp" + hash,
      "password": "foobar41"
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  },

  noPassword: function(test) {
    request.post('/login', {
      "login": "tmp" + hash
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  },

  invalidLogin: function(test) {
    request.post('/login', {
      "login": crypto.randomBytes(16).toString('hex')
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  },

  valid: {
    stdUser: function(test) {
      request.post('/login', {
	"login": "tmp" + hash,
	"password": "foobar42"
      }, function(res) {
	global.token = res.body.token;
	test.equal(res.statusCode, 200);
	test.done();
      });
    },

    root: function(test) {
      request.post('/login', {
	"login": "root",
	"password": "foobar42"
      }, function(res) {
	global.rootToken = res.body.token;
	test.equal(res.statusCode, 200);
	test.done();
      });
    }
  }
};

exports.token = {
  sameToken: function(test) {
    request.post('/login', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(global.token, res.body.token);
      test.done();
    });
  },

  differentToken: function(test) {
    let hash = crypto.randomBytes(4).toString('hex');
    request.post('/register', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(res.statusCode, 201);
      request.post('/login', {
	"login": "tmp" + hash,
	"password": "foobar42"
      }, function(res) {
	test.notEqual(global.token, res.body.token);
	test.done();
      });
    });
  }
};

exports.get = {
  valid: function(test) {
    request.get('/user/1', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body.id, 1);
      test.deepEqual(res.body.permissions, ["ADD_ELEMENT", "EDIT_ELEMENT", "DELETE_ELEMENT", "ADD_RELEASE", "EDIT_RELEASE", "DELETE_RELEASE", "ADD_LINK", "EDIT_LINK", "DELETE_LINK", "EDIT_USER", "DELETE_USER", "BAN_USER", "EDIT_PERMISSION", "GET_CONFIG", "EDIT_CONFIG", "GARBAGE"]);
      test.done();
    });
  },

  invalid: function(test) {
    request.get('/user/-1', function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  },

  default: {
    unlogged: function(test) {
      request.get('/user', function(res) {
	test.equal(res.statusCode, 401);
	test.done();
      });
    },

    logged: function(test) {
      request.get('/user', global.token, function(res) {
	test.equal(res.statusCode, 200);
	test.equal(res.body.permissions.length, 0);
	test.done();
      });
    },

    rootUser: function(test) {
      request.get('/user', global.rootToken, function(res) {
	test.equal(res.body.login, 'root');
	test.equal(res.statusCode, 200);
	test.equal(res.body.permissions.length > 0, true);
	test.done();
      });
    }
  }
};

exports.delete = {
  init: function(test) {
    async.times(6, function(i, cb) {
      // Create users
      request.post('/register', {
	"login": "tmp" + i + hash,
	"password": "foobar42"
      }, function(res) {
	test.equal(res.statusCode, 201);
	let newUser = {id: res.body.id,
		       login: "tmp" + i + hash};
	// Login users
	request.post('/login', {
	  "login": "tmp" + i + hash,
	  "password": "foobar42"
	}, function(res) {
	  test.equal(res.statusCode, 200);
	  newUser.token = res.body.token;
	  // Grant them permissions
	  request.patch('/user/' + newUser.id + '/permission', global.rootToken, {
	    "add": [
	      "ADD_ELEMENT", "ADD_RELEASE", "ADD_LINK"
	    ]
	  }, function(res) {
	    test.equal(res.statusCode, 200);
	    // Add movies
	    request.post('/movie', newUser.token, {
	      "title": "tmp" + i + hash,
	      "release_date": "1999-03-31",
	      "image": "https://example.com/" + i + hash + ".png",
	      "production_year": 1998
	    }, function(res) {
	      test.equal(res.statusCode, 201);
	      newUser.movieId = res.body.id;
	      // Add releases
	      request.post('/movie/' + newUser.movieId + '/release', newUser.token, {
	      	"name": "foobar" + i + hash,
	      	"size": "2.1GB",
	      	"language": randomElem(global.lists.languages),
	      	"audio_codec": randomElem(global.lists.audioCodecs),
	      	"video_codec": randomElem(global.lists.videoCodecs),
	      	"source": randomElem(global.lists.sources),
	      	"quality": randomElem(global.lists.qualities),
	      	"container": randomElem(global.lists.containers)
	      }, function(res) {
	      	test.equal(res.statusCode, 201);
	      	newUser.videoReleaseId = res.body.id;
		// Add links
		request.post('/video_release/' + newUser.videoReleaseId + '/link', newUser.token, [
		  "https://example.com/release" + i + hash + ".mkv"
		], function(res) {
		  test.equal(res.statusCode, 201);
		  newUser.linkId = res.body[0];
	      	  global.usersToCollect.push(newUser);
		  cb();
		});
	      });
	    });
	  });
	});
      });
    }, function() {
      test.done();
    });
  },

  deactivate: {
    id: {
      unlogged: function(test) {
	request.delete('/user/' + usersToCollect[0].id, function(res) {
	  test.equal(res.statusCode, 401);
	  test.done();
	});
      },

      unauthorized: function(test) {
	request.delete('/user/' + usersToCollect[0].id, global.token, function(res) {
	  test.equal(res.statusCode, 403);
	  test.done();
	});
      },

      rootUser: function(test) {
	request.delete('/user/' + usersToCollect[0].id, global.rootToken, function(res) {
	  test.equal(res.statusCode, 204);
	  test.done();
	});
      },

      self: function(test) {
	request.delete('/user/' + usersToCollect[1].id, usersToCollect[1].token, function(res) {
	  test.equal(res.statusCode, 204);
	  test.done();
	});
      },

      rootAccount: function(test) {
	request.delete('/user/1', global.rootToken, function(res) {
	  test.equal(res.statusCode, 403);
	  test.done();
	});
      },

      unavailableUser: function(test) {
	request.get('/user/' + usersToCollect[0].id, function(res) {
	  test.equal(res.statusCode, 404);
	  request.get('/user/' + usersToCollect[1].id, function(res) {
	    test.equal(res.statusCode, 404);
	    test.done();
	  });
	});
      },

      elementsNotDeleted: {
	movie: function(test) {
	  request.get('/movie/' + usersToCollect[0].movieId, function(res) {
	    test.equal(res.statusCode, 200);
	    request.get('/movie/' + usersToCollect[1].movieId, function(res) {
	      test.equal(res.statusCode, 200);
	      test.done();
	    });
	  });
	},

	videoRelease: function(test) {
	  request.get('/video_release/' + usersToCollect[0].videoReleaseId + '/links', function(res) {
	    test.equal(res.statusCode, 200);
	    test.equal(res.body instanceof Array, true);
	    test.strictEqual(res.body[0].id, usersToCollect[0].linkId);
	    request.get('/video_release/' + usersToCollect[1].videoReleaseId + '/links', function(res) {
	      test.equal(res.statusCode, 200);
	      test.equal(res.body instanceof Array, true);
	      test.strictEqual(res.body[0].id, usersToCollect[1].linkId);
	      test.done();
	    });
	  });
	}
      }
    },

    me: {
      unlogged: function(test) {
	request.delete('/user/me', function(res) {
	  test.equal(res.statusCode, 401);
	  test.done();
	});
      },

      valid: function(test) {
	request.delete('/user/me', usersToCollect[2].token, function(res) {
	  test.equal(res.statusCode, 204);
	  test.done();
	});
      },

      rootUser: function(test) {
	request.delete('/user/me', global.rootToken, function(res) {
	  test.equal(res.statusCode, 403);
	  test.done();
	});
      },

      unavailableUser: function(test) {
	request.get('/user/' + usersToCollect[2].id, function(res) {
	  test.equal(res.statusCode, 404);
	  test.done();
	});
      },

      elementsNotDeleted: {
	movie: function(test) {
	  request.get('/movie/' + usersToCollect[2].movieId, function(res) {
	    test.equal(res.statusCode, 200);
	    test.done();
	  });
	},

	videoRelease: function(test) {
	  request.get('/video_release/' + usersToCollect[2].videoReleaseId + '/links', function(res) {
	    test.equal(res.statusCode, 200);
	    test.equal(res.body instanceof Array, true);
	    test.strictEqual(res.body[0].id, usersToCollect[2].linkId);
	    test.done();
	  });
	}
      }
    }
  },

  complete: {
    id: {
      unlogged: function(test) {
	request.delete('/user/' + usersToCollect[3].id + '/complete', function(res) {
	  test.equal(res.statusCode, 401);
	  test.done();
	});
      },

      unauthorized: function(test) {
	request.delete('/user/' + usersToCollect[3].id + '/complete', global.token, function(res) {
	  test.equal(res.statusCode, 403);
	  test.done();
	});
      },

      rootUser: function(test) {
	request.delete('/user/' + usersToCollect[3].id + '/complete', global.rootToken, function(res) {
	  test.equal(res.statusCode, 204);
	  test.done();
	});
      },

      self: function(test) {
	request.delete('/user/' + usersToCollect[4].id + '/complete', usersToCollect[4].token, function(res) {
	  test.equal(res.statusCode, 204);
	  test.done();
	});
      },

      rootAccount: function(test) {
	request.delete('/user/1/complete', global.rootToken, function(res) {
	  test.equal(res.statusCode, 403);
	  test.done();
	});
      },

      disconnected: function(test) {
	request.get('/user', usersToCollect[4].token, function(res) {
	  test.equal(res.statusCode, 401);
	  test.done();
	});
      },

      unableToLogin: function(test) {
	request.post('/login', {
	  "login": usersToCollect[4].login,
	  "password": "foobar42"
	}, function(res) {
	  test.equal(res.statusCode, 400);
	  test.done();
	});
      },

      elementsAreDeleted: {
	user: function(test) {
	  request.get('/user/' + usersToCollect[3].id, function(res) {
	    test.equal(res.statusCode, 404);
	    request.get('/user/' + usersToCollect[4].id, function(res) {
	      test.equal(res.statusCode, 404);
	      test.done();
	    });
	  });
	},

	movie: function(test) {
	  request.get('/movie/' + usersToCollect[3].movieId, function(res) {
	    test.equal(res.statusCode, 404);
	    request.get('/movie/' + usersToCollect[4].movieId, function(res) {
	      test.equal(res.statusCode, 404);
	      test.done();
	    });
	  });
	},

	videoRelease: function(test) {
	  request.get('/video_release/' + usersToCollect[3].videoReleaseId + '/links', function(res) {
	    test.equal(res.statusCode, 200);
	    test.deepEqual(res.body, []);
	    request.get('/video_release/' + usersToCollect[4].videoReleaseId + '/links', function(res) {
	      test.equal(res.statusCode, 200);
	      test.deepEqual(res.body, []);
	      test.done();
	    });
	  });
	}
      }
    },

    me: {
      unlogged: function(test) {
	request.delete('/user/me/complete', function(res) {
	  test.equal(res.statusCode, 401);
	  test.done();
	});
      },

      valid: function(test) {
	request.delete('/user/me/complete', usersToCollect[5].token, function(res) {
	  test.equal(res.statusCode, 204);
	  test.done();
	});
      },

      rootUser: function(test) {
	request.delete('/user/me/complete', global.rootToken, function(res) {
	  test.equal(res.statusCode, 403);
	  test.done();
	});
      },

      elementsAreDeleted: {
	user: function(test) {
	  request.get('/user/' + usersToCollect[5].id, function(res) {
	    test.equal(res.statusCode, 404);
	    test.done();
	  });
	},

	movie: function(test) {
	  request.get('/movie/' + usersToCollect[5].movieId, function(res) {
	    test.equal(res.statusCode, 404);
	    test.done();
	  });
	},

	videoRelease: function(test) {
	  request.get('/video_release/' + usersToCollect[5].videoReleaseId + '/links', function(res) {
	    test.equal(res.statusCode, 200);
	    test.deepEqual(res.body, []);
	    test.done();
	  });
	}
      }
    }
  }
}
