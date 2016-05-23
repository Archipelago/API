/**
 * @api {post} /video_release/:id/link/add Add a link
 * @apiVersion 0.1.0
 * @apiName AddLink
 * @apiGroup Link
 * @apiDescription Add everal links to a release. You must provide an array containing either strings and/or arrays. Arrays are interpreted as several links for a single splitted release.
 * @apiPermission logged
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
