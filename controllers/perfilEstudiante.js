// controllers/perfilEstudianteController.js
const db = require('../db');

// Función para CREAR un nuevo perfil de estudiante//

exports.createPerfilEstudiante = (req, res) => {
    const { estudiante_id, habilidades, intereses, disponibilidad, experiencia } = req.body;
    const sql = 'INSERT INTO perfiles_estudiantes (estudiante_id, habilidades, intereses, disponibilidad, experiencia) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [estudiante_id, habilidades, intereses, disponibilidad, experiencia], (err, result) => {
        if (err) {
            console.error('Error al insertar el perfil de estudiante:', err);
            res.status(500).json({ error: 'Error al insertar el perfil de estudiante' });
        } else {
            res.json({ message: 'Perfil de estudiante creado exitosamente', id: result.insertId });
        }
    });
};
