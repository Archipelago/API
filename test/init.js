let http = require('http');

global.request = function(route, data, cb) {
  if (cb === undefined) {
    cb = data;
    data = undefined;
  }
  let options = {
    hostname: 'localhost',
    port: 8080,
    path: route,
    method: 'GET',
    headers: {}
  };
  if (data !== undefined) {
    data = JSON.stringify(data);
    options.method = 'POST';
    options.headers['Content-Type'] = 'application/json';
    options.headers['Content-Length'] = data.length;
  }
  let req = http.request(options, function(res) {
    let content = '';
    res.on('data', function(data) {
      content += data;
    });
    res.on('end', function() {
      res.body = JSON.parse(content);
      cb(res);
    });
  });
  if (data !== undefined)
    req.write(data);
  req.end();
}
