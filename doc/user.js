/**
 * @apiDefine unlogged Unlogged users
 */

/**
 * @api {post} /register Register an account
 * @apiName Register
 * @apiGroup User
 * @apiDescription Register an account with a login, a password and some optional fields.
 * @apiPermission unlogged
 *
 * @apiParam {String} login Must be 4-32 chars long
 * @apiParam {String} password Must be at least 8 chars long
 * @apiParam {String} [email] Email address
 * @apiParam {String} [bm] Bitmessage address
 * @apiParamExample {json} Example:
 *     {
 *       "login": "foobar",
 *       "password": "p4S5w0RD",
 *       "email": "foo@bar.com",
 *       "bm": "BM-2cT6bVE4XnubEqXUQBf3GuZV1gjFMGrpFB"
 *     }
 *
 * @apiSuccess (201) {String} status "Created"
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 201 Created
 *     {
 *       "status": "Created"
 *     }
 *
 * @apiError (400) AlreadyExists An user with this login already exists
 * @apiErrorExample AlreadyExists
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": "Error",
 *       "message": "User \"foobar\" already exists"
 *     }
 *
 * @apiError (400) InvalidParameter An invalid parameter has been provided
 * @apiErrorExample InvalidParameter
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": "Error",
 *       "message": "Invalid bitmessage address"
 *     }
 *
 * @apiError (401) Unauthorized You must not be logged to use this method
 * @apiErrorExample Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "status": "Error",
 *       "message": "You must not be logged in to register an account"
 *     }
 */
