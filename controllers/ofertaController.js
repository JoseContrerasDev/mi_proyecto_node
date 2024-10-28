// controllers/ofertaController.js
const db = require('../db');

// Función para obtener todas las ofertas
exports.getOfertas = (req, res) => {
    const sql = 'SELECT * FROM ofertas';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener las ofertas:', err);
            res.status(500).json({ error: 'Error al obtener las ofertas' });
        } else {
            res.json(results);
        }
    });
};


// Función para CREAR una oferta //

exports.createOferta = (req, res) => {
    const { titulo, descripcion, modalidad, requisitos, localidad } = req.body;
    const sql = 'INSERT INTO ofertas (titulo, descripcion, modalidad, requisitos, localidad) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [titulo, descripcion, modalidad, requisitos, localidad], (err, result) => {
        if (err) {
            console.error('Error al crear la oferta:', err);
            res.status(500).json({ error: 'Error al crear la oferta' });
        } else {
            res.json({ id: result.insertId, titulo, descripcion, modalidad, requisitos, localidad });
        }
    });
};



// Función para obtener una oferta específica por ID
exports.getOfertaById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM ofertas WHERE oferta_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener la oferta:', err);
            res.status(500).json({ error: 'Error al obtener la oferta' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Oferta no encontrada' });
        } else {
            res.json(result[0]);
        }
    });
};


// Función para eliminar una oferta
exports.deleteOferta = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM ofertas WHERE oferta_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar la oferta:', err);
            res.status(500).json({ error: 'Error al eliminar la oferta' });
        } else {
            res.json({ message: `Oferta con ID ${id} eliminada` });
        }
    });
};


// Función para actualizar una oferta por ID
exports.updateOferta = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, modalidad, requisitos, localidad } = req.body;
    const sql = 'UPDATE ofertas SET titulo = ?, descripcion = ?, modalidad = ?, requisitos = ?, localidad = ? WHERE oferta_id = ?';
    db.query(sql, [titulo, descripcion, modalidad, requisitos, localidad, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar la oferta:', err);
            res.status(500).json({ error: 'Error al actualizar la oferta' });
        } else {
            res.json({ message: `Oferta con ID ${id} actualizada` });
        }
    });
};
