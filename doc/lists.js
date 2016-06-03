/**
 * @api {get} /list/audioCodecs Audio codecs
 * @apiName ListAudioCodecs
 * @apiVersion 0.1.0
 * @apiGroup List
 * @apiDescription Get list of available audio codecs
 * @apiPermission logged
 * @apiPermission unlogged
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
 * @api {get} /list/videoCodecs Video codecs
 * @apiName ListVideoCodecs
 * @apiVersion 0.1.0
 * @apiGroup List
 * @apiDescription Get list of available video codecs
 * @apiPermission logged
 * @apiPermission unlogged
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
 * @apiVersion 0.1.0
 * @apiGroup List
 * @apiDescription Get list of available sources
 * @apiPermission logged
 * @apiPermission unlogged
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
 * @apiVersion 0.1.0
 * @apiGroup List
 * @apiDescription Get list of available qualities
 * @apiPermission logged
 * @apiPermission unlogged
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
 * @apiVersion 0.1.0
 * @apiGroup List
 * @apiDescription Get list of available containers
 * @apiPermission logged
 * @apiPermission unlogged
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
 * @apiVersion 0.1.0
 * @apiGroup List
 * @apiDescription Get list of available languages
 * @apiPermission logged
 * @apiPermission unlogged
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
 * @apiVersion 0.1.0
 * @apiGroup List
 * @apiDescription Get list of available compressions
 * @apiPermission logged
 * @apiPermission unlogged
 *
 * @apiSuccess (200) {Array} data
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *       "rar",
 *       "zip"
 *     ]
 */
