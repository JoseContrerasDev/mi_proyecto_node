import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();


//import { getItems, createItem, deleteItem } from'./controllers/item_controller';
import { createEstudiante, deleteEstudiante, getEstudiantes, getEstudianteById, updateEstudiante } from './controllers/estudiantesController.js';
import { createEmpresa, getEmpresas, getEmpresaById, deleteEmpresa, updateEmpresa } from './controllers/empresaController.js';
import { getOfertas, getOfertaById, createOferta, deleteOferta, updateOferta } from './controllers/ofertaController.js';
import { getEventos,getEventoById, createEvento, deleteEvento, updateEvento } from './controllers/eventoController.js';
import { getMensajes, getMensajeById, createMensaje, updateMensaje, deleteMensaje } from './controllers/mensajesController.js';
import { authMiddleware } from './middleware/authMiddleware.js';
//import authControllers from'./controllers/authControllers.js';
import { register, login } from './controllers/authControllers.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());


// Rutas de autenticación
app.post('/register', register);
app.post('/login', login);

// Rutas protegidas (solo accesibles con un token válido)
app.get('/usuarios', authMiddleware, (req, res) => {
    // Lógica para obtener todos los usuarios
});

app.get('/perfil', authMiddleware, (req, res) => {
    // Lógica para obtener el perfil del usuario actual
});


// Rutas para estudiantes
app.get('/estudiantes', getEstudiantes);
app.get('/estudiantes/:id', getEstudianteById);
app.post('/estudiantes', createEstudiante);
app.put('/estudiantes/:id', updateEstudiante); // Ruta para actualizar un estudiante
app.delete('/estudiantes/:id', deleteEstudiante);

// Rutas para empresas
app.get('/empresas', getEmpresas);
app.get('/empresas/:id', getEmpresaById);
app.post('/empresas', createEmpresa);
app.put('/empresas/:id', updateEmpresa); // Ruta para actualizar una empresa
app.delete('/empresas/:id', deleteEmpresa);

// Rutas para ofertas
app.get('/ofertas', getOfertas);
app.get('/ofertas/:id', getOfertaById);
app.post('/ofertas', createOferta);
app.put('/ofertas/:id', updateOferta); // Ruta para actualizar una oferta
app.delete('/ofertas/:id', deleteOferta);

// Rutas para eventos
app.get('/eventos', getEventos); // Ruta para obtener todos los eventos
app.get('/eventos/:id', getEventoById); // Ruta para obtener un evento específico por ID
app.post('/eventos', createEvento); // Ruta para crear un nuevo evento
app.put('/eventos/:id', updateEvento); // Ruta para actualizar un evento
app.delete('/eventos/:id', deleteEvento); // Ruta para eliminar un evento por ID


// Rutas para mensajes
app.get('/mensajes', getMensajes); // Ruta para obtener todos los mensajes
app.get('/mensajes/:id', getMensajeById); // Ruta para obtener un mensaje específico por ID
app.post('/mensajes', createMensaje); // Ruta para crear un nuevo mensaje
app.put('/mensajes/:id', updateMensaje); // Ruta para actualizar un mensaje
app.delete('/mensajes/:id', deleteMensaje); // Ruta para eliminar un mensaje por ID


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
