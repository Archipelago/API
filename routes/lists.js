let sendResponse = require('../lib/sendResponse');

function listRoute(app, routeName) {
  app.get('/list/' + routeName, function(req, res) {
    models.Lists.get(routeName[0].toUpperCase() + routeName.slice(1), function(e, r) {
      sendResponse(res, 200, r);
    });
  });
}

// TODO: find a way to update it.
function initList(listName) {
  models.Lists.get(listName[0].toUpperCase() + listName.slice(1), function(e, r) {
    lists[listName] = r;
  });
}

module.exports = function(app) {
  for (i in lists) {
    initList(i);
    listRoute(app, i);
  }

  app.get('/lists', function(req, res) {
    sendResponse(res, 200, lists);
  });
}
