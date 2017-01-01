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
    cb(e, res);
  });
}

module.exports.addOrUpdate = function(values, cb) {
  let query = 'INSERT INTO `Config`(`name`, `value`, `type`) VALUES';
  let vars = [];
  for (let i in values) {
    vars.push(i);
    if (typeof values[i] !== 'string'
	&& values[i] !== null)
      vars.push(JSON.stringify(values[i]));
    else
      vars.push(values[i]);
    vars.push(getType(values[i]));
    query += '(?,?,?),';
  }
  query = query.split(/,$/)[0] + ' ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `type` = VALUES(`type`)';
  db.query(query, vars, function(e, r) {
    cb(e, r);
  });
}
