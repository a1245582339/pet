/*
 Navicat Premium Data Transfer

 Source Server         : pet
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost
 Source Database       : pet_db

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : utf-8

 Date: 10/27/2018 20:53:18 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `admin_info`
-- ----------------------------
DROP TABLE IF EXISTS `admin_info`;
CREATE TABLE `admin_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` tinyint(4) DEFAULT '0',
  `is_delete` tinyint(4) DEFAULT '0',
  `create_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `admin_info`
-- ----------------------------
BEGIN;
INSERT INTO `admin_info` VALUES ('1', '202cb962ac59075b964b07152d234b70', 'admin@1', '17900000000', '天津', '2', '0', '1540543264086'), ('2', '202cb962ac59075b964b07152d234b70', 'admin@2', '13090909900', '天津', '1', '0', '1540543476785'), ('3', '202cb962ac59075b964b07152d234b70', 'admin@3', '17900000000', '天津', '2', '0', '1540544038020');
COMMIT;

-- ----------------------------
--  Table structure for `order_list`
-- ----------------------------
DROP TABLE IF EXISTS `order_list`;
CREATE TABLE `order_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `pet_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0',
  `is_delete` tinyint(4) DEFAULT '0',
  `create_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `order_list`
-- ----------------------------
BEGIN;
INSERT INTO `order_list` VALUES ('1', '1', '4', '0', '1', '1537887493000'), ('2', '1', '4', '1', '1', '1537888305000'), ('3', '5', '4', '2', '1', '1538727467000'), ('4', '5', '7', '1', '0', '1538727695000'), ('5', '5', '1', '1', '0', '1538729558000'), ('6', '5', '1', '2', '0', '1538729581000'), ('7', '5', '1', '1', '1', '1538729707000'), ('8', '5', '2', '1', '0', '1538733404000'), ('9', '5', '4', '1', '1', '1538797880000'), ('10', '5', '5', '1', '0', '1538798023000'), ('11', '5', '8', '2', '0', '1538798616000'), ('12', '5', '9', '1', '0', '1538798716000'), ('13', '5', '12', '2', '0', '1538806918000'), ('14', '6', '3', '2', '0', '1539868571000'), ('15', '5', '6', '0', '0', '1540095536000'), ('16', '4', '2', '0', '0', '1540394143000'), ('17', '4', '3', '0', '0', '1540628382000'), ('18', '4', '2', '0', '0', '1540628764000'), ('19', '4', '1', '0', '0', '1540628778000'), ('20', '6', '1', '0', '0', '1540635563000'), ('21', '7', '1', '1', '0', '1540637158000'), ('22', '6', '2', '0', '0', '1540637249000');
COMMIT;

-- ----------------------------
--  Table structure for `pet`
-- ----------------------------
DROP TABLE IF EXISTS `pet`;
CREATE TABLE `pet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `age` tinyint(4) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0',
  `area` text,
  `category_id` int(11) DEFAULT NULL,
  `pet_desc` text,
  `pet_breed` varchar(255) DEFAULT NULL,
  `is_delete` tinyint(4) DEFAULT '0',
  `create_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `pet`
-- ----------------------------
BEGIN;
INSERT INTO `pet` VALUES ('1', '小可爱1', '/images/dog11540392703000.jpg', '1', '2', '天津', '1', null, '4', '0', '1540392730000'), ('2', '可爱2', '/images/dog21540393479000.jpg', '1', '1', '天津', '1', '可爱', '1', '0', '1540393620000'), ('3', '可爱3', '/images/cat11540393702000.jpg', '1', '1', '天津', '2', '特别乖', '5', '0', '1540393728000');
COMMIT;

-- ----------------------------
--  Table structure for `pet_and_cate`
-- ----------------------------
DROP TABLE IF EXISTS `pet_and_cate`;
CREATE TABLE `pet_and_cate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pet_id` int(11) DEFAULT NULL,
  `cate_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `pet_breed`
-- ----------------------------
DROP TABLE IF EXISTS `pet_breed`;
CREATE TABLE `pet_breed` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cate_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `pet_breed`
-- ----------------------------
BEGIN;
INSERT INTO `pet_breed` VALUES ('1', '1', '拉布拉多犬', '1540390534000'), ('2', '1', '金毛犬', '1540390560000'), ('3', '1', '柯基犬', '1540390593000'), ('4', '1', '英国斗牛犬', '1540390790000'), ('5', '2', '波斯猫', '1540392313000'), ('6', '2', '折耳猫', '1540392323000'), ('7', '2', '布偶猫', '1540392342000'), ('8', '3', '仓鼠', '1540392403000'), ('9', '3', '龙猫', '1540392409000'), ('10', '4', '百灵鸟', '1540392464000'), ('11', '4', '画眉鸟', '1540392477000'), ('12', '4', '相思鸟', '1540392501000'), ('13', '5', '蛋龟', '1540392541000');
COMMIT;

-- ----------------------------
--  Table structure for `pet_cate`
-- ----------------------------
DROP TABLE IF EXISTS `pet_cate`;
CREATE TABLE `pet_cate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `pet_cate`
-- ----------------------------
BEGIN;
INSERT INTO `pet_cate` VALUES ('1', '宠物狗', '1540390458000'), ('2', '宠物猫', '1540392178000'), ('3', '宠物鼠', '1540392387000'), ('4', '观赏鸟', '1540392448000'), ('5', '观赏龟', '1540392525000');
COMMIT;

-- ----------------------------
--  Table structure for `slider_img`
-- ----------------------------
DROP TABLE IF EXISTS `slider_img`;
CREATE TABLE `slider_img` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  `dispaly_order` varchar(20) DEFAULT '0',
  `pet_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `slider_img`
-- ----------------------------
BEGIN;
INSERT INTO `slider_img` VALUES ('18', '/images/dog11540392703000.jpg', '1540644365000', '0', '1'), ('19', '/images/cat11540393702000.jpg', '1540644429000', '0', '3'), ('20', '/images/dog21540393479000.jpg', '1540644462000', '0', '2');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` tinyint(4) DEFAULT '0',
  `is_delete` tinyint(4) DEFAULT '0',
  `create_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'd9b1d7db4cd6e70935368a1efb10e377', 'admin@1', '17900000000', '天津', '2', '0', '1540390165394'), ('2', '202cb962ac59075b964b07152d234b70', 'admin1', '15600009999', '北京', '1', '0', '1540390203014'), ('3', '202cb962ac59075b964b07152d234b70', 'admin@111', '18099990000', '天津', '2', '0', '1540393843496'), ('4', 'd9b1d7db4cd6e70935368a1efb10e377', 'user1', '15609908778', '天津', '0', '0', '1540393981676'), ('5', '202cb962ac59075b964b07152d234b70', 'test1', '18990900909', '天津', '1', '1', '1540435841351'), ('6', '202cb962ac59075b964b07152d234b70', 'user2', '19009990000', '天津', '0', '0', '1540623023982'), ('7', '202cb962ac59075b964b07152d234b70', 'user', '190099908888', '天津', '0', '0', '1540637072534');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
