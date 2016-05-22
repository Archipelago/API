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
	db.query('INSERT INTO `VideoReleases`(`name`, `element_type`, `element_id`, `language_id`, `audio_codec_id`, `video_codec_id`, `source_id`, `quality_id`, `container_id`, `compression_id`) VALUES(:name, "Movies", :id, :language, :audio_codec, :video_codec, :source, :quality, :container, :compression)', infos, function(e, r) {
	  cb(e, r);
	});
      }
    });
  }
}
