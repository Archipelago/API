var rec_trim = require('../rec_trim');
var listsCorres = {
  'audio_codec': 'audioCodecs',
  'video_codec': 'videoCodecs',
  'compression': 'compressions',
  'language': 'languages',
  'quality': 'qualities',
  'source': 'sources',
  'container': 'containers'
}

module.exports.add = function(infos, cb) {
  infos = rec_trim(infos);

  if (infos.name === undefined
      || infos.name.length == 0)
    cb('Release name must be provided');
  else {
    for (i in listsCorres) {
      if (infos[i] === undefined
	  && i !== 'compression') {
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
    db.query('SELECT `title` FROM `Movies` WHERE `id` = ?', [infos.id], function(e, r) {
      if (r.length < 1)
	cb('No movie found with id "' + infos.id + '"');
      else {
	infos.user_id = users[tokens[infos.token]].id;
	db.query('INSERT INTO `VideoReleases`(`name`, `element_type`, `element_id`, `language_id`, `audio_codec_id`, `video_codec_id`, `source_id`, `quality_id`, `container_id`, `compression_id`, `user_id`) VALUES(:name, "Movies", :id, :language, :audio_codec, :video_codec, :source, :quality, :container, :compression, :user_id)', infos, function(e, r) {
	  cb(e, r);
	});
      }
    });
  }
}

module.exports.getByMovie = function(id, cb) {
  //TODO: fin a way to know if movie exists
  var query = 'SELECT `VideoReleases`.`name`, `ListLanguages`.`name` AS `language`, `ListAudioCodecs`.`name` AS `audio_codec`, `ListVideoCodecs`.`name` AS `video_codec`, `ListLanguages`.`name` AS `language`, `ListQualities`.`name` AS `quality`, `ListSources`.`name` AS `source`, `ListContainers`.`name` AS `container`, `ListCompressions`.`name` AS `compression`\
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
    }
    cb(e, r);
  });
}
