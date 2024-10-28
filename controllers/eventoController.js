// controllers/eventoController.js
import db from '../db.js';

// Función para obtener todos los eventos
export const getEventos = (req, res) => {
    const sql = 'SELECT * FROM eventos';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener los eventos:', err);
            res.status(500).json({ error: 'Error al obtener los eventos' });
        } else {
            res.json(results); // Enviar todos los eventos como JSON
        }
    });
};

// Función para crear un nuevo evento
export const createEvento = (req, res) => {
    const { titulo, descripcion, evento_date, localidad, organizador_id, organizador_type } = req.body;
    const sql = 'INSERT INTO eventos (titulo, descripcion, evento_date, localidad, organizador_id, organizador_type) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [titulo, descripcion, evento_date, localidad, organizador_id, organizador_type], (err, result) => {
        if (err) {
            console.error('Error al crear el evento:', err);
            res.status(500).json({ error: 'Error al crear el evento' });
        } else {
            res.json({ id: result.insertId, titulo, descripcion, evento_date, localidad, organizador_id, organizador_type });
        }
    });
};

// Función para eliminar un evento por ID
export const deleteEvento = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM eventos WHERE evento_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el evento:', err);
            res.status(500).json({ error: 'Error al eliminar el evento' });
        } else {
            res.json({ message: `Evento con ID ${id} eliminado` });
        }
    });
};

// Función para actualizar un evento por ID
export const updateEvento = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, evento_date, localidad, organizador_id, organizador_type } = req.body;
    const sql = 'UPDATE eventos SET titulo = ?, descripcion = ?, evento_date = ?, localidad = ?, organizador_id = ?, organizador_type = ? WHERE evento_id = ?';
    db.query(sql, [titulo, descripcion, evento_date, localidad, organizador_id, organizador_type, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el evento:', err);
            res.status(500).json({ error: 'Error al actualizar el evento' });
        } else {
            res.json({ message: `Evento con ID ${id} actualizado` });
        }
    });
};
