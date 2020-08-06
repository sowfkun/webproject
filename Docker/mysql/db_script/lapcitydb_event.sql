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
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(50) DEFAULT NULL,
  `serie` varchar(50) DEFAULT NULL,
  `url` varchar(50) DEFAULT NULL,
  `title` text NOT NULL,
  `img` varchar(50) DEFAULT NULL,
  `short_content` text NOT NULL,
  `content` text NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `gift` text,
  `banner` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  CONSTRAINT `chk_banner` CHECK ((`banner` in (_utf8mb4'true',_utf8mb4'false'))),
  CONSTRAINT `CHK_event_status` CHECK ((`status` in (_utf8mb4'đang diễn ra',_utf8mb4'sắp diễn ra',_utf8mb4'đã kết thúc')))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (3,'Acer-','G5-','chao-mung-thong-nhat-dat-nuoc-30','Chào mừng thống nhất đất nước 30/4','banner2.png1594394791565','Chỉ còn vài ngày nữa cả nước sẽ bước vào kì nghỉ lễ 30/04 và 01/05, Laptopnew xin chúc Quý khách hàng và Quý đối tác có những ngày nghỉ lễ vui vẻ. ','<p>Chỉ c&ograve;n v&agrave;i&nbsp;ng&agrave;y nữa cả nước sẽ bước v&agrave;o k&igrave; nghỉ lễ 30/04 v&agrave; 01/05, Laptopnew&nbsp;xin ch&uacute;c Qu&yacute; kh&aacute;ch h&agrave;ng v&agrave; Qu&yacute; đối t&aacute;c c&oacute; những ng&agrave;y nghỉ lễ vui vẻ.&nbsp;</p>\r\n\r\n<p>B&ecirc;n cạnh đ&oacute;, Laptopnew xin gửi đến kh&aacute;ch h&agrave;ng chương tr&igrave;nh khuyến m&atilde;i khi mua laptop tại Laptopnew như sau :</p>\r\n\r\n<p>Kh&aacute;ch h&agrave;ng chọn 1 trong c&aacute;c km sau :</p>\r\n\r\n<p>✓ Giảm 50% RAM 4GB</p>\r\n\r\n<p>✓ Giảm 50% SSD 128GB</p>\r\n\r\n<p>✓ Tặng Key Office 365 trị gi&aacute; 3.350.000đ</p>\r\n\r\n<p>✓ Tặng voucher TM : 300.000Đ</p>\r\n\r\n<p>*Kh&ocirc;ng &aacute;p dụng: Thẻ Th&agrave;nh Vi&ecirc;n, C&ugrave;ng Mua</p>\r\n\r\n<p><em>* Chương tr&igrave;nh khuyễn m&atilde;i k&eacute;o d&agrave;i từ 24.04 đến 03.05.2020 v&agrave; c&oacute; thể dừng sớm khi&nbsp;hết số lượng qu&agrave; tặng</em></p>\r\n','2019-07-12','2019-07-20','đã kết thúc',500000,'chuột wifi-','false'),(5,'Dell-','','chao-mung-sinh-nhat-lapcity-2020','Mừng sinh nhật Lapcity','banner.png1594443968913','Chào mừng sinh nhật, khuyến mãi tưng bừng khi mua sắp tại Lapcity','<p>H&ograve;a c&ugrave;ng kh&ocirc;ng kh&iacute; ch&uacute;c mừng sinh nhật lần thứ 11 , Laptopnew gửi lời tri &acirc;n tới kh&aacute;ch h&agrave;ng trong chương tr&igrave;nh khuyến mại&nbsp;&ldquo;KHUYỄN M&Atilde;I TƯNG BỪNG - MỪNG SINH NHẬT 11 TUỔI&rdquo;. Ưu đ&atilde;i&nbsp;d&agrave;nh cho tất cả c&aacute;c kh&aacute;ch h&agrave;ng đến mua h&agrave;ng tại Laptopnew trong thời gian diễn ra sự kiện từ 06.04 đến 22.04.2020. Cơ hội nhận một trong c&aacute;c phần thưởng sau</p>\r\n\r\n<p>- Sạc dự ph&ograve;ng sony ch&iacute;nh h&atilde;ng trị gi&aacute; 550.000₫</p>\r\n\r\n<p>- Chuột kh&ocirc;ng d&acirc;y rapoo 7100P ch&iacute;nh h&atilde;ng trị gi&aacute; 430.000₫</p>\r\n\r\n<p>- Balo Asus BP1500 ch&iacute;nh h&atilde;ng trị gi&aacute; 1.400.000₫</p>\r\n\r\n<p>- Tặng Ram 4GB trị gi&aacute;&nbsp;600.000đ</p>\r\n\r\n<p>- Tặng SSD 128GB trị gi&aacute; 650.000đ</p>\r\n\r\n<p>- T&agrave;i trợ 50% mua SSD 128GB chỉ c&ograve;n 325.000đ (Gi&aacute; gốc: 650.000đ).</p>\r\n\r\n<p>- T&agrave;i trợ 50% mua RAM 4GB chỉ c&ograve;n 300.000đ (Gi&aacute; gốc: 600.000đ).</p>\r\n\r\n<p>- Tặng Key Office 365 trị gi&aacute; 3.350.000₫</p>\r\n\r\n<p>- Voucher tiền mặt 200.000₫</p>\r\n\r\n<p>- L&oacute;t chuột rapoo ch&iacute;nh h&atilde;ng trị gi&aacute;</p>\r\n\r\n<p><em>* Chương tr&igrave;nh khuyễn m&atilde;i k&eacute;o d&agrave;i từ 06.04 đến 22.04.2020 v&agrave; c&oacute; thể dừng sớm kho hết số lượng qu&agrave; tặng</em></p>\r\n','2020-07-06','2020-07-14','đang diễn ra',1000000,'chuột không dây-','true'),(6,'Dell-','','tuan-le-dell','Tuần lễ Dell - khuyến mãi khủng','30_4.png1594485415358','Trong tuần lễ vàng Dell sẽ có 8 mẫu Laptop siêu hot được bán với giá cực hấp dẫn. Đây là những dòng Laptop bán chạy của thương hiệu Dell,  phục vụ cho nhiều đối tượng khách hàng từ nhân viên văn phòng, học sinh, sinh viên...','<p>Trong tuần lễ v&agrave;ng Dell sẽ c&oacute; 8 mẫu Laptop si&ecirc;u hot được b&aacute;n với gi&aacute; cực hấp dẫn. Đ&acirc;y l&agrave; những d&ograve;ng Laptop b&aacute;n chạy của thương hiệu Dell, đa dạng về d&ograve;ng m&aacute;y phục vụ cho nhiều đối tượng kh&aacute;ch h&agrave;ng từ nh&acirc;n vi&ecirc;n văn ph&ograve;ng, học sinh, sinh vi&ecirc;n cho đến c&aacute;c game thủ, bao gồm:</p>\r\n\r\n<p>Với thiết kế hiện đại thể hiện c&aacute; t&iacute;nh v&agrave; hiệu năng mạnh mẽ đ&aacute;p ứng được nhu cầu về c&ocirc;ng việc cũng như s&aacute;ng tạo,&nbsp;<strong>Dell Inspiron 3580-70194511<em>&nbsp;</em></strong>xứng đ&aacute;ng l&agrave; niềm tự h&agrave;o của Dell</p>\r\n\r\n<p><a href=\"https://www.anphatpc.com.vn/laptop-dell-inspiron-3580-70194511_id30617.html\">https://www.anphatpc.com.vn/laptop-dell-inspiron-3580-70194511_id30617.html</a></p>\r\n\r\n<ul>\r\n	<li>Dell Vostro 3480&nbsp; 70187647 gi&aacute; KM chỉ 13.190.000đ</li>\r\n</ul>\r\n\r\n<p>L&agrave; &nbsp;mẫu laptop văn ph&ograve;ng với thiết kế kh&aacute; mỏng nhẹ thuận tiện để mang đi l&agrave;m việc h&agrave;ng ng&agrave;y. Laptop&nbsp;được trang bị cấu h&igrave;nh gi&uacute;p chạy mượt m&agrave; c&aacute;c ứng dụng học tập, văn ph&ograve;ng cơ bản, đi k&egrave;m l&agrave; t&iacute;nh năng bảo mật v&acirc;n tay hiện đại.</p>\r\n\r\n<p><a href=\"https://www.anphatpc.com.vn/laptop-dell-vostro-3480-70187647_id29791.html\">https://www.anphatpc.com.vn/laptop-dell-vostro-3480-70187647_id29791.html</a></p>\r\n\r\n<ul>\r\n	<li>Dell Vostro 5581-70194501 gi&aacute; KM chỉ 16.190.000đ</li>\r\n</ul>\r\n\r\n<p><strong>Dell Vostro 5581 70194501&nbsp;</strong>mẫu laptop nắm bắt được c&ocirc;ng nghệ ti&ecirc;n tiến gi&uacute;p người d&ugrave;ng lu&ocirc;n c&oacute; những trải nghiệm độc đ&aacute;o.&nbsp;</p>\r\n\r\n<p><a href=\"https://www.anphatpc.com.vn/laptop-dell-vostro-5581-70194501_id30682.html\">https://www.anphatpc.com.vn/laptop-dell-vostro-5581-70194501_id30682.html</a></p>\r\n\r\n<ul>\r\n	<li>Dell Vostro 15 3580 T3RMD1 gi&aacute; KM chỉ 13.790.000đ</li>\r\n</ul>\r\n\r\n<p>&nbsp;Chiếc laptop văn ph&ograve;ng&nbsp;cấu h&igrave;nh khỏe, ổ cứng HDD dung lượng khủng lưu trữ thả ga mọi bộ phim hay bản nhạc y&ecirc;u th&iacute;ch.&nbsp;</p>\r\n\r\n<ul>\r\n	<li>Dell G3 3590 N5I5517W gi&aacute; KM chỉ 21.890.000đ</li>\r\n</ul>\r\n\r\n<p>Laptop gaming mới nhất của d&ograve;ng Dell G &ndash; series. Với những đổi mới đ&aacute;ng kể về mặt cấu h&igrave;nh cũng như thiết kế, chiếc laptop n&agrave;y đ&atilde; thực sự chứng minh sức mạnh của m&igrave;nh với t&iacute;n đồ c&ocirc;ng nghệ.</p>\r\n\r\n<p>&nbsp;<a href=\"https://www.anphatpc.com.vn/laptop-dell-inspiron-15-g3-3590-n5i5517w-black_id30759.html\">https://www.anphatpc.com.vn/laptop-dell-inspiron-15-g3-3590-n5i5517w-black_id30759.html</a></p>\r\n\r\n<ul>\r\n	<li>Dell&nbsp; Inspiron 14 3480-NT4X01 gi&aacute; KM chỉ 11.050.000đ</li>\r\n</ul>\r\n\r\n<p>&nbsp;Nằm trong ph&acirc;n kh&uacute;c gi&aacute; rẻ c&oacute; cấu h&igrave;nh trung b&igrave;nh đặc trưng của series 3000. Chiếc laptop n&agrave;y được cộng hưởng bởi thiết kế tối giản v&agrave; hiệu năng ổn định để hướng đến người d&ugrave;ng y&ecirc;u th&iacute;ch sự tiện lợi về mọi mặt.</p>\r\n\r\n<p><a href=\"https://www.anphatpc.com.vn/laptop-dell-inspiron-14-3480-nt4x01_id29630.html\">https://www.anphatpc.com.vn/laptop-dell-inspiron-14-3480-nt4x01_id29630.html</a></p>\r\n\r\n<ul>\r\n	<li>Dell Vostro&nbsp; 3480 - 70187706 gi&aacute; chỉ KM 10.990.000đ</li>\r\n</ul>\r\n\r\n<p>Một mẫu laptop c&oacute; sự kết hợp ho&agrave;n hảo giữa thiết kế v&agrave; hiệu năng, gi&aacute; th&agrave;nh hợp l&yacute; ph&ugrave; hợp với giới văn ph&ograve;ng v&agrave; học sinh, sinh vi&ecirc;n.</p>\r\n\r\n<p><a href=\"https://www.anphatpc.com.vn/laptop-dell-vostro-3480-70187706_id30034.html\">https://www.anphatpc.com.vn/laptop-dell-vostro-3480-70187706_id30034.html</a></p>\r\n\r\n<ul>\r\n	<li>Dell Vostro&nbsp; 3480 - 70187708 gi&aacute; KM chỉ 14.290.000đ</li>\r\n</ul>\r\n\r\n<p>Đ&acirc;y cũng l&agrave; một mẫu laptop trong ph&acirc;n kh&uacute;c gi&aacute; rẻ m&agrave; vẫn đ&aacute;p ứng được c&aacute;c nhu cầu văn ph&ograve;ng cơ bản, ph&ugrave; hợp cho c&aacute;c doanh nh&acirc;n hay phải di chuyển nhiều.</p>\r\n\r\n<p><a href=\"https://www.anphatpc.com.vn/laptop-dell-vostro-3480-70187708_id30036.html\">https://www.anphatpc.com.vn/laptop-dell-vostro-3480-70187708_id30036.html</a></p>\r\n\r\n<p>Ngo&agrave;i ra, khi đến An Ph&aacute;t mua những mẫu laptop tr&ecirc;n trong Tuần lễ v&agrave;ng, c&aacute;c qu&yacute; kh&aacute;ch h&agrave;ng sẽ được tặng&nbsp;Sạc dự ph&ograve;ng Orico Polymer K10S (10,000mAh/Đen) trị gi&aacute; 490.000đ v&agrave; c&aacute;c phần qu&agrave; c&oacute; gi&aacute; trị k&egrave;m theo.</p>\r\n','2020-07-12','2020-07-19','đang diễn ra',300000,'bàn phím không dây-','true');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-31 20:12:05
