// middlewares/upload.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage, // Configuración de almacenamiento
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5 MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Tipos de archivos permitidos
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    ); // Obtener la extensión del archivo
    const mimetype = fileTypes.test(file.mimetype); // Obtener el tipo de archivo

    // Comprobar si la extensión y el tipo de archivo son válidos
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Formato de archivo no soportado"));
    }
  },
});

export default upload;