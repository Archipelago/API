var crypto = require('crypto');

module.exports.register = function(infos, cb) {
  for (i in infos)
    infos[i] = infos[i].trim();

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
    infos.salt = crypto.randomBytes(32).toString('hex');
    infos.password = crypto.createHmac('sha256', infos.salt + infos.password).digest('hex');
    db.query('INSERT INTO `Users`(`login`, `salt`, `password`, `mail`, `bm`) VALUES(:login, :salt, :password, :mail, :bm)', infos, function(e, r) {
      if (e && e.code == 1062)
	cb('User "' + infos.login + '" already exists');
      else
	cb(e, r);
    });
  }
}
