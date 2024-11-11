import connection from "../db.js"; // Importar la conexión a la base de datos.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Campos obligatorios
    if (!email || !password) {
      throw "Debe completar todos los campos para registrarse.";
    }

    console.log(email, password);

    // Chequeo que el mail no esté en uso
    const [rows] = await connection.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    // Si hay un resultado, ya existe
    if (rows.length !== 0) {
      throw "El correo electrónico ya se encuentra en uso.";
    }

    // Encripto la contraseña
    const hashPassword = bcrypt.hashSync(password, 8);

    // Inserto el nuevo usuario en la base de datos
    const result = await connection.query(
      "INSERT INTO usuarios (email, password) VALUES (?, ?)",
      [email, hashPassword]
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

    // Chequeo que el usuario exista
    const [rows] = await connection.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    // Si no hay resultados
    if (!rows.length) {
      throw "El correo o la contraseña son incorrectos.";
    }

    // Comparo la contraseña ingresada con la almacenada
    const passwordIsValid = bcrypt.compareSync(password, rows[0].password);

    if (!passwordIsValid) {
      throw "El correo o la contraseña son incorrectos.";
    }

    // Genero el token de autenticación
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
