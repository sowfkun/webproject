-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: lapcitydb
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `catalog_id` int NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `orderitem_id` int DEFAULT NULL,
  `brand_name` varchar(10) NOT NULL,
  `serie` varchar(50) NOT NULL,
  `ma_sku` varchar(20) NOT NULL,
  `price` int NOT NULL,
  `discount_price` int NOT NULL,
  `cpu` varchar(100) NOT NULL,
  `gpu` varchar(100) NOT NULL,
  `ram` varchar(50) NOT NULL,
  `ssd` varchar(50) DEFAULT NULL,
  `hdd` varchar(50) DEFAULT NULL,
  `monitor` varchar(100) DEFAULT NULL,
  `webcam` varchar(10) DEFAULT NULL,
  `interface` varchar(200) DEFAULT NULL,
  `connect` varchar(100) DEFAULT NULL,
  `bluetooth` varchar(50) DEFAULT NULL,
  `pin` varchar(20) DEFAULT NULL,
  `os` varchar(20) DEFAULT NULL,
  `color` varchar(10) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `product_status` varchar(20) DEFAULT NULL,
  `tinh_trang` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`product_id`,`ma_sku`),
  KEY `FK_product_catalog` (`catalog_id`),
  KEY `FK_product_orderitem` (`orderitem_id`),
  CONSTRAINT `FK_product_catalog` FOREIGN KEY (`catalog_id`) REFERENCES `catalog` (`catalog_id`),
  CONSTRAINT `FK_product_orderitem` FOREIGN KEY (`orderitem_id`) REFERENCES `orderitem` (`id`),
  CONSTRAINT `CHK_product_status` CHECK ((`product_status` in (_utf8mb4'active',_utf8mb4'inactive'))),
  CONSTRAINT `CHK_tinh_trang` CHECK ((`tinh_trang` in (_utf8mb4'chưa bán',_utf8mb4'đã bán')))
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (36,1,'nitro5.png1589985607272',58,'Acer','Nitro 5','AN515-54-59WX',25590000,24990000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1650 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','512GB SSD M.2 PCIE,  x1 slot','1TB HDD','15.6','HD webcam','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10 home','đen',2.1,'363 x 255 x 26.8 mm','active','đã bán'),(43,1,'IronMan1.ico1590135471254',59,'Acer','Nitro 5','AN515-54-51X1',20990000,19900000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1050 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','256GB SSD M.2 PCIE, x1 slot','1TB','15.6','HD webcam','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10 home','đen',2.45,'363 x 255 x 26.8 mm','active','đã bán'),(44,1,'nitro5.png1589985607272',60,'Acer','Nitro 5','AN515-54-59WX',25590000,24990000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1650 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','512GB SSD M.2 PCIE,  x1 slot','1TB','15.6','HD webcam','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10 home','đen',2.1,'363 x 255 x 26.8 mm','active','đã bán'),(46,1,'nitro5.png1589985607272',57,'Acer','Nitro 5','AN515-54-59WX',25590000,24990000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1650 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','512GB SSD M.2 PCIE,  x1 slot','1TB HDD','15.6','HD webcam','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10 home','đen',2.1,'363 x 255 x 26.8 mm','active','đã bán'),(47,1,'nitro5.png1589985607272',60,'Acer','Nitro 5','AN515-54-59WX',25590000,22990000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1650 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','512GB SSD M.2 PCIE,  x1 slot','1TB HDD','15.6','HD','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10','đen',2.1,'363 x 255 x 26.8 mm','active','đã bán'),(49,1,'nitro5.png1589985607272',61,'Acer','Nitro 5','AN515-54-59WX',25590000,22990000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1650 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','512GB SSD M.2 PCIE,  x1 slot','1TB HDD','15.6','HD','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10','đen',2.1,'363 x 255 x 26.8 mm','active','đã bán'),(50,1,'IronMan1.ico1590135471254',59,'Acer','Nitro 5','AN515-54-51X1',20990000,19900000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1050 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','256GB SSD M.2 PCIE, x1 slot','1TB','15.6','HD webcam','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10 home','đen',2.45,'363 x 255 x 26.8 mm','active','đã bán'),(51,1,'IronMan1.ico1590135471254',NULL,'Acer','Nitro 5','AN515-54-51X1',20990000,15900000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1050 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','256GB SSD M.2 PCIE, x1 slot','1TB','15.6','HD webcam','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10 ','đen',2.45,'363 x 255 x 26.8 mm','active','chưa bán'),(52,1,'IronMan1.ico1590135471254',NULL,'Acer','Nitro 5','AN515-54-51X1',20990000,15900000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1050 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','256GB SSD M.2 PCIE, x1 slot','1TB','15.6','HD webcam','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10 ','đen',2.45,'363 x 255 x 26.8 mm','active','chưa bán'),(53,1,'IronMan1.ico1590135471254',NULL,'Acer','Nitro 5','AN515-54-51X1',20990000,15900000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1050 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','256GB SSD M.2 PCIE, x1 slot','1TB','15.6','HD webcam','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10 ','đen',2.45,'363 x 255 x 26.8 mm','active','chưa bán'),(54,1,'IronMan1.ico1590135471254',NULL,'Acer','Nitro 5','AN515-54-51X1',20990000,15900000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1050 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','256GB SSD M.2 PCIE, x1 slot','1TB','15.6','HD webcam','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10 ','đen',2.45,'363 x 255 x 26.8 mm','active','chưa bán'),(55,1,'IronMan1.ico1590135471254',NULL,'Acer','Nitro 5','AN515-54-51X1',20990000,15900000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1050 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','256GB SSD M.2 PCIE, x1 slot','1TB','15.6','HD webcam','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10 ','đen',2.45,'363 x 255 x 26.8 mm','active','chưa bán'),(56,1,'IronMan1.ico1590135471254',NULL,'Acer','Nitro 5','AN515-54-51X1',20990000,15900000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1050 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','256GB SSD M.2 PCIE, x1 slot','1TB','15.6','HD webcam','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10 ','đen',2.45,'363 x 255 x 26.8 mm','active','chưa bán'),(57,1,'nitro5.png1589985607272',NULL,'Acer','Nitro 5','AN515-54-59WX',25590000,22990000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1650 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','512GB SSD M.2 PCIE,  x1 slot','1TB HDD','15.6','HD','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10','đen',2.1,'363 x 255 x 26.8 mm','active','chưa bán'),(58,1,'nitro5.png1589985607272',NULL,'Acer','Nitro 5','AN515-54-59WX',25590000,22990000,'Intel Core i5 8300H (2.3GHz up to 4.0GHz, 8MB Cache)','NVIDIA GeForce GTX 1650 4GB GDDR5 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','512GB SSD M.2 PCIE,  x1 slot','1TB HDD','15.6','HD','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10','đen',2.1,'363 x 255 x 26.8 mm','active','chưa bán'),(59,2,'image-3-20200508.jpg1590740959659',NULL,'Dell','G5','g5-aeufhuus',12990000,11590000,'Intel Core i7-9750H (2.6GHz up to 4.5GHz, 12MB Cache)','NVIDIA GeForce GTX 2060 6GB GDDR6 + Intel UHD Graphics 630','8gb DDR4 2666MHZ','256GB SSD M.2 PCIE, x1 slot','1TB','15.6\" full HD, 60Hz, IPS NonGlare','HD webcam','1 x USB Type C (thunderbolt), 2 x USB 3.1 gen 1, 1 x USB 3.1 gen 2(with power off charging), 1 x Mini Display port,1 x HDMI','Chuẩn LAN: 10/100/1000/Gigabits, Chuẩn wifi 802.11 AC','v4.1','4 Cell 48 WHrs','win 10 home','đen',2.45,'363 x 255 x 26.8 mm','active','chưa bán');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-11 13:33:09
