module.exports = function(res, code, msg) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = code;
  if (msg === undefined)
    res.end();
  else if (typeof(msg) == 'string')
    res.end(msg);
  else
    res.end(JSON.stringify(msg));
}
