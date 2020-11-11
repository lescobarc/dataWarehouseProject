-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2020 a las 21:18:48
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
(1, 'Whatsapp'),
(2, 'Instagram'),
(3, 'Facebook'),
(4, 'Linkedin');

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
(18, 'Medellín', 53),
(19, 'Cali', 53);

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
(21, 'Softtek', 'cll 30 #67-22', 'softek@gmail.com5458796', 4568798, 15, 53, 19),
(23, 's', 's', 's', 0, 15, 53, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `region_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `position` varchar(50) NOT NULL,
  `interest` varchar(11) NOT NULL,
  `lastname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`contact_id`, `name`, `email`, `region_id`, `country_id`, `city_id`, `company_id`, `position`, `interest`, `lastname`) VALUES
(77, 'a', 'a', 15, 53, 18, 21, 'a', '0%', 'a'),
(78, 'v', 'v', 15, 53, 18, 21, 'v', '0%', 'v');

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
(46, 'Japon', 8),
(53, 'Colombia', 15);

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
(2, 'Norteamérica'),
(8, 'Asia'),
(14, 'África'),
(15, 'Suramérica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `repass` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `username`, `pass`, `repass`, `isAdmin`) VALUES
(4, 's', 's', 's', 's', 's', 0),
(6, 'f', 'f', 'ss', 's', 's', 0),
(11, 'dfgh', 'jj', 'hgh', '1', '1', 0),
(12, 't', 't', 't', 't', 't', 0),
(13, 'admin', 'admin@hotmail.com', 'admin', '1234', '1234', 1),
(14, 'a', 'a', 'a', 'a', 'a', 0);

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
  MODIFY `channel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `companies`
--
ALTER TABLE `companies`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT de la tabla `contacts_channels`
--
ALTER TABLE `contacts_channels`
  MODIFY `contact_channel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `regions`
--
ALTER TABLE `regions`
  MODIFY `region_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
