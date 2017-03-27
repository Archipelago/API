let duration = require('../lib/duration');

module.exports.add = function(infos, cb) {
  if (infos.title === undefined
      || infos.title.length == 0)
    cb('Title must be provided');
  else if (infos.release_date === undefined)
    cb('Release date must be provided');
  else if (infos.image === undefined)
    cb('Image url must be provided');
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
	   && !infos.image.match(/^https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/))
    cb('Invalid image url');
  else if (infos.duration
	   && !duration.validate(infos.duration))
    cb('Invalid duration');
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
    if (infos.duration) {
      infos.duration = duration.parse(infos.duration);
    }
    db.query('INSERT INTO `Movies`(`title`, `image`, `production_year`, `release_date`, `original_release_date`, `director`, `producer`, `scriptwriter`, `duration`, `actor`, `gender`, `composer`, `original_title`, `other_title`, `plot`, `informations`, `user_id`) VALUES(:title, :image, :production_year, :release_date, :original_release_date, :director, :producer, :scriptwriter, :duration, :actor, :gender, :composer, :original_title, :other_title, :plot, :informations, :user_id)', infos, function(e, r) {
      if (e && e.code == 1062)
	cb('Movie "' + infos.title + '" already exists');
      else
	cb(e, r);
    });
  }
}

module.exports.update = function(id, infos, cb) {
  let query = 'UPDATE `Movies` SET';
  if (infos.release_date
      && !infos.release_date.match(/^\d{4}(\-\d{2}){2}$/)
      && new Date(infos.release_date) == 'Invalid Date')
    cb('Invalid release date');
  else if (infos.original_release_date
	   && (!infos.original_release_date.match(/^\d{4}(\-\d{2}){2}$/)
	       || new Date(infos.original_release_date) == 'Invalid Date'))
    return cb('Invalid original release date');
  else if (infos.production_year
	   && (infos.production_year < 1890
	       || infos.production_year > 9999))
    cb('Invalid production year');
  else if (infos.image
	   && !infos.image.match(/^https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/))
    cb('Invalid image url');
  else if (infos.duration
	   && !duration.validate(infos.duration))
    cb('Invalid duration');
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
    if (infos.duration) {
      infos.duration = duration.parse(infos.duration);
    }
    fields = ['title', 'image', 'production_year', 'release_date', 'original_release_date', 'director', 'producer', 'scriptwriter', 'duration', 'actor', 'gender', 'composer', 'original_title', 'other_title', 'plot', 'informations'];
    for (let i in fields) {
      if (infos[fields[i]]) {
	query += ' `' + fields[i] + '` = :' + fields[i] + ',';
      }
    }
    query = query.split(/,$/)[0];
    infos.id = id;
    db.query(query + ' WHERE `id` = :id', infos, function(e, r) {
      cb(e, r);
    });
  }
}

module.exports.search = function(query, cb) {
  query = '%' + query.replace(/\s+/g, '%') + '%';
  db.query('SELECT `title`, `id`  FROM `Movies` WHERE `plot` LIKE :q OR `title` LIKE :q', {q: query}, function(e, r) {
    delete r.info;
    for (i in r[0])
      r[0].id = parseInt(r[0].id);
    cb(e, r);
  });
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

module.exports.getLasts = function(nb, cb) {
  db.query('SELECT `id`, `title`, `image`, `production_year`, `release_date`, `original_release_date`, `director`, `producer`, `scriptwriter`, `actor`, `gender`, `composer`, `original_title`, `other_title`, `plot`, `informations` FROM `Movies` ORDER BY `id` DESC LIMIT ' + parseInt(nb), function(e, r) {
    for (i in r) {
      for (j in r[i])
	if (r[i][j] == null)
	  delete r[i][j];
      r[i].id = parseInt(r[i].id);
    }
    delete r.info;
    cb(e, r);
  });
}

module.exports.getLastReleases = function(nb, cb) {
  db.query('SELECT `Movies`.`id`, `title`, `image`, `production_year`, `release_date`, `original_release_date`, `director`, `producer`, `scriptwriter`, `actor`, `gender`, `composer`, `original_title`, `other_title`, `plot`, `Movies`.`informations` FROM `Movies` JOIN `VideoReleases` ON `VideoReleases`.`element_id` = `Movies`.`id` WHERE `VideoReleases`.`element_type` = "Movies" GROUP BY `Movies`.`id` ORDER BY `VideoReleases`.`id` DESC LIMIT ' + parseInt(nb), function(e, r) {
    for (i in r) {
      for (j in r[i])
	if (r[i][j] == null)
	  delete r[i][j];
      r[i].id = parseInt(r[i].id);
    }
    delete r.info;
    cb(e, r);
  });
}

module.exports.getLastLinks = function(nb, cb) {
  db.query('SELECT `Movies`.`id`, `title`, `image`, `production_year`, `release_date`, `original_release_date`, `director`, `producer`, `scriptwriter`, `actor`, `gender`, `composer`, `original_title`, `other_title`, `plot`, `Movies`.`informations` FROM `Movies` JOIN `VideoReleases` ON `VideoReleases`.`element_id` = `Movies`.`id` JOIN `Multilinks` ON `Multilinks`.`release_id` = `VideoReleases`.`id` WHERE `VideoReleases`.`element_type` = "Movies" AND `Multilinks`.`release_type` = "movie" GROUP BY `Movies`.`id` ORDER BY `VideoReleases`.`id` DESC LIMIT ' + parseInt(nb), function(e, r) {
    for (i in r) {
      for (j in r[i])
	if (r[i][j] == null)
	  delete r[i][j];
      r[i].id = parseInt(r[i].id);
    }
    delete r.info;
    cb(e, r);
  });
}

module.exports.getAlpha = function(alpha, nb, page, cb) {
  let query = 'SELECT `id`, `title`, `image`, `production_year`, `release_date`, `original_release_date`, `director`, `producer`, `scriptwriter`, `actor`, `gender`, `composer`, `original_title`, `other_title`, `plot`, `informations` FROM `Movies` WHERE ';
  let where;
  if (alpha == '*')
    where = 'SUBSTR(`title`, 1, 1) NOT BETWEEN "A" AND "Z"';
  else
    where = '`title` LIKE "' + alpha + '%"';
  db.query(query + where + ' ORDER BY `title` ASC LIMIT ' + parseInt(nb + ' OFFSET ' + parseInt(page) * parseInt(nb)), function(e, r) {
    db.query('SELECT COUNT(*) AS "c" FROM `Movies` WHERE ' + where, function(_, count) {
      for (i in r) {
	for (j in r[i])
	  if (r[i][j] == null)
	    delete r[i][j];
	r[i].id = parseInt(r[i].id);
      }
      delete r.info;
      cb(e, {
	pagesNumber: Math.ceil(parseInt(count[0].c) / page),
	elementsNumber: parseInt(count[0].c),
	elements: r
      });
    });
  });
}

module.exports.delete = function(id, cb) {
  db.query('DELETE `Multilinks`, `VideoReleases` FROM `Multilinks` \
  RIGHT JOIN `VideoReleases` ON `Multilinks`.`release_id` = `VideoReleases`.`id` AND `Multilinks`.`release_type` = "movie" \
  WHERE `VideoReleases`.`element_type` = "Movies" AND `VideoReleases`.`element_id` = ?', [id], function() {
    db.query('DELETE FROM `Movies` WHERE `id` = ?', [id], function(e, r) {
      if (r.info.affectedRows < 1)
	cb('No movie found with id "' + id + '"');
      else
	cb(e, r[0]);
    });
  });
}
