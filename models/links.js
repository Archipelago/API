var rec_trim = require('../rec_trim');

module.exports.add = function(links, cb) {
  infos = rec_trim(links);

  // TODO: check with empty array or empty array array
  var data = {
    release_type: 'movie',
    release_id: 1,
    user_id: 1
  };
  var query = 'INSERT INTO `Multilinks`(`release_type`, `release_id`, `parts`, `user_id`) VALUES';
  for (i in links) {
    if (typeof links[i] === 'string')
      data['link' + i] = 1;
    else if (links[i] instanceof Array)
      data['link' + i] = links[i].length;
    else {
      cb('Invalid parameter encountered');
      return;
    }
    query += '(:release_type, :release_id, :link' + i + ', :user_id)';
    if (i + 1 < links.length)
      query += ',';
  }

  db.query(query, data, function(e, r) {
    var data = {
      user_id: 1
    };
    var query = 'INSERT IGNORE INTO `Links`(`url`, `multilink_id`, `part`, `user_id`) VALUES';
    var linkNb = 0;
    for (i in links) {
      data['multilink' + i] = parseInt(r.info.insertId) + parseInt(i);
      if (typeof links[i] === 'string') {
	data['url' + ++linkNb] = links[i];
	data['part' + linkNb] = 1;
	query += '(:url' + linkNb + ', :multilink' + i + ', :part' + linkNb + ', :user_id),';
      }
      else if (links[i] instanceof Array) {
	for (j in links[i]) {
	  data['url' + ++linkNb] = links[i][j];
	  data['part' + linkNb] = parseInt(j) + 1;
	  query += '(:url' + linkNb + ', :multilink' + i + ', :part' + linkNb + ', :user_id),';
	}
      }
    }
    query = query.split(/,$/)[0];

    db.query(query, data, function(err, rows) {
      if (rows.info.affectedRows != linkNb) {
	db.query('DELETE FROM `Multilinks` WHERE `id` BETWEEN ? AND ?', [r.info.insertId, r.info.insertId + r.info.affectedRows]);
	db.query('DELETE FROM `Links` WHERE `id` BETWEEN ? AND ?', [rows.info.insertId, rows.info.insertId + rows.info.affectedRows]);
	// TODO: find a way to improve this message.
	cb('Some link you posted are duplicates. None were added.');
      }
      else {
	cb(err, rows);
      }
    });
  });
}
