// controllers/estudianteController.js
const db = require('../db');

// Función para crear un nuevo estudiante
exports.createEstudiante = (req, res) => {
    const { nombre, email, password } = req.body;
    const sql = 'INSERT INTO estudiantes (nombre, email, password) VALUES (?, ?, ?)';
    db.query(sql, [nombre, email, password], (err, result) => {
        if (err) {
            console.error('Error al insertar el estudiante:', err);
            res.status(500).json({ error: 'Error al insertar el estudiante' });
        } else {
            res.json({ message: 'Estudiante creado exitosamente', id: result.insertId });
        }
    });
};


// Función para eliminar un estudiante por ID
exports.deleteEstudiante = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM estudiantes WHERE estudiante_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el estudiante:', err);
            res.status(500).json({ error: 'Error al eliminar el estudiante' });
        } else {
            res.json({ message: `Estudiante con ID ${id} eliminado` });
        }
    });
};


// Función para obtener todos los estudiantes
exports.getEstudiantes = (req, res) => {
    const sql = 'SELECT * FROM estudiantes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener los estudiantes:', err);
            res.status(500).json({ error: 'Error al obtener los estudiantes' });
        } else {
            res.json(results); // Enviar todos los estudiantes como JSON
        }
    });
};

// Función para obtener un estudiante específico por ID
exports.getEstudianteById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM estudiantes WHERE estudiante_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener el estudiante:', err);
            res.status(500).json({ error: 'Error al obtener el estudiante' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Estudiante no encontrado' });
        } else {
            res.json(result[0]); // Enviar solo el estudiante encontrado
        }
    });
};


// Función para actualizar un estudiante por ID
exports.updateEstudiante = (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    const sql = 'UPDATE estudiantes SET nombre = ?, email = ?, password = ? WHERE estudiante_id = ?';
    db.query(sql, [nombre, email, password, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el estudiante:', err);
            res.status(500).json({ error: 'Error al actualizar el estudiante' });
        } else {
            res.json({ message: `Estudiante con ID ${id} actualizado` });
        }
    });
};
