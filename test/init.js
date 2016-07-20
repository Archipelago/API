let http = require('http');

function request(method, route, token, data, cb) {
  let options = {
    hostname: 'localhost',
    port: process.env.PORT || 8080,
    path: route,
    method: method,
    headers: {}
  };
  if (data !== undefined) {
    data = JSON.stringify(data);
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

global.request = {};

global.request.get = function(route, token, cb) {
  if (cb === undefined)
    request('GET', route, undefined, undefined, token);
  else
    request('GET', route, token, undefined, cb);
}

global.request.post = function(route, token, data, cb) {
  if (cb === undefined)
    request('POST', route, undefined, token, data);
  else
    request('POST', route, token, data, cb);
}

global.request.put = function(route, token, data, cb) {
  if (cb === undefined)
    request('PUT', route, undefined, token, data);
  else
    request('PUT', route, token, data, cb);
}

global.request.patch = function(route, token, data, cb) {
  if (cb === undefined)
    request('PATCH', route, undefined, token, data);
  else
    request('PATCH', route, token, data, cb);
}
