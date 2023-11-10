-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: loanmanagement
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `requestloan`
--

DROP TABLE IF EXISTS `requestloan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requestloan` (
  `loanid` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `pintrest` int NOT NULL,
  `repayment` int NOT NULL,
  `lenderemail` varchar(45) DEFAULT NULL,
  `borroweremail` varchar(45) NOT NULL,
  `lender` varchar(45) DEFAULT NULL,
  `borrower` varchar(45) CHARACTER SET armscii8 COLLATE armscii8_general_ci NOT NULL,
  `proof` varchar(255) NOT NULL,
  `type` varchar(20) DEFAULT 'personal',
  `totalamount` int NOT NULL,
  PRIMARY KEY (`loanid`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requestloan`
--

LOCK TABLES `requestloan` WRITE;
/*!40000 ALTER TABLE `requestloan` DISABLE KEYS */;
INSERT INTO `requestloan` VALUES (71,200000,2,5,NULL,'shanmugamsanthosh22@gmail.com',NULL,'Santhosh S','taskdetails.pdf','assert',440000),(76,100000,7,3,NULL,'shanmugamsanthosh22@gmail.com',NULL,'Santhosh S','Dashboard.pdf','gold',352000),(77,100000,7,3,NULL,'shanmugamsanthosh22@gmail.com',NULL,'Santhosh S','Dashboard.pdf','gold',352000),(80,100000,7,3,NULL,'shanmugamsanthosh22@gmail.com',NULL,'Nishanthi K','taskdetails.pdf','gold',352000);
/*!40000 ALTER TABLE `requestloan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-10 10:28:57
