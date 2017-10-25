let removeEmpty = function(obj) {
  if (obj === '')
    obj = undefined;
  else if (typeof obj === 'object') {
    for (let i in obj) {
      obj[i] = removeEmpty(obj[i]);
      if (obj[i] === undefined)
	delete obj[i]
    }
  }
  return obj;
}

let recTrim = function(obj) {
  if (typeof obj === 'object') {
    for (let i in obj)
      obj[i] = recTrim(obj[i]);
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
