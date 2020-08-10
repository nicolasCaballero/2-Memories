INSERT INTO adminuser (id, name, username, email, password, role, photo, createdAt, updatedAt) VALUES
(DEFAULT,'Sebastian','snavarro','sebastian.navarro87@gmail.com','$2b$10$ob2eBIr7KRyct/S/yqYJEOljvEBe5CVGz1nAtLqrfoBJPuarv8EPW',1,'sebas.jpg',NOW(),NOW()),
(DEFAULT,'Facundo','fruiz','facu-ru@hotmail.com','$2b$10$BTJcA/hLojYdjq5vIyXH3eyF1csSTBJm.YtuuSTKd/v.3Mtr6d38.',1,'facu.jpg',NOW(),NOW()),
(DEFAULT,'nicolas','ncaballero','niicolas.caballero@gmail.com','$2b$10$dOcfUFyHoYgVwUg7UzJLM.q59aUjHpPAMinsNg4Ajw2zA18FBmXRy',2,'nico.jpg',NOW(),NOW()),
(DEFAULT,'DHFullAdmin','dhfulladmin','dhfulladmin@test.com','$2b$10$gnBduGLx9Dh4NCEBkBsHEOKgjCMx6N1SIfkDShUm2Y9xweYi/DWXK',1,'digitalhouse.jpg',NOW(),NOW()),
(DEFAULT,'DHBasicUser','dhbasicuser','dhbasicuser@test.com','$2b$10$7ObeyBkXaWYj2p/XkR/6cuksCmI0m3zAR7my62jxyMDsfbpJk.ERC',2,'digitalhouse.jpg',NOW(),NOW());
INSERT INTO categories (id, name, image, visibility) VALUES
(DEFAULT,'aventura','aventura.jpg','enabled'),
(DEFAULT,'bienestar','bienestar.jpg','enabled'),
(DEFAULT,'cursos','cursos.jpg','enabled'),
(DEFAULT,'entretenimiento','entretenimiento.jpg','enabled'),
(DEFAULT,'escapadas','escapadas.jpg','enabled'),
(DEFAULT,'gastronomia','gastronomia.jpg','enabled');
INSERT INTO users (id, name, lastName, email, password, photo) VALUES
(DEFAULT,'Sebastian','Navarro','sebastian.navarro87@gmail.com','$2b$10$ob2eBIr7KRyct/S/yqYJEOljvEBe5CVGz1nAtLqrfoBJPuarv8EPW','sebas.jpg'),
(DEFAULT,'Facundo','Ruiz','facu-ru@hotmail.com','$2b$10$BTJcA/hLojYdjq5vIyXH3eyF1csSTBJm.YtuuSTKd/v.3Mtr6d38.','facu.jpg'),
(DEFAULT,'Nicolas','Caballero','niicolas.caballero@gmail.com','$2b$10$maSd/RIp52/FWksal.FwTeTQo3JX86toKbvFU3STzOzVnvRWHjGY2','nicoPerfil.jpg');
