CREATE SCHEMA `memories_db` ;
CREATE TABLE `memories_db`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `image` TEXT NULL,
  `visibility` TINYINT NULL,
  `product_sku` int(11) DEFAULT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_sku_foreign_idx` (`product_sku`),
  CONSTRAINT `product_sku_foreign` FOREIGN KEY (`product_sku`) REFERENCES `memories_db`.`products` (`sku`) ON DELETE NO ACTION ON UPDATE NO ACTION);
CREATE TABLE `memories_db`.`products` (
  `sku` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(100) NULL,
  `image` TEXT NULL,
  `visibility` TINYINT NULL,
  `price` INT NULL,
  `special_price` INT NULL,
  `qty` INT NULL,
  `category_id` INT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sku`),
  INDEX `category_id_idx` (`category_id` ASC),
  CONSTRAINT `category_id_foreign`
    FOREIGN KEY (`category_id`)
    REFERENCES `memories_db`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
CREATE TABLE `memories_db`.`experiences` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` LONGTEXT NULL,
  `image` LONGTEXT NULL,
  `include` LONGTEXT NULL,
  `website` VARCHAR(50) NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));
CREATE TABLE `memories_db`.`adminUser` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `username` VARCHAR(20) NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` TEXT NULL,
  `role` INT NULL,
  `photo` LONGTEXT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));
CREATE TABLE `memories_db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` TEXT NULL,
  `photo` TEXT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));
CREATE TABLE `memories_db`.`cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `product_sku` INT NULL,
  `price` INT NULL,
  `qty` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_foreign_idx` (`user_id` ASC),
  INDEX `product_sku_foreign_idx` (`product_sku` ASC),
  CONSTRAINT `user_id_foreign_cart`
    FOREIGN KEY (`user_id`)
    REFERENCES `memories_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `product_sku_foreign_cart`
    FOREIGN KEY (`product_sku`)
    REFERENCES `memories_db`.`products` (`sku`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
CREATE TABLE `memories_db`.`transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cart_id` INT NULL,
  `date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `totalAmount` INT NULL,
  `paymentMethod` TINYINT NULL,
  `shippingMethod` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `cart_id_foreign_idx` (`cart_id` ASC),
  CONSTRAINT `cart_id_foreign`
    FOREIGN KEY (`cart_id`)
    REFERENCES `memories_db`.`cart` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
