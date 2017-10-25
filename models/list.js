module.exports.get = function(listName, cb) {
  db.query('SELECT `name` FROM `List' + listName +'` ORDER BY `id` ASC', function(e, r) {
    if (e)
      return cb(e, r);
    delete r.info;
    let res = [];
    for (let i in r)
      res.push(r[i].name);
    cb(e, res);
  });
}
