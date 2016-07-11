let removeEmpty = function(obj) {
  if (typeof obj === 'object') {
    for (i in obj)
      obj[i] = module.exports(obj[i]);
  }
  else if (typeof obj === 'string' && obj === '')
    obj = null;
  return obj;
}

let recTrim = function(obj) {
  if (typeof obj === 'object') {
    for (i in obj)
      obj[i] = module.exports(obj[i]);
  }
  else if (typeof obj === 'string')
    obj = obj.trim();
  return obj;
}

module.exports = function(obj) {
  return removeEmpty(recTrim(obj));
}

module.exports.recTrim = recTrim;
module.exports.removeEmpty = removeEmpty;
