import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import { register, login } from './controllers/authControllers.js';
import { authMiddleware } from './middleware/authMiddleware.js';

import { 
    createEstudiante, deleteEstudiante, getEstudiantes, getEstudianteById, updateEstudiante 
} from './controllers/estudiantesController.js';

import { 
    createEmpresa, getEmpresas, getEmpresaById, deleteEmpresa, updateEmpresa 
} from './controllers/empresaController.js';

import { 
    getOfertas, getOfertaById, createOferta, deleteOferta, updateOferta 
} from './controllers/ofertaController.js';

import { 
    getEventos, getEventoById, createEvento, deleteEvento, updateEvento 
} from './controllers/eventoController.js';

import { 
    getMensajes, getMensajeById, createMensaje, updateMensaje, deleteMensaje 
} from './controllers/mensajesController.js';

// Configuración de dotenv
dotenv.config();

// Configuración del servidor y multer
const app = express();
const port = process.env.PORT || 3000;

// Configuración de multer para cargar imágenes en el registro
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Habilita el acceso a las imágenes cargadas

// Rutas de autenticación
app.post('/register', upload.single('image'), register);
app.post('/login', login);

// Rutas protegidas (solo accesibles con un token válido)
app.get('/usuarios', authMiddleware, (req, res) => {
    res.send("Lógica para obtener todos los usuarios");
});

app.get('/perfil', authMiddleware, (req, res) => {
    res.send("Lógica para obtener el perfil del usuario actual");
});

// Rutas para estudiantes
app.get('/estudiantes', getEstudiantes);
app.get('/estudiantes/:id', getEstudianteById);
app.post('/estudiantes', createEstudiante);
app.put('/estudiantes/:id', updateEstudiante);
app.delete('/estudiantes/:id', deleteEstudiante);

// Rutas para empresas
app.get('/empresas', getEmpresas);
app.get('/empresas/:id', getEmpresaById);
app.post('/empresas', createEmpresa);
app.put('/empresas/:id', updateEmpresa);
app.delete('/empresas/:id', deleteEmpresa);

// Rutas para ofertas
app.get('/ofertas', getOfertas);
app.get('/ofertas/:id', getOfertaById);
app.post('/ofertas', createOferta);
app.put('/ofertas/:id', updateOferta);
app.delete('/ofertas/:id', deleteOferta);

// Rutas para eventos
app.get('/eventos', getEventos);
app.get('/eventos/:id', getEventoById);
app.post('/eventos', createEvento);
app.put('/eventos/:id', updateEvento);
app.delete('/eventos/:id', deleteEvento);

// Rutas para mensajes
app.get('/mensajes', getMensajes);
app.get('/mensajes/:id', getMensajeById);
app.post('/mensajes', createMensaje);
app.put('/mensajes/:id', updateMensaje);
app.delete('/mensajes/:id', deleteMensaje);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
