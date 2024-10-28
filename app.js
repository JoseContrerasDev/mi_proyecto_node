const express = require('express');
const bodyParser = require('body-parser');

const { getItems, createItem, deleteItem } = require('./controllers/item_controller');
const { createEstudiante, deleteEstudiante, getEstudiantes, getEstudianteById, updateEstudiante } = require('./controllers/estudiantesController');
const { createEmpresa, getEmpresas, getEmpresaById, deleteEmpresa, updateEmpresa } = require('./controllers/empresaController');
const { createOferta, deleteOferta, getOfertas, getOfertaById, updateOferta } = require('./controllers/ofertaController');
const { createEvento, getEventos, deleteEvento, updateEvento } = require('./controllers/eventoController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rutas para items
app.get('/items', getItems);
app.post('/items', createItem);
app.delete('/items/:id', deleteItem);

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
app.get('/eventos', getEventos);
app.post('/eventos', createEvento);
app.put('/eventos/:id', updateEvento); // Ruta para actualizar un evento
app.delete('/eventos/:id', deleteEvento);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
