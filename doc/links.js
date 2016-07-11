/**
 * @api {post} /video_release/:id/link Add a link
 * @apiVersion 0.2.0
 * @apiName AddLink
 * @apiGroup Link
 * @apiDescription Add everal links to a release. You must provide an array containing either strings and/or arrays. Arrays are interpreted as several links for a single splitted release.
 * @apiPermission ADD_LINK
 *
 * @apiParam {Number} id The id of the video release you want to add links.
 *
 * @apiParam {Array} links
 * @apiParam {String} [link.one] A direct link for a release
 * @apiParam {String[]} [link.several] A release splitted in several links
 * @apiParamExample {json} Example:
 *     [
 *       "https://example.com/release.mkv",
 *       [
 *         "https://example.com/release.mkv.part1.rar",
 *         "https://example.com/release.mkv.part2.rar",
 *         "https://example.com/release.mkv.part3.rar"
 *       ]
 *     ]
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
 * @api {get} /video_release/:id/links Get release links
 * @apiVersion 0.2.0
 * @apiName GetLink
 * @apiGroup Link
 * @apiDescription Get the list of all the links for a release, depending on its id.
 * @apiPermission logged
 * @apiPermission unlogged
 *
 * @apiParam {Number} id The id of the wanted release.
 *
 * @apiSuccess (200) {Array} links
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       "https://example.com/release.mkv",
 *       [
 *         "https://example.com/release.mkv.part1.rar",
 *         "https://example.com/release.mkv.part2.rar",
 *         "https://example.com/release.mkv.part3.rar"
 *       ]
 *     ]
 *
 * @apiUse NotFound
 */

