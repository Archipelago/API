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
 */

/**
 * @api {post} /login Login into your account
 * @apiName Login
 * @apiGroup User
 * @apiDescription Login into your account. Returns a token that will be used to all your signed-in actions. You will have to provide it within the header Token.
 * @apiPermission unlogged
 *
 * @apiParam {String} login
 * @apiParam {String} password
 * @apiParamExample {json} Example:
 *     {
 *       "login": "foobar",
 *       "password": "p4S5w0RD"
 *     }
 *
 * @apiSuccess(200) {json} status "OK"
 * @apiSuccess(200) {json} token The token that will be used for the next requests
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "OK",
 *       "token": "1a3bf0c54ba8bf7e6020c2b048968f13cb5c13b391ab396566e1388448dec6a4"
 *     }
 *
 * @apiError (400) MissingField An invalid parameter has been provided
 * @apiErrorExample MissingField
 *     HTTP/1.1 Bad Request
 *     {
 *       "status": "Error",
 *       "message": "Login must be provided"
 *     }
 *
 * @apiError (400) UserDoesNotExist User does not exist
 * @apiErrorExample UserDoesNotExist
 *     HTTP/1.1 Bad Request
 *     {
 *       "status": "Error",
 *       "message": "User \"foobar\" not found"
 *     }
 *
 *
 * @apiError (400) InvalidPassword Bad password provided
 * @apiErrorExample InvalidPassword
 *     HTTP/1.1 Bad Request
 *     {
 *       "status": "Error",
 *       "message": "Invalid password"
 *     }
 */
