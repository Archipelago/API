/**
 * @api {post} /movie/:id/release/add Add a release
 * @apiName AddRelease
 * @apiGroup Release
 * @apiDescription Add a new release to a movie, giving a lot of informations about it. All of this, except name, have to match one in the database. You can get there possibles values with <a href="#api-List">/list routes</a>. They are case insensitive.
 * @apiPermission logged
 *
 * @apiParam {Number} id The id of the movie you want to add a release.
 *
 * @apiParam {String} name
 * @apiParam {String} language
 * @apiParam {String} audio_codec
 * @apiParam {String} video_codec
 * @apiParam {String} source
 * @apiParam {String} quality
 * @apiParam {String} container
 * @apiParam {String} [compression]
 * @apiParamExample {json} Example:
 *     {
 *       "name": "foobar.en.720p.AC3.x264",
 *       "language": "en",
 *       "audio_codec": "AC3",
 *       "video_codec": "x264",
 *       "source": "BDRiP",
 *       "quality": "720p",
 *       "container": "mkv",
 *       "compression": "rar",
 *     }
 *
 * @apiSuccess (201) {String} status "Created"
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 201 Created
 *     {
 *       "status": "Created"
 *     }
 *
 * @apiUse InvalidParameter
 * @apiUse AlreadyExists
 * @apiUse Unauthorized
 * @apiUse NotFound
 */

/**
 * @api {get} /movie/:id/releases Get movie releases
 * @apiName GetRelease
 * @apiGroup Release
 * @apiDescription Get the list of all the releases for a movie, depending on its id. Empty fields are not retrived.
 * @apiPermission logged
 * @apiPermission unlogged
 *
 * @apiParam {Number} id The id of the wanted movie.
 *
 * @apiSuccess (200) {Object} data
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "name": "foobar.en.720p.AC3.x264",
 *         "language": "en",
 *         "audio_codec": "AC3",
 *         "video_codec": "x264",
 *         "source": "BDRiP",
 *         "quality": "720p",
 *         "container": "mkv",
 *         "compression": "rar"
 *       }
 *     ]
 *
 * @apiUse NotFound
 */
