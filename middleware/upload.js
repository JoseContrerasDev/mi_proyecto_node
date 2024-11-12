// middleware/upload.js
import multer from "multer";
import path from "path";

// Configuración del almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para evitar conflictos
  }
});

const fileFilter = (req, file, cb) => {
  // Aceptar solo archivos de tipo imagen
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error("Formato de archivo no permitido"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
