// controllers/empresaController.js
import db from '../db.js';

// Función para crear una nueva empresa
export const createEmpresa = (req, res) => {
    const { nombre, direccion, telefono, contacto_principal, email, password, descripcion, industria, webpage } = req.body;
    
    const sql = `
        INSERT INTO empresas (nombre, direccion, telefono, contacto_principal, email, password, descripcion, industria, webpage) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [nombre, direccion, telefono, contacto_principal, email, password, descripcion, industria, webpage], (err, result) => {
        if (err) {
            console.error('Error al insertar la empresa:', err);
            res.status(500).json({ error: 'Error al insertar la empresa' });
        } else {
            res.json({ message: 'Empresa creada exitosamente', id: result.insertId });
        }
    });
};

// Función para eliminar una empresa por ID
export const deleteEmpresa = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM empresas WHERE empresa_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar la empresa:', err);
            res.status(500).json({ error: 'Error al eliminar la empresa' });
        } else {
            res.json({ message: `Empresa con ID ${id} eliminada` });
        }
    });
};

// Función para obtener todas las empresas
export const getEmpresas = (req, res) => {
    const sql = 'SELECT * FROM empresas';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener las empresas:', err);
            res.status(500).json({ error: 'Error al obtener las empresas' });
        } else {
            res.json(results); // Enviar todas las empresas como JSON
        }
    });
};

// Función para obtener una empresa específica por ID
export const getEmpresaById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM empresas WHERE empresa_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener la empresa:', err);
            res.status(500).json({ error: 'Error al obtener la empresa' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Empresa no encontrada' });
        } else {
            res.json(result[0]);
        }
    });
};

// Función para actualizar una empresa por ID
export const updateEmpresa = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, industria, webpage } = req.body;
    const sql = 'UPDATE empresas SET nombre = ?, descripcion = ?, industria = ?, webpage = ? WHERE empresa_id = ?';
    db.query(sql, [nombre, descripcion, industria, webpage, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar la empresa:', err);
            res.status(500).json({ error: 'Error al actualizar la empresa' });
        } else {
            res.json({ message: `Empresa con ID ${id} actualizada` });
        }
    });
};
