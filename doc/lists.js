/**
 * @api {get} /lists All
 * @apiName ListAll
 * @apiVersion 0.2.0
 * @apiGroup List
 * @apiDescription Get the list of all available metadata
 * @apiPermission NONE
 *
 * @apiSuccess (200) {Object} data
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "audioCodecs": [
 *         "mp3", "AC3", "DD"
 *       ],
 *       "videoCodecs": [
 *         "XviD", "x264", "x265"
 *       ],
 *       "sources": [
 *         "DVDRiP", "BDRiP", "Web-dl"
 *       ],
 *       "qualities": [
 *         "SD", "720p", "1080p"
 *       ],
 *       "containers": [
 *         "api", "mp4", "mkv"
 *       ],
 *       "languages": [
 *         "en", "ru", "fr"
 *       ],
 *       "compressions": [
 *         "rar", "zip"
 *       ]
 *     }
 */

/**
 * @api {get} /list/audio_codecs Audio codecs
 * @apiName ListAudioCodecs
 * @apiVersion 0.2.0
 * @apiGroup List
 * @apiDescription Get list of available audio codecs
 * @apiPermission NONE
 *
 * @apiSuccess (200) {Array} data
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       "mp3",
 *       "AC3",
 *       "DD"
 *     ]
 */

/**
 * @api {get} /list/video_codecs Video codecs
 * @apiName ListVideoCodecs
 * @apiVersion 0.2.0
 * @apiGroup List
 * @apiDescription Get list of available video codecs
 * @apiPermission NONE
 *
 * @apiSuccess (200) {Array} data
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       "XviD",
 *       "x264",
 *       "x265"
 *     ]
 */

/**
 * @api {get} /list/sources Sources
 * @apiName Listources
 * @apiVersion 0.2.0
 * @apiGroup List
 * @apiDescription Get list of available sources
 * @apiPermission NONE
 *
 * @apiSuccess (200) {Array} data
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       "DVDRiP",
 *       "BDRiP",
 *       "Web-dl"
 *     ]
 */

/**
 * @api {get} /list/qualities Qualities
 * @apiName ListQualities
 * @apiVersion 0.2.0
 * @apiGroup List
 * @apiDescription Get list of available qualities
 * @apiPermission NONE
 *
 * @apiSuccess (200) {Array} data
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       "SD",
 *       "720p",
 *       "1080p"
 *     ]
 */

/**
 * @api {get} /list/containers Containers
 * @apiName ListContainers
 * @apiVersion 0.2.0
 * @apiGroup List
 * @apiDescription Get list of available containers
 * @apiPermission NONE
 *
 * @apiSuccess (200) {Array} data
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       "avi",
 *       "mp4",
 *       "mkv"
 *     ]
 */

/**
 * @api {get} /list/languages Languages
 * @apiName ListLanguages
 * @apiVersion 0.2.0
 * @apiGroup List
 * @apiDescription Get list of available languages
 * @apiPermission NONE
 *
 * @apiSuccess (200) {Array} data
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       "en",
 *       "ru",
 *       "fr"
 *     ]
 */

/**
 * @api {get} /list/compressions Compressions
 * @apiName ListCompressions
 * @apiVersion 0.2.0
 * @apiGroup List
 * @apiDescription Get list of available compressions
 * @apiPermission NONE
 *
 * @apiSuccess (200) {Array} data
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       "rar",
 *       "zip"
 *     ]
 */
