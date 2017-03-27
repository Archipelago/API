let epur = require('../lib/epur');

exports.removeEmpty = function(test) {
  test.deepEqual({a: "test"}, epur.removeEmpty({a: "test"}));
  test.deepEqual({a: 0}, epur.removeEmpty({a: 0}));
  test.deepEqual({}, epur.removeEmpty({a: ""}));
  test.deepEqual({a: null}, epur.removeEmpty({a: null}));
  test.deepEqual({a: {a: "test"}}, epur.removeEmpty({a: {a: "test"}}));
  test.deepEqual({a: {a: 0}}, epur.removeEmpty({a: {a: 0}}));
  test.deepEqual({a: {}}, epur.removeEmpty({a: {a: ""}}));
  test.deepEqual({a: {a: null}}, epur.removeEmpty({a: {a: null}}));
  test.done();
}

exports.recTrim = function(test) {
  test.deepEqual({a: "test"}, epur.recTrim({a: "  test  "}));
  test.deepEqual({a: "test"}, epur.recTrim({a: "test"}));
  test.deepEqual({a: null}, epur.recTrim({a: null}));
  test.deepEqual({a: {a: "test"}}, epur.recTrim({a: {a: "  test  "}}));
  test.deepEqual({a: {a: "test"}}, epur.recTrim({a: {a: "test"}}));
  test.deepEqual({a: null}, epur.recTrim({a: null}));
  test.done();
}

exports.both = function(test) {
  test.deepEqual({a: "test"}, epur({a: "  test  "}));
  test.deepEqual({}, epur({a: ""}));
  test.deepEqual({a: null}, epur({a: null}));
  test.deepEqual({}, epur({a: "  "}));
  test.deepEqual({a: {a: "test"}}, epur({a: {a: "test"}}));
  test.deepEqual({a: {}}, epur({a: {a: ""}}));
  test.deepEqual({a: {a: null}}, epur({a: {a: null}}));
  test.deepEqual({a: {}}, epur({a: {a: "  "}}));
  test.done();
}
