// controllers/postulacionController.js
const db = require('../db');

// Función para CREAR una nueva postulación//

exports.createPostulacion = (req, res) => {
    const { estudiante_id, oferta_id, carta_presentacion, cv_url, estado } = req.body;
    const sql = 'INSERT INTO postulaciones (estudiante_id, oferta_id, carta_presentacion, cv_url, estado) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [estudiante_id, oferta_id, carta_presentacion, cv_url, estado], (err, result) => {
        if (err) {
            console.error('Error al insertar la postulación:', err);
            res.status(500).json({ error: 'Error al insertar la postulación' });
        } else {
            res.json({ message: 'Postulación creada exitosamente', id: result.insertId });
        }
    });
};
