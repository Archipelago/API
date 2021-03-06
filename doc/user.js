/**
 * @api {post} /register Register an account
 * @apiVersion 0.2.0
 * @apiName Register
 * @apiGroup User
 * @apiDescription Register an account with a login, a password and some optional fields.
 * @apiPermission NONE
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
 * @apiSuccess(201) id The id of the newly created user
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 201 Created
 *     {
 *       "id": 3
 *     }
 *
 * @apiUse InvalidParameter
 * @apiUse AlreadyExists
 */

/**
 * @api {post} /login Login into your account
 * @apiVersion 0.2.0
 * @apiName Login
 * @apiGroup User
 * @apiDescription Login into your account. Returns a token that will be used to all your signed-in actions. You will have to provide it within the header Token.
 * @apiPermission NONE
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

/**
 * @api {get} /user/:id Get user informations
 * @apiVersion 0.2.0
 * @apiName GetUser
 * @apiGroup User
 * @apiDescription Get informations about an user, depending on its id. The more permissions you have, the more informations you will get.
 * @apiPermission NONE
 *
 * @apiParam {Number} [id] The id of the wanted user. If not specified, current logged in user informations will be retrieved
 *
 * @apiSuccess(200) {Number} id
 * @apiSuccess(200) {String} login
 * @apiSuccess(200) {String[]} permissions
 * @apiSuccess(200) {String} [email] Only if you are retrieving your own infos
 * @apiSuccess(200) {String} [bm] Only if you are retrieving your own infos
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "login": "foobar",
 *       "permissions": [
 *         "ADD_ELEMENT",
 *         "EDIT_ELEMENT",
 *         "ADD_RELEASE"
 *       ],
 *       "email": "foo@bar.com",
 *       "bm": "BM-2cT6bVE4XnubEqXUQBf3GuZV1gjFMGrpFB"
 *     }
 *
 * @apiUse InvalidParameter
 * @apiUse NotFound
 * @apiUse Unauthorized
 */

/**
 * @api {patch} /user/:id/permission Update permissions
 * @apiVersion 0.2.0
 * @apiName EditUserPermission
 * @apiGroup User
 * @apiDescription Edit permissions for a user. Note that you cannot edit your own permissions and you cannot grant permissions you do not have
 * @apiPermission EDIT_PERMISSION
 *
 * @apiParam {Number} id The id of the user you want to change permissions
 * @apiParam {Array} [add] The permissions you want to grant
 * @apiParam {Array} [remove] The permissions you want to revoke
 *
 * @apiParamExample {json} Example:
 *     {
 *       "add": [
 *         "ADD_ELEMENT"
 *         "ADD_RELEASE"
 *       ],
 *       "remove": [
 *         "EDIT_ELEMENT"
 *       ]
 *     }
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {}
 *
 * @apiUse InvalidParameter
 * @apiUse Unauthorized
 * @apiUse Forbidden
 * @apiUse NotFound
 */

/**
 * @api {patch} /user/:id Edit user account
 * @apiVersion 0.2.0
 * @apiName EditUser
 * @apiGroup User
 * @apiDescription Edit an existing account
 * @apiPermission EDIT_USER
 *
 * @apiParam {Number} [id] The id of the account you want to modify, or yours if not specified
 * @apiParam {String} [password] Must be at least 8 chars long
 * @apiParam {String} [email] Email address
 * @apiParam {String} [bm] Bitmessage address
 * @apiParamExample {json} Example:
 *     {
 *       "password": "p4S5w0RD",
 *       "email": "foo@bar.com",
 *       "bm": "BM-2cT6bVE4XnubEqXUQBf3GuZV1gjFMGrpFB"
 *     }
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 204 No Content
 *
 * @apiUse InvalidParameter
 * @apiUse AlreadyExists
 * @apiUse NotFound
 * @apiUse Unauthorized
 * @apiUse Forbidden
 */

/**
 * @api {delete} /user/:id[/complete] Delete a user
 * @apiVersion 0.2.0
 * @apiName DeleteUser
 * @apiGroup User
 * @apiDescription Delete all personal data about a user, and all of its contributions if the argument `/complete` is provided. Eveybody can use this route on its own account. User with id 1 can not be deleted.
 * @apiPermission DELETE_USER
 *
 * @apiParam {Number/String} id The id of the user that will be deleted or the string `"me"` to delete your own account.
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 204 No Content
 *
 * @apiUse InvalidParameter
 * @apiUse Unauthorized
 * @apiUse Forbidden
 * @apiUse NotFound
 */
