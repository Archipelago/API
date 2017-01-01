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

/**
 * @api {put} /config Update config
 * @apiVersion 0.2.0
 * @apiName UpdateConfig
 * @apiGroup Config
 * @apiDescription Add a configuration variable or edit an already existing one
 * @apiPermission EDIT_CONFIG
 *
 * @apiParam {object} variables Format is _name: value_. Variable names should not exceed 64 characters
 * @apiParamExample {json} Example:
 *     {
 *       "garbageUserId": 2,
 *       "newTestVariable": "foobar"
 *     }
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 204 No Content
 *
 * @apiUse InvalidParameter
 * @apiUse Unauthorized
 * @apiUse Forbidden
 */

/**
 * @api {delete} /config/:name Delete a variable
 * @apiVersion 0.2.0
 * @apiName DeleteConfig
 * @apiGroup Config
 * @apiDescription Delete a configuration variable
 * @apiPermission EDIT_CONFIG
 *
 * @apiParam {string} name The name of the variable that will be deleted
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 204 No Content
 *
 * @apiUse NotFound
 * @apiUse Unauthorized
 * @apiUse Forbidden
 */
