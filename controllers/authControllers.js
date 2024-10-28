// authControllers.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const saltRounds = 10;

// Función para registrar usuarios
export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insertar el usuario en la base de datos
        const sql = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
        await db.query(sql, [email, hashedPassword]);

        // Respuesta de éxito
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error); // Log para depuración
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

// Función para iniciar sesión de usuario
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por correo electrónico
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        const [results] = await db.query(sql, [email]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const user = results[0];

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user.usuario_id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Responder con el token
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error(error); // Log para depuración
        res.status(500).json({ error: 'Error en el inicio de sesión' });
    }
};
