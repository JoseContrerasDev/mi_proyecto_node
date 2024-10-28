// controllers/mensajeController.js
const db = require('../db');

// Función para CREAR un nuevo mensaje//

exports.createMensaje = (req, res) => {
    const { remitente_id, tipo_remitente, receptor_id, tipo_receptor, contenido } = req.body;
    const sql = 'INSERT INTO mensajes (remitente_id, tipo_remitente, receptor_id, tipo_receptor, contenido) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [remitente_id, tipo_remitente, receptor_id, tipo_receptor, contenido], (err, result) => {
        if (err) {
            console.error('Error al insertar el mensaje:', err);
            res.status(500).json({ error: 'Error al insertar el mensaje' });
        } else {
            res.json({ message: 'Mensaje creado exitosamente', id: result.insertId });
        }
    });
};
