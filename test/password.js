let password = require('../lib/password');

exports.hash = {
  'sha256-salt': function(test) {
    let hash = password.hash('azerty42', 'sha256-salt');
    test.equal(hash.method, 'sha256-salt');
    test.equal(hash.salt.length, 32);
    test.equal(hash.hash.length, 64);
    test.done();
  },

  'sha1-salt-sha1': function(test) {
    let hash = password.hash('azerty42', 'sha1-salt-sha1');
    test.equal(hash.method, 'sha1-salt-sha1');
    test.equal(hash.salt, undefined);
    test.equal(hash.hash, '0831e1a4655b23eb1bb82632b647def2ae39a70e');
    test.done();
  },

  default: function(test) {
    let hash = password.hash('azerty42');
    test.equal(hash.method, 'sha256-salt');
    test.equal(hash.salt.length, 32);
    test.equal(hash.hash.length, 64);
    test.done();
  }
}

exports.check = {
  'sha256-salt': function(test) {
    test.equal(password.check('azerty42', '90952d513afed60252616b9f24b779adbe47fb792a9f4e51d292e8b595fa0988',
			      '973add59b9128174db366058f0006682', 'sha256-salt'), true);
    test.equal(password.check('azerty42', '80952d513afed60252616b9f24b779adbe47fb792a9f4e51d292e8b595fa0988',
			      '973add59b9128174db366058f0006682', 'sha256-salt'), false);
    test.equal(password.check('azerty42', '90952d513afed60252616b9f24b779adbe47fb792a9f4e51d292e8b595fa0988',
			      '873add59b9128174db366058f0006682', 'sha256-salt'), false);
    test.equal(password.check('azerty', '90952d513afed60252616b9f24b779adbe47fb792a9f4e51d292e8b595fa0988',
			      '973add59b9128174db366058f0006682', 'sha256-salt'), false);
    test.done();
  },

  'sha1-salt-sha1': function(test) {
    test.equal(password.check('azerty42', '0831e1a4655b23eb1bb82632b647def2ae39a70e',
			      undefined, 'sha1-salt-sha1'), true);
    test.equal(password.check('azerty42', '0831e1a4655b23eb1bb82632b647def2ae39a70e',
			      'fakeSalt', 'sha1-salt-sha1'), true);
    test.equal(password.check('azerty', '0831e1a4655b23eb1bb82632b647def2ae39a70e',
			      undefined, 'sha1-salt-sha1'), false);
    test.equal(password.check('azerty42', '1831e1a4655b23eb1bb82632b647def2ae39a70e',
			      undefined, 'sha1-salt-sha1'), false);
    test.done();
  },

  default: function(test) {
    test.equal(password.check('azerty42', '90952d513afed60252616b9f24b779adbe47fb792a9f4e51d292e8b595fa0988',
			      '973add59b9128174db366058f0006682'), true);
    test.equal(password.check('azerty42', '80952d513afed60252616b9f24b779adbe47fb792a9f4e51d292e8b595fa0988',
			      '973add59b9128174db366058f0006682'), false);
    test.equal(password.check('azerty42', '90952d513afed60252616b9f24b779adbe47fb792a9f4e51d292e8b595fa0988',
			      '873add59b9128174db366058f0006682'), false);
    test.equal(password.check('azerty', '90952d513afed60252616b9f24b779adbe47fb792a9f4e51d292e8b595fa0988',
			      '973add59b9128174db366058f0006682'), false);
    test.done();
  },

  invalid: function(test) {
    test.equal(password.check('azerty42', '90952d513afed60252616b9f24b779adbe47fb792a9f4e51d292e8b595fa0988',
			      '973add59b9128174db366058f0006682', 'sha255-salt'), false);
    test.equal(password.check('azerty42', '0831e1a4655b23eb1bb82632b647def2ae39a70e',
			      undefined, 'sha2-salt-sha2'), false);
    test.done();
  }
}

exports.preferred = function(test) {
  test.equal(password.preferred(), 'sha256-salt');
  test.done();
}
