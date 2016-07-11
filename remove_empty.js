module.exports = function(obj) {
  if (typeof obj === 'object') {
    for (i in obj)
      obj[i] = module.exports(obj[i]);
  }
  else if (typeof obj === 'string' && obj === '')
    obj = null;
  return obj;
}
