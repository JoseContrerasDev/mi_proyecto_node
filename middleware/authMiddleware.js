import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        // Obtengo el valor de authorization
        const authHeader = req.headers["authorization"];

        if (!authHeader) throw new Error("Debe enviar un token");

        const token = authHeader.split(" ")[1];

        if (!token) throw { status: 403, message: "Token mal formado" };

        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) throw new Error("Fallo en la autenticación del token");

            req.userId = decoded.id;
            next();
        });

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).send({
            error: true,
            body: null,
            message: error.message || error,
        });
    }
};
