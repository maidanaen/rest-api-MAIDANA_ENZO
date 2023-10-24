import { pool } from "./database.js";

class BibliotecaController{
    
    async getALL(req, res){
        try {
          const [result] = await pool.query('SELECT * FROM libros');
            if (result.length == 0) {
            res.status(404).json({ error: 'No existen ningun libro en la base de datos' });
        } else {
            res.json(result);
        }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al buscar los libros' });
        }
    }   
    async getOne(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(`SELECT * FROM libros WHERE ISBN= (?)`, [libro.ISBN]);
            if (result.length == 0) {
            res.status(404).json({ error: 'El libro proporcionado  no existe' });
        } else {
            res.json(result);
        }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error libro no encontrado' });
        }
    }
    
    async add(req, res){
        try {
            const libro=req.body;
            if (!libro.nombre || !libro.autor || !libro.categoria || !libro.año_publicacion || !libro.ISBN) {
            res.status(400).json({ error: 'Faltan campos requeridos' });
        } else {
            const [result]= await pool.query(`INSERT INTO libros(nombre, autor, categoria, año_publicacion, ISBN) VALUES(? , ? , ?, ?, ?)`,[libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN]);
            res.json({"libro cargado correctamente": result.insertId});
        }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al cargar el libro' });
        }
    }
    
    async update(req, res){
        try {
            const libro=req.body;
            const [result]= await pool.query(`UPDATE  libros SET nombre= (?), autor= (?), categoria= (?), año_publicacion= (?) WHERE ISBN= (?) `,[libro.nombre,libro.autor,libro.categoria,libro.año_publicacion, libro.ISBN]);
            if (result.changedRows == 0) {
            res.status(404).json({ error: 'El libro no existe' });
        } else {
            res.json({"Libros actualizados correctamente": result.changedRows});
        }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el libro' });
        }
    }
    
    async delete(req, res){
        try {
            const libro=req.body;
            const [result]= await pool.query(`DELETE FROM libros WHERE ISBN = (?)`,[libro.ISBN]);
        if (result.affectedRows == 0) {
            res.status(404).json({ error: 'El libro no existe' });
        } else {
            res.json({"Libros eliminados correctamente": result.affectedRows});
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el libro' });
        }
    }
      
    
}

export const libro = new BibliotecaController();
