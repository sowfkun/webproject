-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 23.98.122.68    Database: lapcitydb
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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `fullname` varchar(50) NOT NULL,
  `phone` int NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(150) NOT NULL,
  `note` text,
  `orderdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `finishdate` datetime DEFAULT NULL,
  `total_price` int DEFAULT NULL,
  `order_status` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK_orders_customer` (`user_id`),
  CONSTRAINT `FK_orders_customer` FOREIGN KEY (`user_id`) REFERENCES `customer` (`user_id`),
  CONSTRAINT `CHK_status_order` CHECK ((`order_status` in (_utf8mb4'Chờ xét duyệt',_utf8mb4'Đang giao hàng',_utf8mb4'Giao dịch hoàn tất',_utf8mb4'Giao dịch bị hủy')))
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (62,64,'Trần Thị Hồng Hạnh',981341899,'honghanhtran058@gmail.com','ST','','2020-07-11 14:46:02','2020-07-11 15:00:59',23990000,'giao dịch bị hủy'),(63,64,'Trần Thị Hồng Hạnh',981341899,'honghanhtran058@gmail.com','ST','','2020-07-11 14:46:49','2020-07-11 15:00:28',58970000,'Giao dịch hoàn tất'),(64,64,'Trần Thị Hồng Hạnh',981341899,'honghanhtran058@gmail.com','ST','','2020-07-11 14:56:57','2020-07-11 15:00:12',64970000,'Giao dịch hoàn tất'),(65,64,'Trần Thị Hồng Hạnh',981341899,'honghanhtran058@gmail.com','ST','','2020-07-11 15:06:20','2020-07-11 15:49:57',47980000,'Đang giao hàng'),(66,64,'Trần Thị Hồng Hạnh',981341899,'honghanhtran058@gmail.com','ST','','2020-07-11 15:12:12','2020-07-11 23:56:59',44480000,'Đang giao hàng'),(67,75,'hanh',981341897,'hanh.tth@gmail.com','ST','','2020-07-11 23:59:17',NULL,21990000,'Chờ xét duyệt');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-30 16:33:58
