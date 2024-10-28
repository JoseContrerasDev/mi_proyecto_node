// controllers/ofertaController.js
import db from '../db.js';

// Función para obtener todas las ofertas
export const getOfertas = (req, res) => {
    const sql = 'SELECT * FROM ofertas';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener las ofertas:', err);
            res.status(500).json({ error: 'Error al obtener las ofertas' });
        } else {
            res.json(results); // Enviar todas las ofertas como JSON
        }
    });
};

// Función para obtener una oferta específica por ID
export const getOfertaById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM ofertas WHERE oferta_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener la oferta:', err);
            res.status(500).json({ error: 'Error al obtener la oferta' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Oferta no encontrada' });
        } else {
            res.json(result[0]); // Enviar solo la oferta encontrada
        }
    });
};



// Función para crear una nueva oferta
export const createOferta = (req, res) => {
    const { titulo, descripcion, salario, empresa_id, ubicacion } = req.body;
    const sql = 'INSERT INTO ofertas (titulo, descripcion, salario, empresa_id, ubicacion) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [titulo, descripcion, salario, empresa_id, ubicacion], (err, result) => {
        if (err) {
            console.error('Error al crear la oferta:', err);
            res.status(500).json({ error: 'Error al crear la oferta' });
        } else {
            res.json({ id: result.insertId, titulo, descripcion, salario, empresa_id, ubicacion });
        }
    });
};

// Función para eliminar una oferta por ID
export const deleteOferta = (req, res) => {
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
export const updateOferta = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, salario, ubicacion } = req.body;
    const sql = 'UPDATE ofertas SET titulo = ?, descripcion = ?, salario = ?, ubicacion = ? WHERE oferta_id = ?';
    db.query(sql, [titulo, descripcion, salario, ubicacion, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar la oferta:', err);
            res.status(500).json({ error: 'Error al actualizar la oferta' });
        } else {
            res.json({ message: `Oferta con ID ${id} actualizada` });
        }
    });
};
