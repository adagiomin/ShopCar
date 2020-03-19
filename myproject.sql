/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 60011
Source Host           : localhost:3306
Source Database       : myproject

Target Server Type    : MYSQL
Target Server Version : 60011
File Encoding         : 65001

Date: 2020-03-19 14:13:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `prods_list`
-- ----------------------------
DROP TABLE IF EXISTS `prods_list`;
CREATE TABLE `prods_list` (
  `id` tinyint(4) NOT NULL DEFAULT '0',
  `title` varchar(255) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  `zhaiyao` varchar(255) DEFAULT NULL,
  `click` tinyint(4) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `sell_price` double DEFAULT NULL,
  `market_price` double DEFAULT NULL,
  `stock_quantity` tinyint(4) DEFAULT NULL,
  `goods_no` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of prods_list
-- ----------------------------
INSERT INTO `prods_list` VALUES ('1', '2020春季新复古麻花镂空羊毛骆驼绒宽松开衫', '2020-02-26 15:07:22', 'Nicepeople2020春季新复古麻花镂空羊毛骆驼绒宽松开衫外套女针织 ', '1', 'imgs/goods/1.jpg', '398', '539', '10', '1111');
INSERT INTO `prods_list` VALUES ('2', 'ohh cake 纯色围巾围脖 ', '2020-03-13 15:07:22', 'ohh cake 纯色围巾围脖  ', '1', 'imgs/goods/2.jpg', '99', '129', '8', '2222');
INSERT INTO `prods_list` VALUES ('3', '小个子复古碎花连衣裙女 ', '2020-02-26 15:07:22', '【楚楚】2019秋冬新款收腰显瘦过膝中长款小个子复古碎花连衣裙女 ', '1', 'imgs/goods/3.jpg', '178', '183', '4', '3333');
INSERT INTO `prods_list` VALUES ('4', '百搭森系polo领宽松外穿复古风针织衫', '2020-03-17 10:48:36', '条纹毛衣女 ins潮chic百搭森系polo领宽松外穿复古风针织衫秋冬厚 ', '1', 'imgs/goods/4.jpg', '69', '89', '20', '4444');
