-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-11-2020 a las 19:37:32
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `datawarehouse`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `channels`
--

CREATE TABLE `channels` (
  `channel_id` int(11) NOT NULL,
  `nameChannel` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `channels`
--

INSERT INTO `channels` (`channel_id`, `nameChannel`) VALUES
(1, 'Facebook'),
(2, 'Instagram');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL,
  `nameCity` varchar(50) NOT NULL,
  `country_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`city_id`, `nameCity`, `country_id`) VALUES
(1, 'Medellín', 1),
(2, 'Cali', 1),
(3, 'Bogotá', 1),
(4, 'Armenia', 1),
(5, 'Buenos Aires', 2),
(6, 'Mendoza', 2),
(7, 'Córdoba', 2),
(8, 'Lima', 3),
(9, 'Arequipa', 3),
(10, 'Sao Paulo', 4),
(11, 'Fortaleza', 4),
(12, 'Valdivia', 5),
(13, 'Guadalajara', 6),
(14, 'Monterrey', 6),
(15, 'Montreal', 7),
(16, 'Madrid', 8),
(17, 'Barcelona', 8),
(18, 'París', 9),
(19, 'Hong Kong', 10),
(20, 'Santiago de Chile', 5),
(21, 'Toronto', 7),
(22, 'Lyon', 9),
(23, 'Wuhan', 10),
(24, 'Tokio', 11),
(25, 'Yokohama', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companies`
--

CREATE TABLE `companies` (
  `company_id` int(11) NOT NULL,
  `nameCompany` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tel` int(11) NOT NULL,
  `region_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `companies`
--

INSERT INTO `companies` (`company_id`, `nameCompany`, `address`, `email`, `tel`, `region_id`, `country_id`, `city_id`) VALUES
(1, 'Softtek', 'cll 78 #45-89', 'softtek@gmail.com', 4587963, 1, 6, 14),
(2, 'Globant', 'cll 90 #45-89', 'globant@hotmail.com', 6987456, 1, 2, 5),
(3, 'Rappi', 'cll 89 # 56-54', 'rappi@yahoo.com', 4789632, 1, 1, 1),
(4, 'Mercadolibre', 'cll 65 #45-98', 'mercadolibre@gmail.com', 4589632, 1, 2, 6),
(5, 'Olx', 'cll 67 # 45-89', 'olx@hotmail.com', 4589632, 2, 6, 14),
(6, 'Acámica', 'cll 67 #54-32', 'acamica@gmail.com', 1259874, 1, 2, 6),
(7, 'Ibermática', 'cll 76 #23-54', 'ibermatica@gmail.com', 45796821, 3, 8, 17),
(8, 'T-Systems', 'cll 67 #12-34', 'tsystems@yahoo.com', 24875698, 3, 9, 18),
(9, 'Xiaomi', 'cll 54 #42-78', 'xiamo@hotmail.com', 1547862, 4, 10, 19),
(10, 'Tencent', 'cll 45 #42-98', 'tencent', 46987236, 4, 10, 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `region_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `position` varchar(50) NOT NULL,
  `interest` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`contact_id`, `name`, `lastname`, `email`, `address`, `region_id`, `country_id`, `city_id`, `company_id`, `position`, `interest`) VALUES
(1, 'Andrea', 'Aristizábal', 'andreaz@gmail.com', 'cll 45 #67 -87', 4, 10, 19, 2, 'Developer', 100),
(2, 'Camila', 'Diaz', 'camilad2@hotmail.com', 'cll 65 #54-98', 3, 9, 18, 7, 'Developer', 100),
(3, 'Diego', 'Durango', 'diego7@gmail.com', 'cll 65 #40-60', 3, 8, 17, 4, 'Product', 75),
(4, 'Ernesto', 'Fernández', 'ernestof@gmail.com', 'cll 98 #32-47', 2, 6, 14, 3, 'Product', 75),
(5, 'Hector', 'González', 'hectorgo@yahoo.com', 'cll 21 #23-99', 1, 2, 7, 8, 'Product', 75),
(6, 'Julia', 'Lopez', 'julialop@hotmail.com', 'cll 09 #09-89', 1, 4, 10, 10, 'Sales', 50),
(7, 'Verónica', 'Penagos', 'vero5@gmail.com', 'cll 12 #12-12', 1, 1, 1, 9, 'UX Designer', 25),
(8, 'Felipe', 'Perez', 'felipe@gmail.com', 'cll 78 #98-10', 2, 6, 13, 7, 'UX Designer', 25),
(9, 'Lorena', 'Páez', 'lorepaez@gmail.com', 'cll 12 #77-88', 3, 9, 18, 1, 'Product', 25),
(10, 'Valentina', 'Soto', 'valens@hotmail.com', 'cll 00 #89-34', 1, 3, 8, 6, 'Sales', 0),
(11, 'Catalia', 'Silva', 'catasv@gmail.com', 'cll 30 #67-89', 1, 1, 1, 1, 'Developer', 100),
(12, 'Isabel', 'Restrepo', 'isares@hotmail.com', 'cll 66 #67 - 87', 1, 1, 2, 2, 'Sales', 75),
(13, 'Pablo', 'Serna', 'pablos@yahoo.com', 'cll 10 #45-85', 1, 1, 3, 3, 'Sales', 50),
(14, 'Manuel', 'Vélez', 'manuelv@gmail.com', 'cll 80 #67 -80', 1, 1, 4, 4, 'UX Designer', 25),
(15, 'Lina', 'Polanía', 'linap@gmail.com', 'cll 70 #95-89', 1, 2, 5, 5, 'Developer', 0),
(16, 'Luisa', 'Linares', 'luisalin@hotmail.com', 'cll 77 #67 -87', 1, 2, 6, 6, 'Sales', 100),
(17, 'Camilo', 'Alarcón', 'camialarc@gmail.com', 'cll 80 #56-91', 1, 3, 8, 7, 'Developer', 25),
(18, 'Mateo', 'Arango', 'mateoar@gmail.com', 'cll 67 #11-77', 1, 3, 9, 8, 'UX Designer', 25),
(19, 'Tatiana', 'Henao', 'tatianah@yahoo.com', 'cll 15 #61-96', 1, 4, 10, 8, 'Sales', 100),
(20, 'Angélica', 'Bernal', 'angelicab@hotmail.com', 'cll 80 #67-74', 2, 7, 15, 6, 'Sales', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts_channels`
--

CREATE TABLE `contacts_channels` (
  `contact_channel_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `channel_id` int(11) NOT NULL,
  `account` varchar(50) NOT NULL,
  `preferences` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacts_channels`
--

INSERT INTO `contacts_channels` (`contact_channel_id`, `contact_id`, `channel_id`, `account`, `preferences`) VALUES
(1, 1, 1, 'andreaaristi', 'Sin Preferencia'),
(2, 1, 2, 'andrea1', 'Canal Favorito'),
(3, 2, 1, 'camidiaz', 'No Molestar'),
(4, 2, 2, 'camidi2', 'Canal Favorito'),
(5, 3, 1, 'diegodurango', 'Sin Preferencia'),
(6, 3, 2, 'diego2', 'No Molestar'),
(7, 4, 1, 'ernesto3', 'No Molestar'),
(8, 4, 2, 'ernestofer', 'Sin Preferencia'),
(9, 5, 1, 'hector5', 'Canal Favorito'),
(10, 5, 2, 'hectorgonzalez', 'Sin Preferencia'),
(11, 6, 1, 'julialopez', 'No Molestar'),
(12, 6, 2, 'julialopez99', 'Canal Favorito'),
(13, 7, 1, 'veropen', 'No Molestar'),
(14, 7, 2, 'veronica77', 'Canal Favorito'),
(15, 8, 1, 'felipeperez', 'No Molestar'),
(16, 8, 2, 'felipe54', 'Canal Favorito'),
(17, 9, 1, 'lorenapaez3', 'No Molestar'),
(18, 9, 2, 'lorena43', 'Sin Preferencia'),
(19, 10, 1, 'valensoto', 'Sin Preferencia'),
(20, 10, 2, 'valensoto66', 'No Molestar'),
(21, 11, 1, 'catasilva', 'Canal Favorito'),
(22, 11, 2, 'catasilva62', 'No Molestar'),
(23, 12, 1, 'isarestrepo4', 'Sin Preferencia'),
(24, 12, 2, 'isabelr78', 'No Molestar'),
(25, 13, 1, 'pabloserna12', 'Sin Preferencia'),
(26, 13, 2, 'pablos456', 'No Molestar'),
(27, 14, 1, 'manuelvelez4', 'Canal Favorito'),
(28, 14, 2, 'manuelv987', 'No Molestar'),
(29, 15, 1, 'linapolania00', 'Sin Preferencia'),
(30, 15, 2, 'linapp98', 'No Molestar'),
(31, 16, 1, 'luisalinares3', 'No Molestar'),
(32, 16, 2, 'luisalin98', 'Sin Preferencia'),
(33, 17, 1, 'camialarcon2', 'No Molestar'),
(34, 17, 2, 'camilo44', 'Sin Preferencia'),
(35, 18, 1, 'mateoarango3', 'No Molestar'),
(36, 18, 2, 'mateoarg', 'Canal Favorito'),
(37, 19, 1, 'tatihenao76', 'No Molestar'),
(38, 19, 2, 'tatiana78965', 'No Molestar'),
(39, 20, 1, 'angelica20', 'Sin Preferencia'),
(40, 20, 2, 'agelicab', 'No Molestar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `country_id` int(11) NOT NULL,
  `nameCountry` varchar(50) NOT NULL,
  `region_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`country_id`, `nameCountry`, `region_id`) VALUES
(1, 'Colombia', 1),
(2, 'Argentina', 1),
(3, 'Perú', 1),
(4, 'Brasil', 1),
(5, 'Chile', 1),
(6, 'México', 2),
(7, 'Canadá', 2),
(8, 'España', 3),
(9, 'Francia', 3),
(10, 'China', 4),
(11, 'Japón', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regions`
--

CREATE TABLE `regions` (
  `region_id` int(11) NOT NULL,
  `nameRegion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `regions`
--

INSERT INTO `regions` (`region_id`, `nameRegion`) VALUES
(1, 'Suramérica'),
(2, 'Norteamérica'),
(3, 'Europa'),
(4, 'Asia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `repass` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `name`, `lastname`, `email`, `username`, `pass`, `repass`, `isAdmin`) VALUES
(1, 'admin', 'admin', 'admin@hotmail.com', 'admin', '1234', '1234', 1),
(2, 'Carlos', ' Bermúdez', 'carlosb@hotmail.com', 'carlosb', '4567', '4567', 1),
(3, 'Liliana ', 'Henao', 'lilih@hotmail.com', 'lilih', '6789', '6789', 0),
(4, 'María ', 'Toro', 'mariat8@gmail.com', 'mari', '1234', '1234', 0),
(5, 'Luisa ', 'Ocampo', 'luisao4@yahoo.com', 'luisaoc', '5432', '5432', 0),
(6, 'Nicolás', 'Romanov', 'nicolas@gmail.com', 'nicor', '4569', '4569', 0),
(7, 'Pedro ', 'Parker', 'pedro13@hotmail.com', 'peter', '789', '789', 0),
(8, 'Valeria ', 'Zapata', 'valeri@gmail.com', 'vale5', '1234', '1234', 0),
(9, 'Laura ', 'Salazar', 'lauras@yahoo.com', 'lauras', '546', '546', 0),
(10, 'Tomás', ' Velez', 'tomas@hotmail.com', 'tomy', '456', '456', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`channel_id`),
  ADD KEY `channel_id` (`channel_id`);

--
-- Indices de la tabla `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indices de la tabla `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_id`),
  ADD KEY `region_id` (`region_id`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `region_id` (`region_id`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indices de la tabla `contacts_channels`
--
ALTER TABLE `contacts_channels`
  ADD PRIMARY KEY (`contact_channel_id`),
  ADD KEY `contact_id` (`contact_id`),
  ADD KEY `channel_id` (`channel_id`),
  ADD KEY `contact_channel_id` (`contact_channel_id`);

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`country_id`),
  ADD KEY `region_id` (`region_id`);

--
-- Indices de la tabla `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`region_id`),
  ADD KEY `region_id` (`region_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `channels`
--
ALTER TABLE `channels`
  MODIFY `channel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `companies`
--
ALTER TABLE `companies`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `contacts_channels`
--
ALTER TABLE `contacts_channels`
  MODIFY `contact_channel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `regions`
--
ALTER TABLE `regions`
  MODIFY `region_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `countries` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `company_city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `company_country` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `company_region` FOREIGN KEY (`region_id`) REFERENCES `regions` (`region_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contact_city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contact_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contact_country` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contact_region` FOREIGN KEY (`region_id`) REFERENCES `regions` (`region_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contacts_channels`
--
ALTER TABLE `contacts_channels`
  ADD CONSTRAINT `contacts_channels_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`contact_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contacts_channels_ibfk_2` FOREIGN KEY (`channel_id`) REFERENCES `channels` (`channel_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `countries`
--
ALTER TABLE `countries`
  ADD CONSTRAINT `region` FOREIGN KEY (`region_id`) REFERENCES `regions` (`region_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
