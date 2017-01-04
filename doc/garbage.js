/**
 * @api {get} /garbage Get the list of all ids
 * @apiVersion 0.2.0
 * @apiName GetGarbage
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
