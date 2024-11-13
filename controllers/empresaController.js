import db from '../db.js';

// Función para crear una nueva empresa
export const createEmpresa = async (req, res) => {
    try {
        const { nombre, direccion, telefono, contacto_principal, email, password, descripcion, industria, webpage } = req.body;

        const sql = `
            INSERT INTO empresas (nombre, direccion, telefono, contacto_principal, email, password, descripcion, industria, webpage) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [nombre, direccion, telefono, contacto_principal, email, password, descripcion, industria, webpage]);
        res.json({ message: 'Empresa creada exitosamente', id: result.insertId });
    } catch (err) {
        console.error('Error al insertar la empresa:', err);
        res.status(500).json({ error: 'Error al insertar la empresa' });
    }
};

// Función para eliminar una empresa por ID
export const deleteEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM empresas WHERE empresa_id = ?';

        const [result] = await db.query(sql, [id]);
        res.json({ message: `Empresa con ID ${id} eliminada` });
    } catch (err) {
        console.error('Error al eliminar la empresa:', err);
        res.status(500).json({ error: 'Error al eliminar la empresa' });
    }
};

// Función para obtener todas las empresas
export const getEmpresas = async (req, res) => {
    try {
        const sql = 'SELECT * FROM empresas';
        const [results] = await db.query(sql);
        res.json(results); // Enviar todas las empresas como JSON
    } catch (err) {
        console.error('Error al obtener las empresas:', err);
        res.status(500).json({ error: 'Error al obtener las empresas' });
    }
};

// Función para obtener una empresa específica por ID
export const getEmpresaById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM empresas WHERE empresa_id = ?';

        const [result] = await db.query(sql, [id]);
        if (result.length === 0) {
            res.status(404).json({ message: 'Empresa no encontrada' });
        } else {
            res.json(result[0]);
        }
    } catch (err) {
        console.error('Error al obtener la empresa:', err);
        res.status(500).json({ error: 'Error al obtener la empresa' });
    }
};

// Función para actualizar una empresa por ID
export const updateEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, industria, webpage } = req.body;
        const sql = 'UPDATE empresas SET nombre = ?, descripcion = ?, industria = ?, webpage = ? WHERE empresa_id = ?';

        const [result] = await db.query(sql, [nombre, descripcion, industria, webpage, id]);
        res.json({ message: `Empresa con ID ${id} actualizada` });
    } catch (err) {
        console.error('Error al actualizar la empresa:', err);
        res.status(500).json({ error: 'Error al actualizar la empresa' });
    }
};


// {
//     "nombre": "Tech Solutions Inc.",
//     "direccion": "123 Calle Principal, Ciudad",
//     "telefono": "+54 9 1234 567890",
//     "contacto_principal": "Carlos Pérez",
//     "email": "contacto@techsolutions.com",
//     "password": "segura123",
//     "descripcion": "Empresa especializada en soluciones de tecnología avanzada",
//     "industria": "Tecnología",
//     "webpage": "https://www.techsolutions.com"
// }
