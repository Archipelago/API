/**
 * @api {get} /config Get config
 * @apiVersion 0.2.0
 * @apiName GetConfig
 * @apiGroup Config
 * @apiDescription Retrieve all the configuration variables
 * @apiPermission GET_CONFIG
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "defaultPermissions": 73,
 *       "garbageUserId": 1
 *     }
 *
 * @apiUse Unauthorized
 * @apiUse Forbidden
 */
