function getType(o) {
  if (o === null)
    return 'string';
  return ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

module.exports.get = function(cb) {
  db.query('SELECT `name`, `value`, `type` FROM `Config` ORDER BY `name` ASC', function(e, r) {
    let res = {};
    delete r.info;
    for (let i in r) {
      if (r[i].type !== 'string') {
	res[r[i].name] = JSON.parse(r[i].value);
      }
      else
	res[r[i].name] = r[i].value;
    }
    global.otfConfigName = res;
    cb(e, res);
  });
}

module.exports.addOrUpdate = function(values, cb) {
  let query = 'INSERT INTO `Config`(`name`, `value`, `type`) VALUES';
  let vars = [];
  for (let i in values) {
    if (i.length > 64) {
      cb('Variable name "' + i + '" is too long');
      return;
    }
    vars.push(i);
    let value;
    if (typeof values[i] !== 'string'
	&& values[i] !== null)
      value = JSON.stringify(values[i]);
    else
      value = values[i];
    vars.push(value);
    global.otfConfigName[i] = value;
    vars.push(getType(values[i]));
    query += '(?,?,?),';
  }
  query = query.split(/,$/)[0] + ' ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `type` = VALUES(`type`)';
  db.query(query, vars, function(e, r) {
    cb(e, r);
  });
}


module.exports.delete = function(name, cb) {
  db.query('DELETE FROM `Config` WHERE `name` = ?', [name], function(e, r) {
    delete global.otfConfig[name];
    if (r.info.affectedRows != 1)
      cb('The variable "' + name + '" does not exist');
    else
      cb(e, r);
  });
}
