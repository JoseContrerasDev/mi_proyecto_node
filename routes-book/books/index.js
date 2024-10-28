// back/routes/books/index.js
import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../../controllers/bookController.js' // Importar funciones del controlador.

const router = express.Router();

// Definir las rutas de libros, asociándolas a sus respectivos controladores.

router.get('/', getAllBooks);            // Obtener todos los libros.

router.get('/:id', getBookById);          // Obtener un libro por ID.

router.post('/', createBook);             // Crear un nuevo libro.

router.put('/:id', updateBook);           // Actualizar un libro existente.

router.delete('/:id', deleteBook);        // Eliminar un libro.

export default router;
