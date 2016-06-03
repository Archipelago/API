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
 * @apiError (400) AlreadyExists The element already exists
 * @apiErrorExample AlreadyExists
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": "Error",
 *       "message": "The element already exists"
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

/**
 * @apiDefine NotFound
 * @apiError (404) NotFound The element does not exist
 * @apiErrorExample NotFound
 *     HTTP/1.1 404 NotFound
 *     {
 *       "status": "Error",
 *       "message": "The element does not exist"
 *     }
 */

/**
 * @apiDefine MissingParameter
 * @apiError (400) MissingParameter A mandatory parameter is missing
 * @apiErrorExample MissingParameter
 *     HTTP/1.1 Bad Request
 *     {
 *       "status": "Error",
 *       "message": "A mandatory parameter is missing"
 *     }
 */
