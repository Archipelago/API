let rec_trim = require('../rec_trim');

module.exports.add = function(infos, cb) {
  infos = rec_trim(infos);

  if (infos.title === undefined
      || infos.title.length == 0)
    cb('Title must be provided');
  else if (infos.release_date === undefined)
    cb('Release date must be provided');
  else if (!infos.release_date.match(/^\d{4}(\-\d{2}){2}$/)
	   || new Date(infos.release_date) == 'Invalid Date')
    cb('Invalid release date');
  else if (infos.original_release_date
	   && (!infos.original_release_date.match(/^\d{4}(\-\d{2}){2}$/)
	       || new Date(infos.original_release_date) == 'Invalid Date'))
    cb('Invalid original release date');
  else if (infos.production_year
	   && (infos.production_year < 1890
	       || infos.production_year > 9999))
    cb('Invalid production year');
  else if (infos.image
	   && !infos.image.match(/^https?:\/\/\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/))
    cb('Invalid image url');
  else {
    let fields = ["director", "producer", "scriptwriter", "actor", "gender", "composer"]
    for (i in fields) {
      if (infos[fields[i]] && !(infos[fields[i]] instanceof Array)) {
	cb("Invalid " + fields[i]);
	return;
      }
      else if (infos[fields[i]])
	infos[fields[i]] = infos[fields[i]].join(";");
    }
    infos.user_id = users[tokens[infos.token]].id;
    db.query('INSERT INTO `Movies`(`title`, `image`, `production_year`, `release_date`, `original_release_date`, `director`, `producer`, `scriptwriter`, `actor`, `gender`, `composer`, `original_title`, `other_title`, `plot`, `informations`, `user_id`) VALUES(:title, :image, :production_year, :release_date, :original_release_date, :director, :producer, :scriptwriter, :actor, :gender, :composer, :original_title, :other_title, :plot, :informations, :user_id)', infos, function(e, r) {
      if (e && e.code == 1062)
	cb('Movie "' + infos.title + '" already exists');
      else
	cb(e, r);
    });
  }
}

module.exports.getById = function(id, cb) {
  db.query('SELECT `title`, `image`, `production_year`, `release_date`, `original_release_date`, `director`, `producer`, `scriptwriter`, `actor`, `gender`, `composer`, `original_title`, `other_title`, `plot`, `informations` FROM `Movies` WHERE `id` = ?', [id], function(e, r) {
    if (r.length < 1)
      cb('No movie found with id "' + id + '"');
    else {
      for (i in r[0])
	if (r[0][i] == null)
	  delete r[0][i];
      cb(e, r[0]);
    }
  });
}
