import db from '../db.js';

// Función para obtener todas las ofertas
export const getOfertas = async (req, res) => {
    try {
        const sql = 'SELECT * FROM ofertas';
        const [results] = await db.query(sql);
        res.json(results); // Enviar todas las ofertas como JSON
    } catch (err) {
        console.error('Error al obtener las ofertas:', err);
        res.status(500).json({ error: 'Error al obtener las ofertas' });
    }
};

// Función para obtener una oferta específica por ID
export const getOfertaById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM ofertas WHERE oferta_id = ?';
        const [result] = await db.query(sql, [id]);

        if (result.length === 0) {
            res.status(404).json({ message: 'Oferta no encontrada' });
        } else {
            res.json(result[0]); // Enviar solo la oferta encontrada
        }
    } catch (err) {
        console.error('Error al obtener la oferta:', err);
        res.status(500).json({ error: 'Error al obtener la oferta' });
    }
};

// Función para crear una nueva oferta
export const createOferta = async (req, res) => {
    try {
        const { titulo, descripcion, modalidad, requisitos, localidad } = req.body;
        const sql = 'INSERT INTO ofertas (titulo, descripcion, modalidad, requisitos, localidad) VALUES (?, ?, ?, ?, ?)';
        
        const [result] = await db.query(sql, [titulo, descripcion, modalidad, requisitos, localidad]);
        res.json({ id: result.insertId, titulo, descripcion, modalidad, requisitos, localidad });
    } catch (err) {
        console.error('Error al crear la oferta:', err);
        res.status(500).json({ error: 'Error al crear la oferta' });
    }
};

// Función para eliminar una oferta por ID
export const deleteOferta = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM ofertas WHERE oferta_id = ?';
        
        const [result] = await db.query(sql, [id]);
        res.json({ message: `Oferta con ID ${id} eliminada` });
    } catch (err) {
        console.error('Error al eliminar la oferta:', err);
        res.status(500).json({ error: 'Error al eliminar la oferta' });
    }
};

// Función para actualizar una oferta por ID
export const updateOferta = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, modalidad, requisitos, localidad } = req.body;
        const sql = 'UPDATE ofertas SET titulo = ?, descripcion = ?, modalidad = ?, requisitos = ?, localidad = ? WHERE oferta_id = ?';
        
        const [result] = await db.query(sql, [titulo, descripcion, modalidad, requisitos, localidad, id]);
        res.json({ message: `Oferta con ID ${id} actualizada` });
    } catch (err) {
        console.error('Error al actualizar la oferta:', err);
        res.status(500).json({ error: 'Error al actualizar la oferta' });
    }
};


// {
//     "titulo": "Desarrollador Backend",
//     "descripcion": "Responsable de desarrollar la API de la aplicación.",
//     "modalidad": "full-time",
//     "requisitos": "Experiencia en Node.js y MySQL.",
//     "localidad": "Remoto"
// }
