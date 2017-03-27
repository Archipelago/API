let _ = require('lodash');

// TODO: this code need refactorisation
module.exports.add = function(infos, cb) {
  if (infos.links.length == 0) {
    cb('Invalid parameter encountered');
    return;
  }

  let query = 'INSERT INTO `Multilinks`(`release_type`, `release_id`, `parts`, `user_id`) VALUES';
  let links = infos.links;
  for (i in links) {
    if (typeof links[i] === 'string')
      infos['link' + i] = 1;
    else if (links[i] instanceof Array
	     && links[i].length > 0)
      infos['link' + i] = links[i].length;
    else {
      cb('Invalid parameter encountered');
      return;
    }
    query += '(:release_type, :release_id, :link' + i + ', :user_id)';
    if (i + 1 < links.length)
      query += ',';
  }

  db.query(query, infos, function(e, r) {
    let query = 'INSERT IGNORE INTO `Links`(`url`, `multilink_id`, `part`, `user_id`) VALUES';
    let linkNb = 0;
    for (i in links) {
      infos['multilink' + i] = parseInt(r.info.insertId) + parseInt(i);
      if (typeof links[i] === 'string') {
	infos['url' + ++linkNb] = links[i];
	infos['part' + linkNb] = 1;
	query += '(:url' + linkNb + ', :multilink' + i + ', :part' + linkNb + ', :user_id),';
      }
      else {
	for (j in links[i]) {
	  infos['url' + ++linkNb] = links[i][j];
	  infos['part' + linkNb] = parseInt(j) + 1;
	  query += '(:url' + linkNb + ', :multilink' + i + ', :part' + linkNb + ', :user_id),';
	}
      }
    }
    query = query.split(/,$/)[0];

    db.query(query, infos, function(err, rows) {
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

module.exports.getByRelease = function(id, cb) {
  //TODO: fin a way to know if release exists
  let query = 'SELECT `Links`.`id`, `Links`.`url`, `Links`.`multilink_id` FROM `Links` \
INNER JOIN `Multilinks` ON `Multilinks`.`id` = `Links`.`multilink_id` \
WHERE `Multilinks`.`release_id` = ? AND `Multilinks`.`release_type` = "movie"';
  db.query(query, [id], function(e, r) {
    delete r.info;
    r = _.reduce(r, function(r, v, k) {
      (r[v.multilink_id] || (r[v.multilink_id] = [])).push({id: parseInt(v.id), url: v.url});
      return r;
    }, {});
    r = _.map(_.toArray(r), function(o) {
      return o.length === 1 ? o[0] : o;
    });
    cb(e, r);
  });
}

module.exports.search = function(query, cb) {
  query = '%' + query.replace(/\s+/g, '%') + '%';
  db.query('SELECT `id`, `url` FROM `Links` WHERE `url` LIKE :q', {q: query}, function(e, r) {
    delete r.info;
    for (i in r[0])
      r[0].id = parseInt(r[0].id);
    cb(e, r);
  });
}

module.exports.delete = function(id, cb) {
  db.query('DELETE FROM `Links` WHERE `id` = ?', [id], function(e, r) {
    if (r.info.affectedRows < 1)
      cb('No link found with id "' + id + '"');
    else
      cb(e, r);
  });
}

module.exports.update = function(id, url, cb) {
  db.query('UPDATE `Links` SET `url` = ? WHERE `id` = ?', [url, id], function(e, r) {
    cb(e, r);
  });
}
