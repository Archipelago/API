let duration = require('../duration.js');

exports.validation = {
  pass: function(test) {
    let tests = ['12h34m56s', '12h34m56', '12h34m', '12h34'];
    for (let i in tests) {
      test.equal(duration.validate(tests[i]), true, i);
    }
    test.done();
  },

  fail: function(test) {
    let tests = ['12h60m', '12h100m', '12h34m60s', '12h34m100s', '12h56s', '12h', '12'];
    for (let i in tests) {
      test.equal(duration.validate(tests[i]), false, i);
    }
    test.done();
  }
};

exports.parsing = function(test) {
  let tests = {
    '12h34m56s': 45296,
    '12h34m56': 45296,
    '12h34m': 45240,
    '12h34': 45240
  };
  for (let i in tests) {
    test.equal(duration.parse(i), tests[i], i);
  }
  test.done();
}

exports.readable = function(test) {
  let tests = {
    '12h34m56s': 45296,
    '12h34m00s': 45240,
    '12h34m02s': 45242,
    '12h01m00s': 43260,
    '12h00m00s': 43200,
    '0h00m00s': 0
  };
  for (let i in tests) {
    test.equal(duration.readable(tests[i]), i, tests[i]);
  }
  test.done();
}
