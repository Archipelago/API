SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `Passwords`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Movies`;
DROP TABLE IF EXISTS `ListAudioCodecs`;
DROP TABLE IF EXISTS `ListCompressions`;
DROP TABLE IF EXISTS `ListContainers`;
DROP TABLE IF EXISTS `ListLanguages`;
DROP TABLE IF EXISTS `ListQualities`;
DROP TABLE IF EXISTS `ListSources`;
DROP TABLE IF EXISTS `ListVideoCodecs`;
DROP TABLE IF EXISTS `VideoReleases`;
DROP TABLE IF EXISTS `Multilinks`;
DROP TABLE IF EXISTS `Links`;
DROP TABLE IF EXISTS `Config`;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `Passwords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `salt` char(32) DEFAULT NULL,
  `hash` varchar(128) DEFAULT NULL,
  `method` varchar(32) DEFAULT "sha256-salt",
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(32) DEFAULT NULL,
  `password_id` int(11) NOT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `bm` varchar(37) DEFAULT NULL,
  `permissions` int(11) NOT NULL,
  `deleted` boolean NOT NULL DEFAULT FALSE,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  KEY `Users_ibfk_1` (`password_id`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`password_id`) REFERENCES `Passwords` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `Movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255),
  `production_year` int(4),
  `release_date` date NOT NULL,
  `original_release_date` date,
  `director` varchar(255),
  `producer` varchar(255),
  `scriptwriter` varchar(255),
  `duration` int(11) DEFAULT NULL,
  `actor` varchar(255),
  `gender` varchar(255),
  `composer` varchar(255),
  `country` varchar(255),
  `original_title` varchar(255),
  `other_title` varchar(255),
  `plot` text,
  `informations` text,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `duplicates` (`title`,`production_year`),
  KEY `Movies_ibfk_1` (`user_id`),
  CONSTRAINT `Movies_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `ListAudioCodecs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `ListCompressions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `ListContainers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `ListLanguages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `ListQualities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `ListSources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `ListVideoCodecs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `VideoReleases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `size` bigint(20) NOT NULL,
  `element_type` varchar(16) NOT NULL,
  `element_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `audio_codec_id` int(11) NOT NULL,
  `video_codec_id` int(11) NOT NULL,
  `source_id` int(11) NOT NULL,
  `quality_id` int(11) NOT NULL,
  `container_id` int(11) NOT NULL,
  `compression_id` int(11) DEFAULT NULL,
  `informations` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `language_id` (`language_id`),
  KEY `audio_codec_id` (`audio_codec_id`),
  KEY `video_codec_id` (`video_codec_id`),
  KEY `source_id` (`source_id`),
  KEY `quality_id` (`quality_id`),
  KEY `container_id` (`container_id`),
  KEY `compression_id` (`compression_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `VideoReleases_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `ListLanguages` (`id`),
  CONSTRAINT `VideoReleases_ibfk_2` FOREIGN KEY (`audio_codec_id`) REFERENCES `ListAudioCodecs` (`id`),
  CONSTRAINT `VideoReleases_ibfk_3` FOREIGN KEY (`video_codec_id`) REFERENCES `ListVideoCodecs` (`id`),
  CONSTRAINT `VideoReleases_ibfk_4` FOREIGN KEY (`source_id`) REFERENCES `ListSources` (`id`),
  CONSTRAINT `VideoReleases_ibfk_5` FOREIGN KEY (`quality_id`) REFERENCES `ListQualities` (`id`),
  CONSTRAINT `VideoReleases_ibfk_6` FOREIGN KEY (`container_id`) REFERENCES `ListContainers` (`id`),
  CONSTRAINT `VideoReleases_ibfk_7` FOREIGN KEY (`compression_id`) REFERENCES `ListCompressions` (`id`),
  CONSTRAINT `VideoReleases_ibfk_8` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `Multilinks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `release_type` varchar(16) NOT NULL,
  `release_id` int(11) NOT NULL,
  `parts` int(2) NOT NULL DEFAULT 1,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Multilinks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `Links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `multilink_id` int(11) NOT NULL,
  `part` int(2) NOT NULL DEFAULT 1,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (`url`),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `multilink_id` (`multilink_id`),
  CONSTRAINT `Links_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `Links_ibfk_1` FOREIGN KEY (`multilink_id`) REFERENCES `Multilinks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `Config` (
  `name` varchar(64) NOT NULL,
  `value` text,
  `type` enum("string", "boolean", "number", "array", "object") NOT NULL DEFAULT "string",
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `Config`(`name`, `type`, `value`) VALUES("garbageUserId", "number", "1"), ("defaultPermissions", "number", "73");
