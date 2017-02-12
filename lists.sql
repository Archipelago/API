LOCK TABLES `ListAudioCodecs` WRITE;
INSERT INTO `ListAudioCodecs`(`name`) VALUES('mp3'), ('AC3'), ('DD');
UNLOCK TABLES;

LOCK TABLES `ListCompressions` WRITE;
INSERT INTO `ListCompressions`(`name`) VALUES('rar'), ('zip');
UNLOCK TABLES;

LOCK TABLES `ListContainers` WRITE;
INSERT INTO `ListContainers`(`name`) VALUES('mkv'), ('mp4'), ('avi');
UNLOCK TABLES;

LOCK TABLES `ListLanguages` WRITE;
INSERT INTO `ListLanguages`(`name`) VALUES('en'), ('ru'), ('fr');
UNLOCK TABLES;

LOCK TABLES `ListQualities` WRITE;
INSERT INTO `ListQualities`(`name`) VALUES('SD'), ('720p'), ('1080p');
UNLOCK TABLES;

LOCK TABLES `ListSources` WRITE;
INSERT INTO `ListSources`(`name`) VALUES('DVDRiP'), ('BDRiP'), ('Web-dl');
UNLOCK TABLES;

LOCK TABLES `ListVideoCodecs` WRITE;
INSERT INTO `ListVideoCodecs`(`name`) VALUES('XviD'), ('x264'), ('x265');
UNLOCK TABLES;
