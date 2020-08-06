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
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `usertype` varchar(15) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int DEFAULT NULL,
  `address` text,
  `fb_id` bigint DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `google_id` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `chk_user_type` CHECK ((`usertype` in (_utf8mb4'admin',_utf8mb4'user')))
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (64,'admin','Trần Thị Hồng Hạnh','honghanhtran058@gmail.com',981341899,'ST',1093380437699644,'4297f44b13955235245b2497399d7a93',NULL),(70,NULL,'Hạnh Hạnh','hanh.tth15577@gmail.com',981321324,'ST',NULL,NULL,'116017223322474848883'),(71,NULL,'Đang Trường Nguyễn','17521184@gm.uit.edu.vn',NULL,NULL,NULL,NULL,'106097174891813047071'),(73,NULL,'trường','truongwv19@gmail.com',981234567,NULL,NULL,'827ccb0eea8a706c4c34a16891f84e7b',NULL),(74,NULL,'Trường Nguyễn','truongwv1999@gmail.com',981341899,'LA',923331904755981,'c315e0bd179e6ca190b04ef1c1a485b0',NULL),(75,NULL,'hanh','hanh.tth@gmail.com',981341897,'ST',NULL,'c315e0bd179e6ca190b04ef1c1a485b0',NULL),(76,NULL,'Trường','truongwv123@gmail.com',981212122,NULL,NULL,'c315e0bd179e6ca190b04ef1c1a485b0',NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-31 20:11:59
