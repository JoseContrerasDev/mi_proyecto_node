-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-10-2024 a las 09:26:03
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `portal_empleo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `empresa_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `industria` varchar(255) DEFAULT NULL,
  `webpage` varchar(255) DEFAULT NULL,
  `actualizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`empresa_id`, `nombre`, `descripcion`, `industria`, `webpage`, `actualizacion`) VALUES
(1, 'Compliance Eng. serv.', 'Empresa dedicada a la tecnología', 'Tecnología', 'https://www.empresaxyz.com', '2024-10-28 04:30:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `estudiante_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `actualizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`estudiante_id`, `nombre`, `email`, `password`, `actualizacion`) VALUES
(2, 'Maga Profe', 'Maga.Profe@institucion.edu', '1234seguro', '2024-10-28 06:04:17'),
(3, 'Julio Profe', 'Julio.Profe@institucion.edu', '1234seguro', '2024-10-28 08:20:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `evento_id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_evento` date NOT NULL,
  `localidad` varchar(255) DEFAULT NULL,
  `organizador_id` int(11) DEFAULT NULL,
  `organizador_tipo` enum('company','admin') NOT NULL,
  `actualizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`evento_id`, `titulo`, `descripcion`, `fecha_evento`, `localidad`, `organizador_id`, `organizador_tipo`, `actualizacion`) VALUES
(1, 'Webinar de Desarrollo de Software', 'Evento sobre las últimas tendencias en desarrollo de software.', '2024-11-15', 'Online', 1, 'company', '2024-10-28 04:52:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `mensaje_id` int(11) NOT NULL,
  `remitente_id` int(11) NOT NULL,
  `tipo_remitente` enum('student','recruiter') NOT NULL,
  `receptor_id` int(11) NOT NULL,
  `tipo_receptor` enum('student','recruiter') NOT NULL,
  `contenido` text NOT NULL,
  `enviado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `leido` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`mensaje_id`, `remitente_id`, `tipo_remitente`, `receptor_id`, `tipo_receptor`, `contenido`, `enviado_en`, `leido`) VALUES
(1, 1, '', 2, '', 'Estoy interesado en la oferta laboral publicada.', '2024-10-28 04:57:01', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas`
--

CREATE TABLE `ofertas` (
  `oferta_id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `modalidad` enum('full-time','part-time','internship') NOT NULL,
  `requisitos` text DEFAULT NULL,
  `localidad` varchar(255) DEFAULT NULL,
  `actualizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ofertas`
--

INSERT INTO `ofertas` (`oferta_id`, `empresa_id`, `titulo`, `descripcion`, `modalidad`, `requisitos`, `localidad`, `actualizacion`) VALUES
(1, 1, '', '', '', NULL, NULL, '2024-10-28 05:00:38'),
(2, 1, 'Desarrollador Backend', 'Responsable de desarrollar la API', '', 'Conocimiento en Node.js y MySQL', 'virtual', '2024-10-28 05:17:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles_estudiantes`
--

CREATE TABLE `perfiles_estudiantes` (
  `perfil_id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `habilidades` text DEFAULT NULL,
  `intereses` text DEFAULT NULL,
  `disponibilidad` enum('full-time','part-time','internship') NOT NULL,
  `experiencia` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulaciones`
--

CREATE TABLE `postulaciones` (
  `postulacion_id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `oferta_id` int(11) NOT NULL,
  `carta_presentacion` text DEFAULT NULL,
  `cv_url` varchar(255) DEFAULT NULL,
  `estado` enum('pending','reviewed','accepted','rejected') DEFAULT 'pending',
  `fecha_postulacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`empresa_id`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`estudiante_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`evento_id`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`mensaje_id`);

--
-- Indices de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD PRIMARY KEY (`oferta_id`),
  ADD KEY `empresa_id` (`empresa_id`);

--
-- Indices de la tabla `perfiles_estudiantes`
--
ALTER TABLE `perfiles_estudiantes`
  ADD PRIMARY KEY (`perfil_id`),
  ADD KEY `estudiante_id` (`estudiante_id`);

--
-- Indices de la tabla `postulaciones`
--
ALTER TABLE `postulaciones`
  ADD PRIMARY KEY (`postulacion_id`),
  ADD KEY `estudiante_id` (`estudiante_id`),
  ADD KEY `oferta_id` (`oferta_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `empresa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `estudiante_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `evento_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `mensaje_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `oferta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `perfiles_estudiantes`
--
ALTER TABLE `perfiles_estudiantes`
  MODIFY `perfil_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `postulaciones`
--
ALTER TABLE `postulaciones`
  MODIFY `postulacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD CONSTRAINT `ofertas_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`empresa_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `perfiles_estudiantes`
--
ALTER TABLE `perfiles_estudiantes`
  ADD CONSTRAINT `perfiles_estudiantes_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`estudiante_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `postulaciones`
--
ALTER TABLE `postulaciones`
  ADD CONSTRAINT `postulaciones_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`estudiante_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `postulaciones_ibfk_2` FOREIGN KEY (`oferta_id`) REFERENCES `ofertas` (`oferta_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
