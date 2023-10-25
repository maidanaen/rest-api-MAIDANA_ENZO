import {Router} from 'express';
import {libro } from './controller.js';

export const router = Router ();
router.get('/libros', libro.getALL);
router.get('/buscar/:ISBN', libro.getOne);
router.post('/libro_nuevo', libro.add);
router.put('/actualizar/:ISBN', libro.update);
router.delete('/eliminar/:ISBN',libro.delete);