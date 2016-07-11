/**
 * @api {get} /search Search elements
 * @apiVersion 0.2.0
 * @apiName Search
 * @apiGroup Search
 * @apiDescription Search for movies, releases, links and users
 * @apiPermission NONE
 *
 * @apiParam {String{3..}} query The terms of the query
 * @apiParam {String} q A shortcut for `query`
 * @apiParam {String...="movie","release","link","user","*"} [type="*"] The maximum number of rows retrieved
 * @apiParam {String...} [t] A shortcut for `type`
 *
 * @apiParamExample {querystring} Request-Example
 *     /search?query=foobar&t=movie,user
 *
 * @apiSuccess (200) {Object} results
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "movie": [
 *         {
 *           "id": 1,
 *           "title": "foobar"
 *         }
 *       ],
 *       "release": [
 *         {
 *           "id": 1,
 *           "name": "foobar.en.720p.AC3.x264"
 *         }
 *       ],
 *       "link": [
 *           "https://example.com/release.mkv"
 *       ],
 *       "user": [
 *         {
 *           "id": 1,
 *           "login": "foobar"
 *         }
 *       ]
 *     }
 *
 * @apiUse MissingParameter
 * @apiUse InvalidParameter
 */
