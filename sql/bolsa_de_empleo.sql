-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-10-2024 a las 07:58:54
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bolsa_de_empleo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleos`
--

CREATE TABLE `empleos` (
  `id_empleo` int(11) NOT NULL,
  `id_empleador` int(11) DEFAULT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  `tipo` enum('tiempo completo','medio tiempo','freelance','prácticas') NOT NULL,
  `salario` decimal(10,2) DEFAULT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id_mensaje` int(11) NOT NULL,
  `id_remitente` int(11) DEFAULT NULL,
  `id_destinatario` int(11) DEFAULT NULL,
  `contenido` text NOT NULL,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles_profesionales`
--

CREATE TABLE `perfiles_profesionales` (
  `id_perfil` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `experiencia` text DEFAULT NULL,
  `educacion` text DEFAULT NULL,
  `habilidades` text DEFAULT NULL,
  `idiomas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recomendaciones_empleo`
--

CREATE TABLE `recomendaciones_empleo` (
  `id_recomendacion` int(11) NOT NULL,
  `id_empleo` int(11) DEFAULT NULL,
  `id_recomendador` int(11) DEFAULT NULL,
  `id_recomendado` int(11) DEFAULT NULL,
  `fecha_recomendacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_empleo`
--

CREATE TABLE `solicitudes_empleo` (
  `id_solicitud` int(11) NOT NULL,
  `id_empleo` int(11) DEFAULT NULL,
  `id_candidato` int(11) DEFAULT NULL,
  `fecha_solicitud` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `rol` enum('empleador','candidato') NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `password`, `rol`, `createdAt`, `updatedAt`) VALUES
(147, 'Alejandro', 'De la espriella', 'example@gmail.com', '12345', 'empleador', '0000-00-00', '0000-00-00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleos`
--
ALTER TABLE `empleos`
  ADD PRIMARY KEY (`id_empleo`),
  ADD KEY `id_empleador` (`id_empleador`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id_mensaje`),
  ADD KEY `id_remitente` (`id_remitente`),
  ADD KEY `id_destinatario` (`id_destinatario`);

--
-- Indices de la tabla `perfiles_profesionales`
--
ALTER TABLE `perfiles_profesionales`
  ADD PRIMARY KEY (`id_perfil`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `recomendaciones_empleo`
--
ALTER TABLE `recomendaciones_empleo`
  ADD PRIMARY KEY (`id_recomendacion`),
  ADD KEY `id_empleo` (`id_empleo`),
  ADD KEY `id_recomendador` (`id_recomendador`),
  ADD KEY `id_recomendado` (`id_recomendado`);

--
-- Indices de la tabla `solicitudes_empleo`
--
ALTER TABLE `solicitudes_empleo`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD KEY `id_empleo` (`id_empleo`),
  ADD KEY `id_candidato` (`id_candidato`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleos`
--
ALTER TABLE `empleos`
  MODIFY `id_empleo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id_mensaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perfiles_profesionales`
--
ALTER TABLE `perfiles_profesionales`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `recomendaciones_empleo`
--
ALTER TABLE `recomendaciones_empleo`
  MODIFY `id_recomendacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitudes_empleo`
--
ALTER TABLE `solicitudes_empleo`
  MODIFY `id_solicitud` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleos`
--
ALTER TABLE `empleos`
  ADD CONSTRAINT `empleos_ibfk_1` FOREIGN KEY (`id_empleador`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`id_remitente`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`id_destinatario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `perfiles_profesionales`
--
ALTER TABLE `perfiles_profesionales`
  ADD CONSTRAINT `perfiles_profesionales_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `recomendaciones_empleo`
--
ALTER TABLE `recomendaciones_empleo`
  ADD CONSTRAINT `recomendaciones_empleo_ibfk_1` FOREIGN KEY (`id_empleo`) REFERENCES `empleos` (`id_empleo`),
  ADD CONSTRAINT `recomendaciones_empleo_ibfk_2` FOREIGN KEY (`id_recomendador`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `recomendaciones_empleo_ibfk_3` FOREIGN KEY (`id_recomendado`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `solicitudes_empleo`
--
ALTER TABLE `solicitudes_empleo`
  ADD CONSTRAINT `solicitudes_empleo_ibfk_1` FOREIGN KEY (`id_empleo`) REFERENCES `empleos` (`id_empleo`),
  ADD CONSTRAINT `solicitudes_empleo_ibfk_2` FOREIGN KEY (`id_candidato`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
