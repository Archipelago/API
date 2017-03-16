let crypto = require('crypto');
let epur = require('../lib/epur');
let pw = require('../lib/password');

module.exports.register = function(infos, cb) {
  infos = epur(infos);

  if (infos.login === undefined)
    cb('Login must be provided');
  else if (infos.login.length < 4
	   || infos.login.length > 32)
    cb('Login must be 4-32 chars long');
  else if (infos.password === undefined)
    cb('Password must be provided');
  else if (infos.password.length < 8)
    cb('Password must be at least 8 chars long');
  else if (infos.mail && !infos.mail.match(/^[\w\.\-]+\@[\w\.\-]+\.[\w]{2,}$/i))
    cb('Invalid email address');
  else if (infos.bm && !infos.bm.match(/^(BM-)?[a-zA-Z0-9]{32,34}$/))
    cb('Invalid bitmessage address');
  else {
    if (infos.bm && infos.bm.substr(0, 3) !== 'BM-')
      infos.bm = 'BM-' + infos.bm;
    let hash = pw.hash(infos.password);
    db.query('INSERT INTO `Passwords`(`salt`, `hash`, `method`) VALUES(:salt, :hash, :method)', hash, function(e, r) {
      infos.password_id = r.info.insertId;
      db.query('INSERT INTO `Users`(`login`, `password_id`, `mail`, `bm`) VALUES(:login, :password_id, :mail, :bm)', infos, function(e, r) {
	if (e && e.code == 1062)
	  cb('User "' + infos.login + '" already exists');
	else
	  cb(e, r);
      });
    });
  }
}

module.exports.login = function(infos, cb) {
  for (i in infos)
    infos[i] = infos[i].trim();

  if (infos.login === undefined)
    cb('Login must be provided');
  else if (infos.password === undefined)
    cb('Password must be provided');
  else {
    db.query('SELECT `Users`.`id`, `Passwords`.`salt`, `Passwords`.`hash`, `Passwords`.`method`, `Users`.`permissions` FROM `Users` LEFT JOIN `Passwords` ON `Passwords`.`id` = `Users`.`password_id` WHERE `Users`.`login` = ? AND `Users`.`deleted` = FALSE', [infos.login], function(e, r) {
      if (r.info.numRows != 1)
	cb('User "' + infos.login + '" not found');
      else if (!pw.check(infos.password, r[0].hash, r[0].salt, r[0].method))
	cb('Invalid password');
      else {
	let hash = pw.hash(infos.password);
	hash.password_id = r[0].id;
	if (r[0].method != pw.preferred()) {
	  db.query('UPDATE `Passwords` SET `salt` = :salt, `hash` = :hash, `method` = :method WHERE `id` = :password_id', hash, function(e, r) {});
	}
	delete r[0].hash;
	delete r[0].salt;
	delete r[0].method;
	cb(e, r[0]);
      }
    });
  }
}

module.exports.search = function(query, cb) {
  query = '%' + query.replace(/[\s\t]+/g, '%') + '%';
  db.query('SELECT `login`, `id`  FROM `Users` WHERE `login` LIKE :q AND `deleted` = FALSE', {q: query}, function(e, r) {
    delete r.info;
    for (i in r[0])
      r[0].id = parseInt(r[0].id);
    cb(e, r);
  });
}

module.exports.getById = function(id, cb) {
  db.query('SELECT `id`, `login`, `permissions`, `mail` AS "email", `bm` FROM `Users` WHERE `id` = ?  AND `deleted` = FALSE', [id], function(e, r) {
    if (r.info.numRows === '0')
      cb('Unable to find user with id "' + id + '"');
    else {
      delete r.info;
      for (i in r[0])
	if (r[0][i] === null)
	  delete r[0][i];
      r[0].permissions = parseInt(r[0].permissions);
      r[0].id = parseInt(r[0].id);
      cb(e, r[0]);
    }
  });
}

module.exports.updatePermission = function(id, permissions, cb) {
  db.query('UPDATE `Users` SET `permissions` = ? WHERE `id` = ? AND `deleted` = FALSE', [permissions, id], function(e, r) {
    cb(e, r);
  });
}

module.exports.deactivate = function(id, cb) {
  db.query('UPDATE `Users` \
  LEFT JOIN `Passwords` ON `Users`.`password_id` = `Passwords`.`id` \
  SET `Users`.`login` = NULL, `Users`.`mail` = NULL, `Users`.`bm` = NULL, `Users`.`permissions` = 0, `Users`.`deleted` = TRUE, `Passwords`.`salt` = NULL, `Passwords`.`hash` = NULL, `Passwords`.`method` = NULL \
  WHERE `Users`.`id` = ? AND `Users`.`deleted` = FALSE', [id], function(e, r) {
    cb(e, r);
  });
}

module.exports.delete = function(id, cb) {
  db.query('DELETE FROM `Multilinks` WHERE `user_id` = ?', [id], function(e, r) {
    if (e) {
      cb(e, r);
      return;
    }
    db.query('DELETE FROM `VideoReleases` WHERE `user_id` = ?', [id], function(e, r) {
      if (e) {
	cb(e, r);
	return;
      }
      db.query('DELETE FROM `Movies` WHERE `user_id` = ?', [id], function(e, r) {
	if (e) {
	  cb(e, r);
	  return;
	}
	db.query('DELETE FROM `Users` WHERE `id` = ?', [id], function(e, r) {
	  cb(e, r);
	});
      });
    });
  });
}
