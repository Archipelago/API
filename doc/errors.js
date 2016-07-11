/**
 * @apiDefine InvalidParameter
 * @apiError (400) InvalidParameter An invalid parameter has been provided
 * @apiErrorExample InvalidParameter
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "An invalid parameter has been provided"
 *     }
 */

/**
 * @apiDefine AlreadyExists
 * @apiError (400) AlreadyExists The element already exists
 * @apiErrorExample AlreadyExists
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "The element already exists"
 *     }
 */

/**
 * @apiDefine Unauthorized
 * @apiError (401) Unauthorized You must be logged in to perform this action
 * @apiErrorExample Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "You must be logged in to perform this acion"
 *     }
 */

/**
 * @apiDefine Forbidden
 * @apiError (403) Forbidden You don't have the permission required to do that.
 * @apiErrorExample Forbidden
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "You don't have the permission required to do that"
 *     }
 */

/**
 * @apiDefine NotFound
 * @apiError (404) NotFound The element does not exist
 * @apiErrorExample NotFound
 *     HTTP/1.1 404 NotFound
 *     {
 *       "message": "The element does not exist"
 *     }
 */

/**
 * @apiDefine MissingParameter
 * @apiError (400) MissingParameter A mandatory parameter is missing
 * @apiErrorExample MissingParameter
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "A mandatory parameter is missing"
 *     }
 */

/**
 * @apiDefine UserDoesNotExist
 * @apiError (400) UserDoesNotExist User does not exist
 * @apiErrorExample UserDoesNotExist
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "User \"foobar\" not found"
 *     }
 */

/**
 * @apiDefine InvalidPassword
 * @apiError (400) InvalidPassword Bad password provided
 * @apiErrorExample InvalidPassword
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid password"
 *     }
 */
