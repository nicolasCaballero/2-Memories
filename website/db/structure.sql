CREATE DATABASE  IF NOT EXISTS `memories_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `memories_db`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: memories_db
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adminuser`
--

DROP TABLE IF EXISTS `adminuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adminuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` text,
  `role` int(11) DEFAULT NULL,
  `photo` longtext,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminuser`
--

LOCK TABLES `adminuser` WRITE;
/*!40000 ALTER TABLE `adminuser` DISABLE KEYS */;
INSERT INTO `adminuser` VALUES (1,'Sebastian','snavarro','sebastian.navarro87@gmail.com','$2b$10$ob2eBIr7KRyct/S/yqYJEOljvEBe5CVGz1nAtLqrfoBJPuarv8EPW',1,'sebas.jpg','2020-08-10 17:31:18','2020-08-10 17:31:18','2020-08-10 17:31:18'),(2,'Facundo','fruiz','facu-ru@hotmail.com','$2b$10$BTJcA/hLojYdjq5vIyXH3eyF1csSTBJm.YtuuSTKd/v.3Mtr6d38.',1,'facu.jpg','2020-08-10 17:35:19','2020-08-10 17:35:19','2020-08-10 17:35:19'),(3,'nicolas','ncaballero','niicolas.caballero@gmail.com','$2b$10$dOcfUFyHoYgVwUg7UzJLM.q59aUjHpPAMinsNg4Ajw2zA18FBmXRy',2,'nico.jpg','2020-08-10 17:35:19','2020-08-10 17:35:19','2020-08-10 17:35:19'),(4,'DHFullAdmin','dhfulladmin','dhfulladmin@test.com','$2b$10$gnBduGLx9Dh4NCEBkBsHEOKgjCMx6N1SIfkDShUm2Y9xweYi/DWXK',1,'digitalhouse.jpg','2020-08-10 17:41:11','2020-08-10 17:41:11','2020-08-10 17:41:11'),(5,'DHBasicUser','dhbasicuser','dhbasicuser@test.com','$2b$10$7ObeyBkXaWYj2p/XkR/6cuksCmI0m3zAR7my62jxyMDsfbpJk.ERC',2,'digitalhouse.jpg','2020-08-10 17:41:11','2020-08-10 17:41:11','2020-08-10 17:41:11');
/*!40000 ALTER TABLE `adminuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `orderNumber` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `productSku` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_foreign_idx` (`userId`),
  KEY `productSku_foreign_cart_idx` (`productSku`),
  CONSTRAINT `productSku_foreign_cart` FOREIGN KEY (`productSku`) REFERENCES `products` (`sku`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_id_foreign_cart` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartproduct`
--

DROP TABLE IF EXISTS `cartproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cartproduct` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(45) DEFAULT NULL,
  `salePrice` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `subTotal` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `cartId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `productSku` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_foreign_cartProduct_idx` (`userId`),
  KEY `cartId_foreign_cartProduct_idx` (`cartId`),
  KEY `productSku_foreign_cartProduct_idx` (`productSku`),
  CONSTRAINT `cartId_foreign_cartProduct` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `productSku_foreign_cartProduct` FOREIGN KEY (`productSku`) REFERENCES `products` (`sku`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userId_foreign_cartProduct` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartproduct`
--

LOCK TABLES `cartproduct` WRITE;
/*!40000 ALTER TABLE `cartproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `image` text,
  `visibility` tinyint(4) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `productSku` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_sku_foreign_categories_idx` (`productSku`),
  CONSTRAINT `product_sku_foreign_categories` FOREIGN KEY (`productSku`) REFERENCES `products` (`sku`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'aventura','aventura.jpg',0,'2020-08-10 17:46:12','2020-08-10 17:46:12','2020-08-10 17:46:12',NULL),(2,'bienestar','bienestar.jpg',0,'2020-08-10 17:46:12','2020-08-10 17:46:12','2020-08-10 17:46:12',NULL),(3,'cursos','cursos.jpg',0,'2020-08-10 17:46:12','2020-08-10 17:46:12','2020-08-10 17:46:12',NULL),(4,'entretenimiento','entretenimiento.jpg',0,'2020-08-10 17:46:12','2020-08-10 17:46:12','2020-08-10 17:46:12',NULL),(5,'escapadas','escapadas.jpg',0,'2020-08-10 17:46:12','2020-08-10 17:46:12','2020-08-10 17:46:12',NULL),(6,'gastronomia','gastronomia.jpg',0,'2020-08-10 17:46:12','2020-08-10 17:46:12','2020-08-10 17:46:12',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiences`
--

DROP TABLE IF EXISTS `experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experiences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` longtext NOT NULL,
  `image` longtext NOT NULL,
  `include` longtext NOT NULL,
  `website` varchar(50) NOT NULL,
  `productSku` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` varchar(45) DEFAULT 'CURRENT_TIMESTAMP',
  PRIMARY KEY (`id`),
  KEY `productSku_foreign_experiences_idx` (`productSku`),
  CONSTRAINT `productSku_foreign_experiences` FOREIGN KEY (`productSku`) REFERENCES `products` (`sku`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiences`
--

LOCK TABLES `experiences` WRITE;
/*!40000 ALTER TABLE `experiences` DISABLE KEYS */;
/*!40000 ALTER TABLE `experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `sku` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image` text,
  `visibility` tinyint(4) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `specialPrice` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sku`),
  UNIQUE KEY `sku_UNIQUE` (`sku`),
  KEY `category_id_idx` (`categoryId`),
  CONSTRAINT `categoryId_foreign_products` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Gourmet Restó','Para los paladares exigentes y amantes del buen comer. Un Memorie que permite disfrutar de maravillosas veladas acompañadas de platos exquisitos en los mejores restaurantes de Buenos Aires.','memories-gastro-gourmetresto.jpg',0,2999,2999,100,6,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(2,'Take Away','Una comida distinta para disfrutar en la comodidad de nuestro hogar. Desde platos elaborados hasta los clásicos argentinos. Los más amplios menús para que nadie se quede afuera.','memories-gastro-takeaway.jpg',0,1499,1499,100,6,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(3,'Buen Día','El equipo de Memories sabe que el desayuno es la comida más importante del día. Por ello decidimos acercarte esta opción para los fanáticos de las mañanas. Desayunos y tés en los mejores Cafés de la City, incluyendo la posibilidad de recibirlos a domicilio.','memories-gastro-buendia.jpg',0,1499,1499,100,6,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(4,'Fancy Cuisine','Este Memorie ofrece no solo ricas comidas, sino experiencias gastronómicas completas. Cenas o almuerzos completos de alto nivel en los restaurantes más reconocidos a nivel regional encontrados en Buenos Aires, que incluyen maravillosos en vivo.','memories-gastro-fancycuisine.jpg',0,7999,7999,100,6,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(5,'Street Food','Comida al paso en la ciudad que nunca duerme. Podrás acceder a los puestos y/o ferias de comidas más ricos y conocidos del momento. Experiencia ideal quienes les encante andar de paseo.','memories-gastro-streetfood.jpg',0,2599,2599,100,6,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(6,'Sabores del Mundo','Viajá a otro destino tan solo con el paladar. Acceda a restaurantes donde podrás conocer las artes culinarias de diferentes países. Comida mexicana, china, árabe y más. Degustá sabores y conocé culturas.','memories-gastro-saboresdelmundo.jpg',0,3499,3499,100,6,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(7,'Drinks','A veces la vida nos da tragos amargos. Por eso con esta Memorie te aseguramos unos tragos deliciosos. Encontrarán distintos tragos de autor para poder disfrutar de excelentes Cocktails para todos los gustos.','memories-gastro-drinks.jpg',0,2499,2499,100,6,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(8,'Chef at Home','Comida especialmente hecha para vos. Regalando este Memorie estamos regalando platos de calidad culinaria profesional, contando con la presencia de un chef pudiendo además disfrutar de un tour del detrás de escena de la cocina.','memories-gastro-invitaelchef.jpg',0,4199,4199,100,6,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(9,'Beer & Burger','Para quienes no saben, las artes culinarias porteñas han alcanzado niveles de altísima calidad y sabor en la cocina de burgers, volviéndose uno de los epicentros más conocidos de la región en el desarrollo de estas comidas. Por supuesto, acompañadas de la mejor birra artesanal.','memories-gastro-beerburger.jpg',0,1899,1899,100,6,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(10,'De Copas','Para los amantes del vino. Distintos tours de degustación por la Ciudad de Buenos Aires, conociendo las particularidades de cada cosecha y copa.','memories-gastro-decopas.jpg',0,1899,1899,100,6,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(11,'Wine Life','Para propios y ajenos. Disfruten de experiencias tranquilas y dinámicas en la degustación de vinos. Diferentes cosechas, sabores y sensaciones. Tanto para quien se encuentren en el mundo del vino como para quien esté interesado en adentrase.','memories-gastro-winelife.jpg',0,1899,1899,100,6,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(12,'Bodegones','Visitemos los lugares que vieron crecer a la ciudad, o que mejor dicho, crecieron a la par. Los bodegones más antiguos, con comidas sabrosas y sus ambientaciones originales. Memories los invita a conocer su historia.','memories-gastro-bodegones.jpg',0,2999,2999,100,6,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(13,'Veggie','Ideal para todos y todas. Con este Memorie en mano podrán acceder a los distintos restaurantes veganos cuyo nombre pisa con fuerza en la gastronomía porteña. Disfruten de los mejores y más saludables platos.','memories-gastro-veggie.jpg',0,1899,1899,100,6,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(14,'Relax','Regalá un mimo, regalá un descanso. Un día para encontrar la calma y dejar de lado el ritmo de la semana. Desde masajes hasta los mejores tratamientos corporales.','memories-bienestar-relax.jpg',0,2199,2199,100,2,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(15,'How You Look','Para quienes amen el maquillaje y la estética facial. Podrán encontrar distintas clases de automaquillaje dictadas por profesionales del ambiente, cada una con sus distintas técnicas.','memories-bienestar-makeup.jpg',0,1299,1299,100,2,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(16,'Paz y Armonía','Distenderse. Desconectarse. Sumergirse en una tranquilidad absoluta de diferentes maneras. Una agradable combinación entre salud y bienestar.','memories-bienestar-pazyarmonia.jpg',0,3499,3499,100,2,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(17,'De a Dos','Experiencias agradables, tranquilas y llevaderas para tener de a dos. Ideal para parejas y amigos. Abarca distintas actividades, desde días de campo hasta días de spa.','memories-bienestar-deados.jpg',0,4999,4999,100,2,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(18,'Cambio de Aire','Fines de semana enteros en otras latitudes. Regalá un cambio de aire, un fin de semana off. Relajate, divertite, caminá y recordá. Playa, montañas y sierras. Elegí donde desconectarte.','memories-escapadas-cambiodeaire.jpg',0,4199,4199,100,5,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(19,'Finde','Hoteles y estancias para los mejores fines de semana','memories-escapadas-finde.jpg',0,9999,9999,100,5,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(20,'Exótico','Diferentes experiencias distintas a las convencionales. Escapadas con las cuales podrás vivir momentos exóticos y únicos','memories-escapadas-exotico.jpg',0,7999,7999,100,5,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(21,'Deluxe','Fines de semana completos en los mejores Hoteles Boutique de la Costa Atlántica. Disfrutá de la playa pero no esperes al verano. Opciones en Pinamar, Cariló, Mar del Plata y Villa Gessel.','memories-escapadas-luxury.jpg',0,12999,12999,100,5,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(22,'Show Time','¿Ser o no ser? La Avenida Corrientes es internacionalmente conocida por sus sendos teatros, por ello desde el equipo de Memories creemos indispensable su inclusión en esta categoría. Obras espectaculares con los actores y las actrices más renombrados. Noches llenas de talento.','memories-entretenimiento-showtime.jpg',0,3099,3099,100,4,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(23,'Música para Soñar','La música transmite cientos de emociones. Regalá música. Con este Memorie podrás acceder a distintas experiencias musicales, desde orquestas hasta conciertos, inclusive festivales.','memories-entretenimiento-musicaparasoñar.jpg',0,4199,4199,100,4,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(24,'L\'Art','Para los amantes del arte. Experiencias donde podrán tomar nota de las mejores obras y exposiciones en las distintas galerías y museos de Buenos Aires, una de las capitales culturales más conocidas del mundo.','memories-entretenimiento-lart.jpg',0,2099,2099,100,4,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(25,'Stand-uperos','Dicen que quien ríe último, ríe mejor. Profesionales de la comedia desmienten esta afirmación. Quien ríe último no entendió el chiste. En este Memorie encontrarás veladas llenas de risas y alegría. Regalá lindos recuerdos, regalá risas.','memories-entretenimiento-standup.jpg',0,999,999,100,4,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(26,'Vértigo','Adrenalina. Emoción. Desafiá tus límites. Disfrutá de momentos de alto impacto. Ponete a prueba y superá tus miedos. Rafting, paracaidismo, parapente y más.','memories-aventura-vertigo.jpg',0,3999,3999,100,1,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(27,'En el Aire','¿Quien no soñó alguna vez con la posibilidad de volar? En Memories lo hacemos realidad. Accedé a las mejores excursiones que te permitirán volar por un rato. Regalá alas, regalá Memories.','memories-aventura-enelaire.jpg',0,7999,7999,100,1,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(28,'Escalando','La vida es cuesta arriba, por eso en Memories incluimos estas experiencias, para que veas que tan alto podés llegar. Con experiencias supervisadas pone a prueba tu resistencia y no pares de subir.','memories-aventura-escalando.jpg',0,6499,6499,100,1,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(29,'Splash','Para los amantes del agua. Con este Memorie accederán a excursiones donde podrán sumergirse por completo. Experiencias en bote, gomón y hasta buceo. Ustedes eligen que tan hondo llegar.','memories-aventura-splash.jpg',0,5499,5499,100,1,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(30,'Para la Cámara','Aprende técnicas únicas para poder sacar las mejores fotografías y grabar los videos más impresionantes. Algunos de ellos requieren cámara profesional, otros nos enseñan a utilizar al máximo el potencial fotográfico de nuestros equipos móviles.','memories-cursos-paralacamara.jpg',0,2499,2499,100,3,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(31,'Chef en Casa','Cursos prácticos y divertidos, luego de los cuales se podrán llevar lo que hayan cocinado. Aprender y comer, dos de los placeres de la vida reunidos en cualquiera de las opciones que encontrarán debajo.','memories-cursos-chefcasa.jpg',0,1999,1999,100,3,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20'),(32,'Diseño','Cursos llenos de teoría y práctica donde aprenderás de diseño en sus distintos enfoques. Diseño digital, Ilustración, diseño de marca, diseño gráfico y más. Dictados por expertos en la materia.','memories-cursos-diseno.jpg',0,1999,1999,100,3,'2020-08-10 20:30:20','2020-08-10 20:30:20','2020-08-10 20:30:20');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `totalAmount` int(11) DEFAULT NULL,
  `paymentMethod` tinyint(4) DEFAULT NULL,
  `shippingMethod` tinyint(4) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cart_id_foreign_idx` (`cart_id`),
  CONSTRAINT `cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` text,
  `photo` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Sebastian','Navarro','sebastian.navarro87@gmail.com','$2b$10$ob2eBIr7KRyct/S/yqYJEOljvEBe5CVGz1nAtLqrfoBJPuarv8EPW','sebas.jpg','2020-08-10 17:54:16','2020-08-10 17:54:16','2020-08-10 17:54:16'),(2,'Facundo','Ruiz','facu-ru@hotmail.com','$2b$10$BTJcA/hLojYdjq5vIyXH3eyF1csSTBJm.YtuuSTKd/v.3Mtr6d38.','facu.jpg','2020-08-10 17:54:16','2020-08-10 17:54:16','2020-08-10 17:54:16'),(3,'Nicolas','Caballero','niicolas.caballero@gmail.com','$2b$10$maSd/RIp52/FWksal.FwTeTQo3JX86toKbvFU3STzOzVnvRWHjGY2','nicoPerfil.jpg','2020-08-10 17:54:16','2020-08-10 17:54:16','2020-08-10 17:54:16');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-11 16:30:58
