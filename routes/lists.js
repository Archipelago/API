let sendResponse = require('../lib/sendResponse');
let map = {
  'audio_codecs': 'AudioCodecs',
  'compressions': 'Compressions',
  'containers': 'Containers',
  'languages': 'Languages',
  'qualities': 'Qualities',
  'sources': 'Sources',
  'video_codecs': 'VideoCodecs'
}

function listRoute(app, routeName) {
  app.get('/list/' + routeName, function(req, res) {
    models.List.get(map[routeName], function(e, r) {
      sendResponse(res, 200, r);
    });
  });
}

// TODO: find a way to update it.
function initList(listName) {
  models.List.get(map[listName], function(e, r) {
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
