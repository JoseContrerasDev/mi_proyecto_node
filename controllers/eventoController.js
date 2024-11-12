import db from '../db.js';

// Función para obtener todos los eventos
export const getEventos = async (req, res) => {
    try {
        const sql = 'SELECT * FROM eventos';
        const [results] = await db.query(sql);
        res.json(results); // Enviar todos los eventos como JSON
    } catch (err) {
        console.error('Error al obtener los eventos:', err);
        res.status(500).json({ error: 'Error al obtener los eventos' });
    }
};

// Función para obtener un evento específico por ID
export const getEventoById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM eventos WHERE evento_id = ?';
        const [result] = await db.query(sql, [id]);
        if (result.length === 0) {
            res.status(404).json({ message: 'Evento no encontrado' });
        } else {
            res.json(result[0]);
        }
    } catch (err) {
        console.error('Error al obtener el evento:', err);
        res.status(500).json({ error: 'Error al obtener el evento' });
    }
};

// Función para crear un nuevo evento
export const createEvento = async (req, res) => {
    try {
        const { titulo, descripcion, fecha_evento, localidad, organizador_id, organizador_tipo } = req.body;
        const sql = `
            INSERT INTO eventos (titulo, descripcion, fecha_evento, localidad, organizador_id, organizador_tipo) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, [titulo, descripcion, fecha_evento, localidad, organizador_id, organizador_tipo]);
        res.json({ message: 'Evento creado exitosamente', id: result.insertId });
    } catch (err) {
        console.error('Error al crear el evento:', err);
        res.status(500).json({ error: 'Error al crear el evento' });
    }
};

// Función para eliminar un evento por ID
export const deleteEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM eventos WHERE evento_id = ?';
        const [result] = await db.query(sql, [id]);
        res.json({ message: `Evento con ID ${id} eliminado` });
    } catch (err) {
        console.error('Error al eliminar el evento:', err);
        res.status(500).json({ error: 'Error al eliminar el evento' });
    }
};

// Función para actualizar un evento por ID
export const updateEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, fecha_evento, localidad, organizador_id, organizador_tipo } = req.body;
        const sql = `
            UPDATE eventos 
            SET titulo = ?, descripcion = ?, fecha_evento = ?, localidad = ?, organizador_id = ?, organizador_tipo = ? 
            WHERE evento_id = ?
        `;
        const [result] = await db.query(sql, [titulo, descripcion, fecha_evento, localidad, organizador_id, organizador_tipo, id]);
        res.json({ message: `Evento con ID ${id} actualizado` });
    } catch (err) {
        console.error('Error al actualizar el evento:', err);
        res.status(500).json({ error: 'Error al actualizar el evento' });
    }
};
