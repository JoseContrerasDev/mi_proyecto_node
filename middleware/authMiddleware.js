import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) throw "Error de middleware, debe enviar un token";

    const token = authHeader.split(" ")[1];
    if (!token) throw { status: 403, message: "Malformed Token" };

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) throw "Failed to authenticate token.";

      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.error("Error de middleware: ", error);
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};
