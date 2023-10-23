import { pool } from "./database.js";

class BibliotecaController{
    
    async getALL(req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }
    async getOne (req, res){
        const libro =req.body;
        const [result]= await pool.query(`SELECT * FROM libros WHERE id= (?)`,[libro.id]);
        res.json(result);
    }
    async add(req, res){
        const libro=req.body;
        const [result]= await pool.query(`INSERT INTO libros(nombre, autor, categoria, año_publicacion, ISBN) VALUES(? , ? , ?, ?, ?)`,[libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN]);
        res.json({"libro cargado correctamente": result.insertId});
    }
    async update(req, res){
        const libro=req.body;
        const [result]= await pool.query(`UPDATE  libros SET nombre= (?), autor= (?), categoria= (?), año_publicacion= (?), ISBN= (?) WHERE id= (?)`,[libro.nombre,libro.autor,libro.categoria,libro.año_publicacion, libro.ISBN, libro.id]);
        res.json({"libros actualizados correctamente": result.changedRows});
    }
    async delete(req, res){
        const libro=req.body;
        const [result]= await pool.query(`DELETE FROM libros WHERE ISBN = (?)`,[libro.ISBN]);
        res.json({"libros eliminados correctamente": result.affectedRows});
    }
}

export const libro = new BibliotecaController();
