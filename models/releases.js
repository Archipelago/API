let filesize = require('file-size');
let filesizeParser = require('filesize-parser');
let epur = require('../lib/epur');
let listsCorres = {
  'audio_codec': 'audioCodecs',
  'video_codec': 'videoCodecs',
  'compression': 'compressions',
  'language': 'languages',
  'quality': 'qualities',
  'source': 'sources',
  'container': 'containers'
}

module.exports.add = function(infos, cb) {
  infos = epur(infos);

  if (infos.name === undefined
      || infos.name.length == 0)
    cb('Release name must be provided');
  else if (infos.size === undefined)
    cb('Release size must be provided');
  else {
    try {
      infos.size = filesizeParser(infos.size, {base: infos.size.match(/i/i) ? 2 : 10});
    } catch(e) {
      cb('"' + infos.size + '" does not appear to be a valid size"');
      return;
    }
    for (i in listsCorres) {
      if (infos[i] === undefined
	  && i !== 'compression'
	  && i !== 'informations') {
	cb('Parameter ' + i + ' is missing');
	return;
      }
      else if (infos[i] !== undefined) {
	for (j in lists[listsCorres[i]]) {
	  if (typeof infos[i] === 'string'
	      && infos[i].toLowerCase() == lists[listsCorres[i]][j].toLowerCase())
	    infos[i] = parseInt(j) + 1;
	}
	if (typeof infos[i] !== 'number') {
	  cb('Invalid parameter ' + i + '. GET /list/' + listsCorres[i] + ' to get available possibilities');
	  return;
	}
      }
    }
    if (infos.informations
	&& infos.informations instanceof Array)
      infos.informations = infos.informations.join(';');
    db.query('SELECT `title` FROM `Movies` WHERE `id` = ?', [infos.id], function(e, r) {
      if (r.length < 1)
	cb('No movie found with id "' + infos.id + '"');
      else {
	db.query('INSERT INTO `VideoReleases`(`name`, `element_type`, `element_id`, `size`, `language_id`, `audio_codec_id`, `video_codec_id`, `source_id`, `quality_id`, `container_id`, `compression_id`, `informations`, `user_id`) VALUES(:name, "Movies", :id, :size, :language, :audio_codec, :video_codec, :source, :quality, :container, :compression, :informations, :user_id)', infos, function(e, r) {
	  cb(e, r);
	});
      }
    });
  }
}

module.exports.getByMovie = function(id, cb) {
  //TODO: fin a way to know if movie exists
  let query = 'SELECT `VideoReleases`.`id`, `VideoReleases`.`name`, `VideoReleases`.`size`, `ListLanguages`.`name` AS `language`, `ListAudioCodecs`.`name` AS `audio_codec`, `ListVideoCodecs`.`name` AS `video_codec`, `ListLanguages`.`name` AS `language`, `ListQualities`.`name` AS `quality`, `ListSources`.`name` AS `source`, `ListContainers`.`name` AS `container`, `ListCompressions`.`name` AS `compression`, `VideoReleases`.`informations`\
FROM `VideoReleases`\
INNER JOIN `ListLanguages` ON `ListLanguages`.`id` = `VideoReleases`.`language_id`\
INNER JOIN `ListAudioCodecs` ON `ListAudioCodecs`.`id` = `VideoReleases`.`audio_codec_id`\
INNER JOIN `ListVideoCodecs` ON `ListVideoCodecs`.`id` = `VideoReleases`.`video_codec_id`\
INNER JOIN `ListQualities` ON `ListQualities`.`id` = `VideoReleases`.`quality_id`\
INNER JOIN `ListSources` ON `ListSources`.`id` = `VideoReleases`.`source_id`\
INNER JOIN `ListContainers` ON `ListContainers`.`id` = `VideoReleases`.`container_id`\
LEFT OUTER JOIN `ListCompressions` ON `ListCompressions`.`id` = `VideoReleases`.`compression_id`\
INNER JOIN `Movies` ON `Movies`.`id` = `VideoReleases`.`element_id`\
WHERE `Movies`.`id` = ? AND `VideoReleases`.`element_type` = "Movies"';
  db.query(query, [id], function(e, r) {
    for (i in r) {
      for (j in r[i])
	if (r[i][j] == null)
	  delete r[i][j];
      if (r[i].informations)
	r[i].informations = r[i].informations.split(';');
      r[i].size = filesize(parseInt(r[i].size)).human().split(' ').join('');
    }
    cb(e, r);
  });
}

module.exports.search = function(query, cb) {
  query = '%' + query.replace(/[\s\t]+/g, '%') + '%';
  db.query('SELECT `name`, `id`  FROM `VideoReleases` WHERE `name` LIKE :q', {q: query}, function(e, r) {
    delete r.info;
    for (i in r[0])
      r[0].id = parseInt(r[0].id);
    cb(e, r);
  });
}

module.exports.delete = function(id, cb) {
  db.query('DELETE FROM `Multilinks` WHERE `release_type` = "movie" AND `release_id` = ?', [id], function() {
    db.query('DELETE FROM `VideoReleases` WHERE `id` = ?', [id], function(e, r) {
      if (r.info.affectedRows < 1)
	cb('No release found with id "' + id + '"');
      else
	cb(e, r);
    });
  });
}
