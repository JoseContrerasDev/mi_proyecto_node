import db from '../db.js';

// Función para crear un nuevo estudiante
export const createEstudiante = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const sql = `
            INSERT INTO estudiantes (nombre, email, password) 
            VALUES (?, ?, ?)
        `;

        const [result] = await db.query(sql, [nombre, email, password]);
        res.json({ message: 'Estudiante creado exitosamente', id: result.insertId });
    } catch (err) {
        console.error('Error al insertar el estudiante:', err);
        res.status(500).json({ error: 'Error al insertar el estudiante' });
    }
};

// Función para eliminar un estudiante por ID
export const deleteEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM estudiantes WHERE estudiante_id = ?';

        const [result] = await db.query(sql, [id]);
        res.json({ message: `Estudiante con ID ${id} eliminado` });
    } catch (err) {
        console.error('Error al eliminar el estudiante:', err);
        res.status(500).json({ error: 'Error al eliminar el estudiante' });
    }
};

// Función para obtener todos los estudiantes
export const getEstudiantes = async (req, res) => {
    try {
        const sql = 'SELECT * FROM estudiantes';
        const [results] = await db.query(sql);
        res.json(results); // Enviar todos los estudiantes como JSON
    } catch (err) {
        console.error('Error al obtener los estudiantes:', err);
        res.status(500).json({ error: 'Error al obtener los estudiantes' });
    }
};

// Función para obtener un estudiante específico por ID
export const getEstudianteById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM estudiantes WHERE estudiante_id = ?';

        const [result] = await db.query(sql, [id]);
        if (result.length === 0) {
            res.status(404).json({ message: 'Estudiante no encontrado' });
        } else {
            res.json(result[0]);
        }
    } catch (err) {
        console.error('Error al obtener el estudiante:', err);
        res.status(500).json({ error: 'Error al obtener el estudiante' });
    }
};

// Función para actualizar un estudiante por ID
export const updateEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;
        const sql = 'UPDATE estudiantes SET nombre = ?, email = ?, password = ? WHERE estudiante_id = ?';

        const [result] = await db.query(sql, [nombre, email, password, id]);
        res.json({ message: `Estudiante con ID ${id} actualizado` });
    } catch (err) {
        console.error('Error al actualizar el estudiante:', err);
        res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
};
