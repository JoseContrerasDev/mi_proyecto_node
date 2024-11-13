import db from '../db.js';

// Función para crear un nuevo mensaje
export const createMensaje = async (req, res) => {
    try {
        const { remitente_id, tipo_remitente, receptor_id, tipo_receptor, contenido } = req.body;

        const sql = `
            INSERT INTO mensajes (remitente_id, tipo_remitente, receptor_id, tipo_receptor, contenido) 
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [remitente_id, tipo_remitente, receptor_id, tipo_receptor, contenido]);
        res.json({ message: 'Mensaje creado exitosamente', id: result.insertId });
    } catch (err) {
        console.error('Error al insertar el mensaje:', err);
        res.status(500).json({ error: 'Error al insertar el mensaje' });
    }
};

// Función para eliminar un mensaje por ID
export const deleteMensaje = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM mensajes WHERE mensaje_id = ?';

        const [result] = await db.query(sql, [id]);
        res.json({ message: `Mensaje con ID ${id} eliminado` });
    } catch (err) {
        console.error('Error al eliminar el mensaje:', err);
        res.status(500).json({ error: 'Error al eliminar el mensaje' });
    }
};

// Función para obtener todos los mensajes
export const getMensajes = async (req, res) => {
    try {
        const sql = 'SELECT * FROM mensajes';
        const [results] = await db.query(sql);
        res.json(results); // Enviar todos los mensajes como JSON
    } catch (err) {
        console.error('Error al obtener los mensajes:', err);
        res.status(500).json({ error: 'Error al obtener los mensajes' });
    }
};

// Función para obtener un mensaje específico por ID
export const getMensajeById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM mensajes WHERE mensaje_id = ?';

        const [result] = await db.query(sql, [id]);
        if (result.length === 0) {
            res.status(404).json({ message: 'Mensaje no encontrado' });
        } else {
            res.json(result[0]);
        }
    } catch (err) {
        console.error('Error al obtener el mensaje:', err);
        res.status(500).json({ error: 'Error al obtener el mensaje' });
    }
};

// Función para actualizar un mensaje por ID
export const updateMensaje = async (req, res) => {
    try {
        const { id } = req.params;
        const { remitente_id, tipo_remitente, receptor_id, tipo_receptor, contenido } = req.body;

        const sql = `
            UPDATE mensajes 
            SET remitente_id = ?, tipo_remitente = ?, receptor_id = ?, tipo_receptor = ?, contenido = ? 
            WHERE mensaje_id = ?
        `;

        const [result] = await db.query(sql, [remitente_id, tipo_remitente, receptor_id, tipo_receptor, contenido, id]);
        res.json({ message: `Mensaje con ID ${id} actualizado` });
    } catch (err) {
        console.error('Error al actualizar el mensaje:', err);
        res.status(500).json({ error: 'Error al actualizar el mensaje' });
    }
};

// {
//     "remitente_id": 1,
//     "tipo_remitente": "student",
//     "receptor_id": 2,
//     "tipo_receptor": "recruiter",
//     "contenido": "Estoy interesado en la oferta laboral publicada."
// }
