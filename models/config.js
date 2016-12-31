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
