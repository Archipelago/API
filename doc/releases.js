/**
 * @api {post} /movie/:id/release Add a release
 * @apiVersion 0.2.0
 * @apiName AddRelease
 * @apiGroup Release
 * @apiDescription Add a new release to a movie, giving a lot of informations about it. All of this, except name, have to match one in the database. You can get there possibles values with <a href="#api-List">/list routes</a>. They are case insensitive.
 * @apiPermission ADD_RELEASE
 *
 * @apiParam {Number} id The id of the movie you want to add a release.
 *
 * @apiParam {String} name
 * @apiParam {String} size Note that "b" means "bits" while "B" means "Bytes". Note that 1KiB = 1024B while 1KB = 1000B.
 * @apiParam {String} language
 * @apiParam {String} audio_codec
 * @apiParam {String} video_codec
 * @apiParam {String} source
 * @apiParam {String} quality
 * @apiParam {String} container
 * @apiParam {String} [compression]
 * @apiParam {String[]} [informations] Informations that does not fit in any of the fields above.
 * @apiParamExample {json} Example:
 *     {
 *       "name": "foobar.en.720p.AC3.x264",
 *       "size": "2.1GiB",
 *       "language": "en",
 *       "audio_codec": "AC3",
 *       "video_codec": "x264",
 *       "source": "BDRiP",
 *       "quality": "720p",
 *       "container": "mkv",
 *       "compression": "rar",
 *       "informations": [
 *         "SUBFORCED",
 *         "Director's cut"
 *       ]
 *     }
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 201 Created
 *     {}
 *
 * @apiUse MissingParameter
 * @apiUse InvalidParameter
 * @apiUse AlreadyExists
 * @apiUse Unauthorized
 * @apiUse Forbidden
 * @apiUse NotFound
 */

/**
 * @api {get} /movie/:id/releases Get movie releases
 * @apiVersion 0.2.0
 * @apiName GetRelease
 * @apiGroup Release
 * @apiDescription Get the list of all the releases for a movie, depending on its id. Empty fields are not retrived. The "size" field may differs from what you sent, because it's converted into MiB/GiB. It also returns the id of the release, which is used to retrieve links.
 * @apiPermission NONE
 *
 * @apiParam {Number} id The id of the wanted movie.
 *
 * @apiSuccess (200) {Object[]} releases
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 42,
 *         "name": "foobar.en.720p.AC3.x264",
 *         "size": "2.1GiB",
 *         "language": "en",
 *         "audio_codec": "AC3",
 *         "video_codec": "x264",
 *         "source": "BDRiP",
 *         "quality": "720p",
 *         "container": "mkv",
 *         "compression": "rar",
 *         "informations": [
 *           "SUBFORCED",
 *           "Director's cut"
 *         ]
 *       }
 *     ]
 *
 * @apiUse NotFound
 */

/**
 * @api {delete} /video_release/:id Delete a release
 * @apiVersion 0.2.0
 * @apiName DeleteRelease
 * @apiGroup Release
 * @apiDescription Delete a release depending on its id
 * @apiPermission DELETE_RELEASE
 *
 * @apiParam {Number} id The id of the video release that will be to deleted
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 204 No Content
 *
 * @apiUse InvalidParameter
 * @apiUse MissingParameter
 * @apiUse NotFound
 * @apiUse Unauthorized
 * @apiUse Forbidden
 */

