import {Router} from 'express';
import {libro } from './controller.js';

export const router = Router ();
router.get('/libros', libro.getALL);
router.get('/buscar', libro.getOne);
router.post('/libro_nuevo', libro.add);
router.put('/actualizar', libro.update);
router.delete('/eliminar',libro.delete);