-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-11-2024 a las 06:00:46
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
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `contacto_principal` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `industria` varchar(255) DEFAULT NULL,
  `webpage` varchar(255) DEFAULT NULL,
  `actualizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`empresa_id`, `nombre`, `direccion`, `telefono`, `contacto_principal`, `email`, `password`, `descripcion`, `industria`, `webpage`, `actualizacion`) VALUES
(1, 'Compliance Eng. serv.', NULL, NULL, NULL, NULL, NULL, 'Empresa dedicada a la tecnología', 'Tecnología', 'https://www.empresaxyz.com', '2024-10-28 04:30:37'),
(2, 'Arcor', NULL, NULL, NULL, NULL, NULL, 'Empresa de golosinas', 'Consumible', 'arcor.com.ar', '2024-10-28 14:24:25'),
(3, 'Tech Solutions', '123 Calle Principal, Ciudad Tecnológica', '+54 9 1234 567890', 'Carlos Pérez', 'contacto@techsolutions.com', 'segura123', 'Empresa especializada en soluciones de tecnología avanzada', 'Tecnología', 'https://www.techsolutions.com', '2024-10-28 15:29:22'),
(4, 'Pepa soluciones', '123 Calle secu, Ciudad', '+1234567890', 'Juan Pérez', 'contacto@techsolutions.com', 'contraseñaSegura123', 'Empresa dedicada a soluciones tecnológicas', 'Tecnología', 'https://www.techsolutions.com', '2024-11-07 01:45:36');

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

INSERT INTO `ofertas` (`oferta_id`, `titulo`, `descripcion`, `modalidad`, `requisitos`, `localidad`, `actualizacion`) VALUES
(2, 'Desarrollador Backend', 'Responsable de desarrollar la API', '', 'Conocimiento en Node.js y MySQL', 'virtual', '2024-10-28 05:17:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `email`, `password`, `created_at`, `image`) VALUES
(1, 'juan.perez@example.com', '$2b$10$HkV6aLpX9bQDX4IqsdIOROpr5MTcVb3B4oAyF1mDQbWiWK96XZ4Wu', '2024-10-28 19:51:02', NULL),
(3, 'josecontreras@example.com', '$2b$10$xLTgKXLeOHsZscG.pa3X6uLjltAgbWmq1FeG1VHynsvXmB/Uoqk1K', '2024-10-28 19:52:15', NULL),
(4, 'barrios@gmail.com', '$2b$10$DPZJ/cHsYD0qPC2zzIRE0e1oxyn9cgOIZnktcpHiMNQcxvD47QBJq', '2024-11-07 03:55:04', NULL),
(9, 'mansilla_223@hotmail.com', '$2a$08$aXnCQRphUBpwKD2iRmQAUerjr0Hq5lQ0BcKFM1084RoSeX6qITcDO', '2024-11-11 09:09:47', NULL),
(10, 'joseph@gmail.com', '$2a$08$eumNW9j75kYP8Kup98S1DuV6HeXxt2pvYkY1iPi6m7L.cGOWqpc.W', '2024-11-12 04:58:37', '/uploads/1731387517120-485181329-foto.png');

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
  ADD PRIMARY KEY (`oferta_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `empresa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `estudiante_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `evento_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `mensaje_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `oferta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
