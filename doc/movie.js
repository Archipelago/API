/**
 * @api {post} /movie Add a movie
 * @apiVersion 0.2.0
 * @apiName AddMovie
 * @apiGroup Movie
 * @apiDescription Add a new movie. Title and release date are mandatory, and a lot of fields can be added (see below)
 * @apiPermission ADD_MOVIE
 *
 * @apiParam {String} title
 * @apiParam {Date} release_date Format is YYYY-MM-DD
 * @apiParam {Url} [image]
 * @apiParam {Number{4}} [production_year]
 * @apiParam {Date} [original_release_date] Format is YYYY-MM-DD
 * @apiParam {String[]} [director]
 * @apiParam {String[]} [producer]
 * @apiParam {String[]} [scriptwriter]
 * @apiParam {String[]} [actor]
 * @apiParam {String[]} [gender]
 * @apiParam {String[]} [composer]
 * @apiParam {String} [original_title]
 * @apiParam {String} [other_title]
 * @apiParam {String} [gender]
 * @apiParam {String} [plot]
 * @apiParam {String} [informations]
 * @apiParamExample {json} Example:
 *     {
 *       "title": "foobar",
 *       "release_date": "1999-03-31",
 *       "production_year": "1998"
 *     }
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 201 Created
 *     {}
 *
 * @apiUse MissingParameter
 * @apiUse InvalidParameter
 * @apiUse AlreadyExists
 * @apiUse Unauthorized
 * @apiUse Forbidden
 */

/**
 * @api {get} /movie/:id Get a movie
 * @apiVersion 0.2.0
 * @apiName GetMovie
 * @apiGroup Movie
 * @apiDescription Get informations about a movie, depending on its id. Empty fields are not retrieved.
 * @apiPermission NONE
 *
 * @apiParam {Number} id The id of the wanted movie.
 *
 * @apiSuccess (200) {Object} data
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "title": "foobar",
 *       "release_date": "1999-03-31",
 *       "production_year": "1998"
 *     }
 *
 * @apiUse NotFound
 */

/**
 * @api {get} /movies/last/:nb Get latest movies
 * @apiVersion 0.2.0
 * @apiName GetLastMovies
 * @apiGroup Movie
 * @apiDescription Retrieve latest added` movies.
 * @apiPermission NONE
 *
 * @apiParam {Number{1..100}} nb=15 The number of movies that will be retrieved
 *
 * @apiSuccess (200) {Object[]} data
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "title": "foobar",
 *         "release_date": "1999-03-31",
 *         "production_year": "1998"
 *       }
 *     ]
 *
 * @apiUse InvalidParameter
 */

/**
 * @api {get} /movies/lastReleases/:nb Get latest movies (release)
 * @apiVersion 0.2.0
 * @apiName GetLastMovieReleases
 * @apiGroup Movie
 * @apiDescription Get movies with latests added releases
 * @apiPermission NONE
 *
 * @apiParam {Number{1..100}} nb=15 The number of movies that will be retrieved
 *
 * @apiSuccess (200) {Object[]} data
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "title": "foobar",
 *         "release_date": "1999-03-31",
 *         "production_year": "1998"
 *       }
 *     ]
 *
 * @apiUse InvalidParameter
 */
