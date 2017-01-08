/**
 * @api {get} /garbage Get the list of all ids
 * @apiVersion 0.2.0
 * @apiName ListGarbage
 * @apiGroup Garbage
 * @apiDescription Retrieve the ids of all the removed users that are not garbaged yet. See [wiki](https://github.com/Archipelago/Wiki/wiki/Garbage) for more information.
 * @apiPermission GARBAGE
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       3, 6, 17
 *     ]
 *
 * @apiUse Unauthorized
 * @apiUse Forbidden
 */

/**
 * @api {get} /garbage/:id Get contributions of a user
 * @apiVersion 0.2.0
 * @apiName GetGarbage
 * @apiGroup Garbage
 * @apiDescription Retrieve the ids of all the contributions of a user.
 * @apiPermission GARBAGE
 *
 * @apiParam {number} id The id of the garbaged user
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "movies": [1, 2, 3],
 *       "video_releases": [8, 9, 13],
 *       "links": [27, 39, 40, 41, 42]
 *     }
 *
 * @apiUse Unauthorized
 * @apiUse Forbidden
 * @apiUse NotFound
 */

/**
 * @api {post} /garbage/:id/save Save data
 * @apiVersion 0.2.0
 * @apiName SaveGarbage
 * @apiGroup Garbage
 * @apiDescription Save contributions of a user and delete it.
 * @apiPermission GARBAGE
 *
 * @apiParam {number} id The id of the garbaged user
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 204 No Content
 *
 * @apiUse Unauthorized
 * @apiUse Forbidden
 * @apiUse NotFound
 */

/**
 * @api {post} /garbage/:id/dismiss Dismiss data
 * @apiVersion 0.2.0
 * @apiName DismissGarbage
 * @apiGroup Garbage
 * @apiDescription Dismiss contributions of a user and delete it.
 * @apiPermission GARBAGE
 *
 * @apiParam {number} id The id of the garbaged user
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 204 No Content
 *
 * @apiUse Unauthorized
 * @apiUse Forbidden
 * @apiUse NotFound
 */
