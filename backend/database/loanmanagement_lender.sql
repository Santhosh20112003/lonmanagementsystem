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
-- Table structure for table `lender`
--

DROP TABLE IF EXISTS `lender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lender` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phonenumber` bigint NOT NULL,
  `intrest` int NOT NULL,
  `timeperiod` int NOT NULL,
  `penaltyamount` int NOT NULL,
  `bankdetails` varchar(250) NOT NULL,
  `agrement` varchar(250) NOT NULL,
  `amount` int DEFAULT '0',
  `password` varchar(45) NOT NULL,
  `otp` varchar(4) DEFAULT NULL,
  `email_send` int DEFAULT NULL,
  `signupotp` varchar(4) DEFAULT NULL,
  `emailverified` varchar(5) DEFAULT 'false',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lender`
--

LOCK TABLES `lender` WRITE;
/*!40000 ALTER TABLE `lender` DISABLE KEYS */;
INSERT INTO `lender` VALUES (1,'Santhosh','santhoshtechnologies22@gmail.com',917418863116,5,3,2000,'taskdetails.pdf','C:\\fakepath\\aws.pdf',10000,'1234@santhosh','2972',1,'3560','true'),(4,'Nishanthi K','nishanthik.2021@dce.edu.in',917418863116,5,3,2000,'C:\\fakepath\\WhatsApp Image 2022-09-30 at 3.14.46 PM.pdf','C:\\fakepath\\aws.pdf',30000,'Santhosh@2003',NULL,NULL,NULL,'true'),(5,'ManiMekalai','megalamani9616@gmail.com',917708439616,2,4,3000,'C:\\fakepath\\vaishu-c-29c22b9f-40bb-4f38-be5a-372db40c80d0-certificate.pdf','C:\\fakepath\\vaishu-c-7bd4fd8a-a9a7-45eb-8481-628893bb480a-certificate.pdf',50000,'Sq@123','4303',1,NULL,'true'),(7,'Sriram L','sriraml.cse2021@dce.edu.in',919941134924,2,12,2000,'C:\\fakepath\\BITS N BYTES SIH 2022.pdf','C:\\fakepath\\SMART INDIA HACKATHON 2022.pdf',0,'Sriram@2003','5114',1,'8655','true');
/*!40000 ALTER TABLE `lender` ENABLE KEYS */;
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
