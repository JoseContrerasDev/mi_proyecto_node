import connection from "../db.js"; // Importar la conexión a la base de datos.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const imageLink = req.file ? `/uploads/${req.file.filename}` : null; // Ruta de la imagen subida

    // Verificación de campos obligatorios
    if (!email || !password) {
      throw "Debe completar todos los campos para registrarse.";
    }

    // Chequeo de existencia del correo electrónico
    const [rows] = await connection.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (rows.length !== 0) {
      throw "El correo electrónico ya se encuentra en uso.";
    }

    // Encriptar la contraseña
    const hashPassword = bcrypt.hashSync(password, 8);

    // Inserción del nuevo usuario en la base de datos con imagen opcional
    const result = await connection.query(
      "INSERT INTO usuarios (email, password, image) VALUES (?, ?, ?)",
      [email, hashPassword, imageLink]
    );

    res.status(201).send({
      error: false,
      body: [{ id: result[0].insertId }],
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    console.error("❌ Error al registrar usuario: ", error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw "Debe completar todos los campos.";
    }

    // Verificación de existencia del usuario
    const [rows] = await connection.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (!rows.length) {
      throw "El correo o la contraseña son incorrectos.";
    }

    // Validación de la contraseña
    const passwordIsValid = bcrypt.compareSync(password, rows[0].password);

    if (!passwordIsValid) {
      throw "El correo o la contraseña son incorrectos.";
    }

    // Generación del token de autenticación
    const token = jwt.sign({ id: rows[0].usuario_id }, process.env.SECRET_KEY, {});

    res.status(200).send({
      error: false,
      body: [{ token }],
      message: "Inicio de sesión exitoso.",
    });
  } catch (error) {
    console.error("❌ Error al iniciar sesión: ", error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};
