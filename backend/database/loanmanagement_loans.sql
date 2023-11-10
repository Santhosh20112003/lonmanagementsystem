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
-- Table structure for table `loans`
--

DROP TABLE IF EXISTS `loans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loans` (
  `loanid` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `lender` varchar(45) NOT NULL,
  `borrower` varchar(45) NOT NULL,
  `intrest` int NOT NULL,
  `timeperiod` int NOT NULL,
  `penalty` int NOT NULL,
  `status` varchar(10) NOT NULL,
  `lendername` varchar(45) NOT NULL,
  `borrowername` varchar(45) NOT NULL,
  `type` varchar(20) DEFAULT 'personal',
  `totalamount` int NOT NULL,
  `principalamount` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`loanid`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loans`
--

LOCK TABLES `loans` WRITE;
/*!40000 ALTER TABLE `loans` DISABLE KEYS */;
INSERT INTO `loans` VALUES (34,223443,'megalamani9616@gmail.com','shanmugamsanthosh22@gmail.com',5,3,0,'approved','ManiMekalai','Santhosh S','personal',352000,'100000'),(35,0,'megalamani9616@gmail.com','shanmugamsanthosh22@gmail.com',7,3,0,'paid','ManiMekalai','Santhosh S','gold',704000,'200000'),(36,444000,'megalamani9616@gmail.com','shanmugamsanthosh22@gmail.com',2,2,0,'rejected','ManiMekalai','Santhosh S','assert',444000,'300000'),(37,344000,'megalamani9616@gmail.com','shanmugamsanthosh22@gmail.com',2,3,0,'rejected','ManiMekalai','Santhosh S','assert',344000,'200000'),(38,352000,'megalamani9616@gmail.com','shanmugamsanthosh22@gmail.com',7,3,0,'rejected','ManiMekalai','Santhosh S','gold',352000,'100000'),(39,352000,'megalamani9616@gmail.com','shanmugamsanthosh22@gmail.com',7,3,0,'rejected','ManiMekalai','Santhosh S','gold',352000,'100000'),(40,36800,'megalamani9616@gmail.com','shanmugamsanthosh22@gmail.com',7,1,0,'approved','ManiMekalai','Santhosh S','gold',36800,'20000'),(41,342222,'shanmugamsanthosh22@gmail.com','santhoshs.cse2021@dce.edu.in',7,3,0,'approved','Santhosh S','Santhosh S','gold',352000,'100000'),(42,560000,'megalamani9616@gmail.com','shanmugamsanthosh22@gmail.com',5,3,0,'rejected','ManiMekalai','Nishanthi K','personal',560000,'200000'),(43,684444,'santhoshtechnologies22@gmail.com','shanmugamsanthosh22@gmail.com',7,3,0,'approved','Santhosh','Santhosh S','gold',704000,'200000'),(44,342222,'megalamani9616@gmail.com','saranrajsm1@gmail.com',7,3,0,'approved','ManiMekalai','Saran Raj','gold',352000,'100000');
/*!40000 ALTER TABLE `loans` ENABLE KEYS */;
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
