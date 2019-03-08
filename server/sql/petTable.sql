CREATE TABLE   IF NOT EXISTS  `pet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `age` tinyint DEFAULT NULL,
  `status` tinyint DEFAULT 0,
  `area` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `pet_desc` text DEFAULT NULL,
  `pet_breed` varchar(255) DEFAULT NULL,
  `is_delete` tinyint DEFAULT 0,
  `create_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;