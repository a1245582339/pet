CREATE TABLE   IF NOT EXISTS  `slider_img` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  `dispaly_order` varchar(20) DEFAULT 0,
  `pet_id` varchar(20) DEFAULT null,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;