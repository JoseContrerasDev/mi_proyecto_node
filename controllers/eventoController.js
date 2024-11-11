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

// Función para obtener un evento específico por ID
export const getEventoById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM eventos WHERE evento_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener el evento:', err);
            res.status(500).json({ error: 'Error al obtener el evento' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Evento no encontrado' });
        } else {
            res.json(result[0]);
        }
    });
};


// Función para crear un nuevo evento
export const createEvento = (req, res) => {
    const { titulo, descripcion, fecha_evento, localidad, organizador_id, organizador_tipo } = req.body;
    const sql = `
        INSERT INTO eventos (titulo, descripcion, fecha_evento, localidad, organizador_id, organizador_tipo) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [titulo, descripcion, fecha_evento, localidad, organizador_id, organizador_tipo], (err, result) => {
        if (err) {
            console.error('Error al crear el evento:', err);
            res.status(500).json({ error: 'Error al crear el evento' });
        } else {
            res.json({ message: 'Evento creado exitosamente', id: result.insertId });
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
    const { titulo, descripcion, fecha_evento, localidad, organizador_id, organizador_type } = req.body;
    const sql = 'UPDATE eventos SET titulo = ?, descripcion = ?, fecha_evento = ?, localidad = ?, organizador_id = ?, organizador_tipo = ? WHERE evento_id = ?';
    db.query(sql, [titulo, descripcion, fecha_evento, localidad, organizador_id, organizador_type, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el evento:', err);
            res.status(500).json({ error: 'Error al actualizar el evento' });
        } else {
            res.json({ message: `Evento con ID ${id} actualizado` });
        }
    });
};
