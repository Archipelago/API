let crypto = require('crypto');
let epur = require('../lib/epur');

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
    infos.salt = crypto.randomBytes(16).toString('hex');
    infos.password = crypto.createHmac('sha256', infos.salt + infos.password).digest('hex');
    db.query('INSERT INTO `Users`(`login`, `salt`, `password`, `mail`, `bm`) VALUES(:login, :salt, :password, :mail, :bm)', infos, function(e, r) {
      if (e && e.code == 1062)
	cb('User "' + infos.login + '" already exists');
      else
	cb(e, r);
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
    db.query('SELECT `id`, `salt`, `password`, `permissions` FROM `Users` WHERE `login` = ? AND `deleted` = FALSE', [infos.login], function(e, r) {
      if (r.info.numRows != 1)
	cb('User "' + infos.login + '" not found');
      else if (crypto.createHmac('sha256', r[0].salt + infos.password).digest('hex') != r[0].password)
	cb('Invalid password');
      else {
	delete r[0].password;
	delete r[0].salt;
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
  db.query('UPDATE `Users` SET `login` = NULL, `salt` = NULL, `password` = NULL, `mail` = NULL, `bm` = NULL, `permissions` = 0, `deleted` = TRUE WHERE `id` = ? AND `deleted` = FALSE', [id], function(e, r) {
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
