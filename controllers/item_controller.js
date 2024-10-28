// controllers/itemController.js
const db = require('../db'); // Importa la conexión de base de datos desde `db.js`

// Función para obtener todos los items
exports.getItems = (req, res) => {
    const sql = 'SELECT * FROM items';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

// Función para crear un nuevo item
exports.createItem = (req, res) => {
    const { name, description } = req.body;
    const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
    db.query(sql, [name, description], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, name, description });
    });
};

// Función para eliminar un item
exports.deleteItem = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM items WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: `Item con id ${id} eliminado` });
    });
};

