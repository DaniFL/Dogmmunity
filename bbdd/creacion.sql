CREATE TABLE avatares(
idAvatar TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT
) ENGINE = InnoDB;

CREATE TABLE usuarios(
nickname VARCHAR(30) PRIMARY KEY,
correo VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(100) NOT NULL,
nombre VARCHAR(50) NOT NULL,
apellidos VARCHAR(100) NOT NULL,
idAvatar TINYINT UNSIGNED DEFAULT 1,
CONSTRAINT fk_avatar FOREIGN KEY (idAvatar) REFERENCES avatares(idAvatar)
) ENGINE = InnoDB;

CREATE TABLE sesiones(
idSesion VARCHAR(255) PRIMARY KEY,
nickname VARCHAR(30) UNIQUE NOT NULL,
CONSTRAINT fk_nickname_sesion FOREIGN KEY (nickname) REFERENCES usuarios(nickname)
) ENGINE = InnoDB;

CREATE TABLE autenticaciones(
codAutenticacion CHAR(6) PRIMARY KEY,
nickname VARCHAR(30) UNIQUE NOT NULL,
instanteAutent TIMESTAMP NOT NULL,
autenticado ENUM('TRUE','FALSE') NOT NULL DEFAULT 'FALSE',
CONSTRAINT fk_nickname_autentication FOREIGN KEY (nickname) REFERENCES usuarios(nickname)
) ENGINE = InnoDB;