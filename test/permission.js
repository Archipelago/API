// Tests are done with id 2
// We need to add a serie of users and to retrieve their ids

exports.grant = {
  unlogged: function(test) {
    request.put('/user/2/permission', {
      "add": [
	"ADD_ELEMENT", "EDIT_ELEMENT", "DELETE_ELEMENT"
      ]
    }, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  unauthorized: function(test) {
    request.put('/user/2/permission', global.token, {
      "add": [
	"ADD_ELEMENT", "EDIT_ELEMENT", "DELETE_ELEMENT"
      ]
    }, function(res) {
      test.equal(res.statusCode, 403);
      test.done();
    });
  },

  rootUser: function(test) {
    request.put('/user/2/permission', global.rootToken, {
      "add": [
	"ADD_ELEMENT", "EDIT_ELEMENT", "DELETE_ELEMENT"
      ]
    }, function(res) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },

  checkUpdatedPermissions: function(test) {
    request.get('/user/2', function(res) {
      test.equal(res.statusCode, 200);
      test.deepEqual(res.body.permissions, ["ADD_ELEMENT", "EDIT_ELEMENT", "DELETE_ELEMENT"]);
      test.done();
    });
  }
}
