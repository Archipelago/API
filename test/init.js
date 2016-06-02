let http = require('http');

global.request = function(route, token, data, cb) {
  if (arguments.length == 2) {
    cb = token;
    data = undefined;
    token = undefined;
  }
  else if (arguments.length == 3) {
    cb = data;
    data = token;
    token = undefined;
  }
  let options = {
    hostname: 'localhost',
    port: process.env.PORT || 8080,
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
  if (token !== undefined) {
    options.headers['Token'] = token;
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
