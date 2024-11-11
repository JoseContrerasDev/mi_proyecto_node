// controllers/mensajeController.js
import db from '../db.js';

// Función para crear un nuevo mensaje
export const createMensaje = (req, res) => {
    const { remitente_id, tipo_remitente, receptor_id, tipo_receptor, contenido } = req.body;
    
    const sql = `
        INSERT INTO mensajes (remitente_id, tipo_remitente, receptor_id, tipo_receptor, contenido) 
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [remitente_id, tipo_remitente, receptor_id, tipo_receptor, contenido], (err, result) => {
        if (err) {
            console.error('Error al insertar el mensaje:', err);
            res.status(500).json({ error: 'Error al insertar el mensaje' });
        } else {
            res.json({ message: 'Mensaje creado exitosamente', id: result.insertId });
        }
    });
};

// Función para eliminar un mensaje por ID
export const deleteMensaje = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM mensajes WHERE mensaje_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el mensaje:', err);
            res.status(500).json({ error: 'Error al eliminar el mensaje' });
        } else {
            res.json({ message: `Mensaje con ID ${id} eliminado` });
        }
    });
};

// Función para obtener todos los mensajes
export const getMensajes = (req, res) => {
    const sql = 'SELECT * FROM mensajes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener los mensajes:', err);
            res.status(500).json({ error: 'Error al obtener los mensajes' });
        } else {
            res.json(results); // Enviar todos los mensajes como JSON
        }
    });
};

// Función para obtener un mensaje específico por ID
export const getMensajeById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM mensajes WHERE mensaje_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener el mensaje:', err);
            res.status(500).json({ error: 'Error al obtener el mensaje' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Mensaje no encontrado' });
        } else {
            res.json(result[0]);
        }
    });
};

// Función para actualizar un mensaje por ID
export const updateMensaje = (req, res) => {
    const { id } = req.params;
    const { remitente_id, tipo_remitente, receptor_id, tipo_receptor, contenido } = req.body;
    const sql = `
        UPDATE mensajes 
        SET remitente_id = ?, tipo_remitente = ?, receptor_id = ?, tipo_receptor = ?, contenido = ? 
        WHERE mensaje_id = ?
    `;
    db.query(sql, [remitente_id, tipo_remitente, receptor_id, tipo_receptor, contenido, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el mensaje:', err);
            res.status(500).json({ error: 'Error al actualizar el mensaje' });
        } else {
            res.json({ message: `Mensaje con ID ${id} actualizado` });
        }
    });
};