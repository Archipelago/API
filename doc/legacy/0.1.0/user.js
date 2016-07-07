/**
 * @api {post} /register Register an account
 * @apiVersion 0.1.0
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
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 201 Created
 *     {}
 *
 * @apiUse InvalidParameter
 * @apiUse AlreadyExists
 */

/**
 * @api {post} /login Login into your account
 * @apiVersion 0.1.0
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
 * @apiSuccess(200) {json} token The token that will be used for the next requests
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "1a3bf0c54ba8bf7e6020c2b048968f13cb5c13b391ab396566e1388448dec6a4"
 *     }
 *
 *
 * @apiUse MissingParameter
 * @apiUse UserDoesNotExist
 * @apiUse InvalidPassword
 */
