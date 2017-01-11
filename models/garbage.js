let _ = require('lodash');

module.exports.list = function(cb) {
  db.query('SELECT `id` FROM `Users` WHERE `deleted` = TRUE', function(e, r) {
    let res = [];
    for (let i in r)
      res.push(parseInt(r[i].id));
    cb(e, res);
  });
}

module.exports.save = function(sourceId, collectorId, cb) {
  db.query('UPDATE `Users` \
  LEFT JOIN `Movies` ON `Movies`.`user_id` = `Users`.`id` \
  LEFT JOIN `VideoReleases` ON `VideoReleases`.`user_id` = `Users`.`id` \
  LEFT JOIN `Multilinks` ON `Multilinks`.`user_id` = `Users`.`id` \
  LEFT JOIN `Links` ON `Links`.`user_id` = `Users`.`id` \
  SET `Links`.`user_id` = :new, \
      `Multilinks`.`user_id` = :new, \
      `VideoReleases`.`user_id` = :new, \
      `Movies`.`user_id` = :new \
  WHERE `Users`.`id` = :old', {new: collectorId, old: sourceId}, function(e, r) {
    cb(e, r);
  });
}

module.exports.contribs = function(id, cb) {
  let res = {movies: [], video_releases: [], links: []};
  db.query('SELECT `id` FROM `Movies` WHERE `user_id` = ?', [id], function(e, movies) {
    if (e) {
      cb(e, movies);
      return;
    }
    db.query('SELECT `id` FROM `VideoReleases` WHERE `user_id` = ?', [id], function(e, videoReleases) {
      if (e) {
	cb(e, videoReleases);
	return;
      }
      db.query('SELECT `id` FROM `Links` WHERE `user_id` = ?', [id], function(e, links) {
	if (e)
	  cb(e, links);
	else {
	  let epur = function(x) { return x.id; };
	  res.movies = _.map(movies, epur);
	  res.video_releases = _.map(videoReleases, epur);
	  res.links = _.map(links, epur);
	  cb(e, res);
	}
      });
    });
  });
}
