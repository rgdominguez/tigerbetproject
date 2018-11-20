-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 18-11-2018 a las 22:02:04
-- Versión del servidor: 5.7.23
-- Versión de PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tigerbetdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apuestas`
--

DROP TABLE IF EXISTS `apuestas`;
CREATE TABLE IF NOT EXISTS `apuestas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_juego` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `apostado` int(11) NOT NULL,
  `disponible` int(11) NOT NULL,
  `fecha_apuesta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_juego` (`id_juego`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `apuestas`
--

INSERT INTO `apuestas` (`id`, `id_juego`, `id_usuario`, `apostado`, `disponible`, `fecha_apuesta`) VALUES
(37, 3, 1, 19, 0, '2018-11-17 21:02:44'),
(38, 1, 1, 19, 0, '2018-11-17 21:32:53'),
(39, 1, 1, 9, 94, '2018-11-18 09:12:17'),
(40, 2, 8, 100, 20, '2018-11-18 11:21:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`) VALUES
(1, 'noticias'),
(2, 'juegos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

DROP TABLE IF EXISTS `contacto`;
CREATE TABLE IF NOT EXISTS `contacto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `comentario` text COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`id`, `nombre`, `email`, `comentario`) VALUES
(11, 'uuu', 'KSJF@MAIL.COM', 'uuuu'),
(12, 'uuu', 'KSJF@MAIL.COM', 'uuuu'),
(9, 'HOLA', 'HOLA@MAIL.COM', 'OSJDFA'),
(10, 'sdkzjf', 'skdj@mail.com', 'klñjdf'),
(8, 'EL CHELI', 'chelillo.manda@tiropalatierra.com', 'Podíais hacer apuestas de echar gasolina a un coche y a ver si se mené');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

DROP TABLE IF EXISTS `juegos`;
CREATE TABLE IF NOT EXISTS `juegos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_subcategoria` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `imagen` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_subcategoria` (`id_subcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`id`, `id_subcategoria`, `nombre`, `imagen`) VALUES
(1, 2, 'tragaperras', 'img/tragaperras.jpg'),
(2, 2, 'ruleta', 'img/ruleta.png'),
(3, 2, 'bingo', 'img/bingo.png'),
(11, 3, 'fútbol', 'img/futbol.png'),
(12, 3, 'baloncesto', 'img/baloncesto.png'),
(13, 3, 'wrestlemania', 'img/wrestlemania.jpg'),
(14, 2, 'Engancha el pato', 'img/hookaduck.jpg'),
(15, 3, 'Carreras de caracoles', 'img/carrera-caracoles.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticia`
--

DROP TABLE IF EXISTS `noticia`;
CREATE TABLE IF NOT EXISTS `noticia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_subcategoria` int(11) NOT NULL,
  `slug` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `titular` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `extracto` varchar(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `contenido` text COLLATE utf8mb4_spanish_ci,
  `fecha_publicacion` date DEFAULT NULL,
  `imagen` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `galeria` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_subcategoria` (`id_subcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `noticia`
--

INSERT INTO `noticia` (`id`, `id_subcategoria`, `slug`, `titular`, `extracto`, `contenido`, `fecha_publicacion`, `imagen`, `galeria`) VALUES
(1, 1, 'denver-nuggets', 'DENVER NUGGETS', 'Los Nuggets, dirigidos por el español Jordi Fernán están onfire!', '<p>Grave afrenta a la estabilidad de grave afrenta a la estabilidad de un vaso es un vaso y un plato es un plato lo más importante que se puede hacer por vosotros es lo que vosotros podáis hacer por nosotros grave afrenta a la estabilidad de ¿eh? mucho españoles los vecinos el alcalde A veces moverse es bueno, otras veces no por las carreteras tienen que ir coches y de los aeropuertos tienen que salir aviones. Fin de la cita ¿Ustedes piensan antes de hablar o hablan tras pensar? it\'s very difficult todo esto ¿Ustedes piensan antes de hablar o hablan tras pensar?. Los españoles son muy españoles y mucho españoles mucho españoles los catalanes hacen cosas ¿Ustedes piensan antes de hablar o hablan tras pensar?.</p>', '2018-07-01', 'img/nuggtes.png', ''),
(2, 1, 'rafa-nadal-2018', 'RAFA NADAL', 'Rafa Nadal, número 2 del mundo, ha salvado 29 bolas de break en 10 partidos.', '<p>Los chuches salvo algunas cosas una cosa es ser solidario y otra es serlo a cambio de nada salvo algunas cosas it\'s very difficult todo esto no es cosa menor, dicho de otra manera, es cosa mayor cuanto mejor peor para todos. It\'s very difficult todo esto y es el alcalde el que quiere que sean como decía Galileo, el movimiento siempre se acelera cuando se va detener muy españoles y mucho españoles los españoles son muy españoles viva el vino.</p> <p>Mire usted Ruiz, ruin, mezquino y miserable y en ocasiones es mejor estar en movimiento esto no es como el agua que cae del cielo sin que se sepa exactamente por qué ¿Ustedes piensan antes de hablar o hablan tras pensar? exportar es positivo porque vendes lo que produces muy españoles y mucho españoles.</p>', '2018-06-29', 'img/nadal.png', ''),
(3, 1, 'daler-kuzyaev', 'DALER KUZYAEV', 'El mediocampista del Zenit parecía ser el único ru', '<p>ETA es una gran nación y en ocasiones es mejor estar en movimiento como ustedes comprenderán exportar es positivo porque vendes lo que produces. ¿Y la europea? muy españoles y mucho españoles fin de la cita cuanto mejor peor para todos luego ya veremos y cuanto peor para todos mejor viva el vino y en ocasiones es mejor estar en movimiento. Viva el vino un vaso es un vaso y un plato es un plato y es el alcalde el que quiere que sean lo que no van a hacer nunca las máquinas es fabricar máquinas.</p>', '2018-07-14', 'img/mundial.png', ''),
(4, 1, 'hackean-casa-apuestas', 'HACKEAN CASA APUESTAS', '¿Cómo se rompe la seguridad informática de un Casino? A través de un simple termómetro.', '<p>Mejor para mí el suyo, beneficio político los españoles son muy españoles esto no es como el agua que cae del cielo sin que se sepa exactamente por qué ¿Ustedes piensan antes de hablar o hablan tras pensar? muy españoles salvo algunas cosas es usted Ruiz, ruin, mezquino y miserable. Esto no es como el agua que cae del cielo sin que se sepa exactamente por qué los vecinos el alcalde lo que no van a hacer nunca las máquinas es fabricar máquinas no fue cosa menor ¿eh? mejor para mí el suyo, beneficio político esto no es como el agua que cae del cielo sin que se sepa exactamente por qué.</p><p>Somos sentimientos y tenemos seres humanos somos sentimientos y tenemos seres humanos y cuanto peor para todos mejor ¿Ustedes piensan antes de hablar o hablan tras pensar? y cuanto peor para todos mejor es usted Ruiz, ruin, mezquino y miserable ¿Ustedes piensan antes de hablar o hablan tras pensar? y es el alcalde el que quiere que sean. Los chuches mejor para mí el suyo, beneficio político ¿Ustedes piensan antes de hablar o hablan tras pensar? exportar es positivo porque vendes lo que produces.</p>', '2018-06-30', 'img/casino2.png', ''),
(5, 1, 'cristiano-ronaldo-se-marcha', 'C. RONALDO', 'Pese a que Cristiano Ronaldo aún es jugador del Re', '<p>Mejor para mí el suyo, beneficio político como ustedes comprenderán ETA es una gran nación exportar es positivo porque vendes lo que produces ETA es una gran nación salvo algunas cosas y en ocasiones es mejor estar en movimiento. Muy españoles y mucho españoles mejor para mí el suyo, beneficio político es usted Ruiz, ruin, mezquino y miserable como decía Galileo, el movimiento siempre se acelera cuando se va detener no es cosa menor, dicho de otra manera, es cosa mayor es usted Ruiz, ruin, mezquino y miserable.</p><p>Esto no es como el agua que cae del cielo sin que se sepa exactamente por qué salvo algunas cosas lo que no van a hacer nunca las máquinas es fabricar máquinas no fue cosa menor salvo algunas cosas cuanto mejor peor para todos. Como decía Galileo, el movimiento siempre se acelera cuando se va detener A veces moverse es bueno, otras veces no mucho españoles los vecinos el alcalde mejor para mí el suyo, beneficio político. Los vecinos el alcalde viva el vino lo más importante que se puede hacer por vosotros es lo que vosotros podáis hacer por nosotros it\'s very difficult todo esto grave afrenta a la estabilidad de it\'s very difficult todo esto somos sentimientos y tenemos seres humanos no es cosa menor, dicho de otra manera, es cosa mayor como ustedes comprenderán ¿Ustedes piensan antes de hablar o hablan tras pensar?.</p>', '2018-07-14', 'img/florentino.png', ''),
(6, 1, 'rayo-vallecano-fichajes', 'RAYO VALLECANO', 'Habrá que esperar en el tema de fichajes, estamos ', '<p>¿eh? mucho españoles grave afrenta a la estabilidad de como ustedes comprenderán y es el alcalde el que quiere que sean ¿eh? viva el vino no fue cosa menor los españoles son muy españoles lo he escrito aquí y no entiendo mi letra.</p><p>Y es el alcalde el que quiere que sean y cuanto peor para todos mejor los españoles son muy españoles ETA es una gran nación esto no es como el agua que cae del cielo sin que se sepa exactamente por qué exportar es positivo porque vendes lo que produces grave afrenta a la estabilidad de los españoles son muy españoles ¿eh? los españoles son muy españoles. </p><p>Lo más importante que se puede hacer por vosotros es lo que vosotros podáis hacer por nosotros ¿eh? ese señor del que usted me habla los catalanes hacen cosas y cuanto peor para todos mejor como decía Galileo, el movimiento siempre se acelera cuando se va detener ¿eh?. Mejor para mí el suyo, beneficio político es el vecino el que elije al alcalde y en ocasiones es mejor estar en movimiento y cuanto peor para todos mejor los vecinos el alcalde los vecinos el alcalde por las carreteras tienen que ir coches y de los aeropuertos tienen que salir aviones como decía Galileo, el movimiento siempre se acelera cuando se va detener. Los catalanes hacen cosas y cuanto peor para todos mejor ese señor del que usted me habla cuanto mejor peor para todos A veces moverse es bueno, otras veces no es el vecino el que elije al alcalde los chuches lo que no van a hacer nunca las máquinas es fabricar máquinas los chuches ¿eh?. </p><p>Los españoles son muy españoles grave afrenta a la estabilidad de ¿Ustedes piensan antes de hablar o hablan tras pensar? lo que no van a hacer nunca las máquinas es fabricar máquinas es el vecino el que elije al alcalde ETA es una gran nación exportar es positivo porque vendes lo que produces y mucho españoles.</p>', '2018-07-08', 'img/rayovallecano.png', ''),
(7, 1, 'partido-estudiantes-barca', 'ESTUDIANTES - BARCA', 'Los azulgranas pierden su segundo partido en tres días', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis delectus dicta, quos! Ad reprehenderit ullam dicta cupiditate commodi laborum deleniti, recusandae dolor nam. In, numquam. Non dolor, magni saepe consectetur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi laudantium, dolorum debitis nostrum harum cupiditate, eum dolorem pariatur soluta saepe vel adipisci error quos ratione, fuga, animi? Facilis facere, temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod neque aspernatur eos iusto consectetur tempora, in soluta, nihil iste nostrum, fugiat natus quia veritatis. Ex numquam assumenda illum nesciunt quidem!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At inventore adipisci magni neque, enim accusantium soluta fuga, iste consequatur quis odit, expedita eum quo consectetur autem qui rerum saepe eaque?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus quod quo nam commodi necessitatibus consequuntur illo dolore ducimus voluptatibus libero tempora nesciunt impedit magni ad minus dolorem, veritatis omnis in.</p>', '2018-07-15', 'img/estudiantes.png', ''),
(8, 1, 'pensiones-ruleta-chicago', 'PENSIONES & RULETA', 'Chicago necesita ingresos, así que el gobierno municipal', '<p>Es el vecino el que elije al alcalde lo más importante que se puede hacer por vosotros es lo que vosotros podáis hacer por nosotros una cosa es ser solidario y otra es serlo a cambio de nada lo he escrito aquí y no entiendo mi letra ¿Ustedes piensan antes de hablar o hablan tras pensar? un vaso es un vaso y un plato es un plato lo que no van a hacer nunca las máquinas es fabricar máquinas muy españoles y mucho españoles ¿Y la europea?.</p><p>Los vecinos el alcalde ¿Ustedes piensan antes de hablar o hablan tras pensar? lo que no van a hacer nunca las máquinas es fabricar máquinas cuanto mejor peor para todos los chuches y mucho españoles luego ya veremos. ¿eh? luego ya veremos es el vecino el que elije al alcalde grave afrenta a la estabilidad de salvo algunas cosas. No es cosa menor, dicho de otra manera, es cosa mayor lo que no van a hacer nunca las máquinas es fabricar máquinas somos sentimientos y tenemos seres humanos muy españoles y mucho españoles cuanto mejor peor para todos y es el alcalde el que quiere que sean y cuanto peor para todos mejor ¿eh?. Esto no es como el agua que cae del cielo sin que se sepa exactamente por qué ese señor del que usted me habla es el vecino el que elije al alcalde lo más importante que se puede hacer por vosotros es lo que vosotros podáis hacer por nosotros muy españoles como decía Galileo, el movimiento siempre se acelera cuando se va detener lo más importante que se puede hacer por vosotros es lo que vosotros podáis hacer por nosotros.</p><p>Es el vecino el que elije al alcalde ¿Y la europea? lo que no van a hacer nunca las máquinas es fabricar máquinas viva el vino A veces moverse es bueno, otras veces no salvo algunas cosas ¿eh?. Es usted Ruiz, ruin, mezquino y miserable ETA es una gran nación it\'s very difficult todo esto ese señor del que usted me habla los vecinos el alcalde los catalanes hacen cosas y mucho españoles. Los vecinos el alcalde mejor para mí el suyo, beneficio político ¿Y la europea? luego ya veremos a veces es mejor estar quieto y en otras no no es cosa menor, dicho de otra manera, es cosa mayor los chuches.</p>', '2018-07-15', 'img/casino.png', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategoria`
--

DROP TABLE IF EXISTS `subcategoria`;
CREATE TABLE IF NOT EXISTS `subcategoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `imagen` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `subcategoria`
--

INSERT INTO `subcategoria` (`id`, `id_categoria`, `nombre`, `descripcion`, `imagen`) VALUES
(1, 1, 'noticias', 'Sigue las últimas noticias de la actualidad deportiva nacional e internacional en TIGERBET.', 'img/noticias.png'),
(2, 2, 'casino', '¡Juega en el mejor casino online y disfruta de la mayor variedad de juegos de casino!\r\nApuesta en TIGERBET.', 'img/casino.png'),
(3, 2, 'deportes', 'TIGERBET pone a tu disposición la mayor oferta de apuestas en deportes. Busca tus apuestas favoritas.', 'img/deportes.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(120) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `acumulado` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `fecha_ingreso`, `acumulado`) VALUES
(1, 'roberto', 'rgomezdominguez@tigerbet.com', 'tigerbet123', '2018-10-11', 86),
(8, 'Janis Joplin', 'jjoplin@mail.com', '3QkKmzfNfT6eJ<)~mn', '2018-11-16', 20),
(11, 'hec', 'he@mail.com', 'gMZ!4=H!-a0_mCiI#Y', '2018-11-18', 20),
(12, 'hec', 'he@mail.com', 'gMZ!4=H!-a0_mCiI#Y', '2018-11-18', 20);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `apuestas`
--
ALTER TABLE `apuestas`
  ADD CONSTRAINT `apuestas_ibfk_1` FOREIGN KEY (`id_juego`) REFERENCES `juegos` (`id`),
  ADD CONSTRAINT `apuestas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD CONSTRAINT `juegos_ibfk_1` FOREIGN KEY (`id_subcategoria`) REFERENCES `subcategoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  ADD CONSTRAINT `subcategoria_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
