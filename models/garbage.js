module.exports.list = function(cb) {
  db.query('SELECT `id` FROM `Users` WHERE `deleted` = TRUE', function(e, r) {
    let res = [];
    for (let i in r)
      res.push(parseInt(r[i].id));
    cb(e, res);
  });
}
