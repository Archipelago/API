/**
 * @apiDefine InvalidParameter
 * @apiError (400) InvalidParameter An invalid parameter has been provided
 * @apiErrorExample InvalidParameter
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": "Error",
 *       "message": "An invalid parameter has been provided"
 *     }
 */

/**
 * @apiDefine AlreadyExists
 * @apiError (400) AlreadyExists This movie already exists
 * @apiErrorExample AlreadyExists
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": "Error",
 *       "message": "Movie \"foobar\" already exists"
 *     }
 */

/**
 * @apiDefine Unauthorized
 * @apiError (401) Unauthorized You must be logged in to perform this action
 * @apiErrorExample Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "status": "Error",
 *       "message": "You must be logged in to perform this acion"
 *     }
 */
