var express = require("express");
var bd = require("../funciones/conexion");
var helper = require("../funciones/helper.js");
var router = express.Router();

router.get("/", function (req, res) {

  var conexion = bd.retornarConexion();
  conexion.connect();

  conexion.query("SELECT l.id,l.titulo,l.autor,l.id_tipo,t.nombre AS nombre_tipo,l.id_genero,g.nombre AS nombre_genero,l.fecha_registro FROM libros l JOIN tipos t ON t.id = l.id_tipo JOIN generos g ON g.id = l.id_genero", function(error, resultado){
    if (error){
        res.status(400).json({estado:400, mensaje:"Error listando libros"});
    } else {
        res.json({estado:200, "libros":resultado});
    }
  });

  conexion.end();

});

router.get("/:id", function (req, res) {
  var id = req.params.id;

  var conexion = bd.retornarConexion();
  conexion.connect();

  conexion.query("SELECT l.id,l.titulo,l.autor,l.id_tipo,t.nombre AS nombre_tipo,l.id_genero,g.nombre AS nombre_genero,l.fecha_registro FROM libros l JOIN tipos t ON t.id = l.id_tipo JOIN generos g ON g.id = l.id_genero WHERE l.id = ?", [id], function(error, resultado){
    if (error){
        res.status(400).json({estado:400, mensaje:"Error cargando libro"});
    } else {
        res.json({estado:200, "libro":resultado});
    }
  });

  conexion.end();

});

router.post("/", async (req,res) => {

  try 
  {
    if(helper.estaVacio(req.body.titulo))
    {
      res.status(400).json({estado:400, mensaje:"Falta el título"});
    }
    else if(helper.estaVacio(req.body.autor)) 
    {
      res.status(400).json({estado:400, mensaje:"Falta el autor"});
    }
    else if(helper.estaVacio(req.body.id_tipo))
    {
      res.status(400).json({estado:400, mensaje:"Falta el ID del tipo"});
    }
    else if(helper.estaVacio(req.body.id_genero))
    {
      res.status(400).json({estado:400, mensaje:"Falta el ID del género"});
    } 
    else 
    {
      var titulo = req.body.titulo;
      var autor = req.body.autor;
      var id_tipo = req.body.id_tipo;
      var id_genero = req.body.id_genero;
      var fecha_registro = helper.cargarFechaActual();
      
      var conexion = bd.retornarConexion();
      conexion.connect();

      const estaRepetido = await verificarLibroCrear(conexion, titulo);

      if(estaRepetido == false) {
        conexion.query("INSERT INTO libros(titulo,autor,id_tipo,id_genero,fecha_registro) VALUES(?,?,?,?,?)",
                        [titulo,autor,id_tipo,id_genero,fecha_registro],
        function(error, resultado){
          if (error){
              res.status(400).json({estado:400, mensaje:"Error agregando libro"});
          } else {
              res.json({estado:200, mensaje:"Libro creado"});
          }
        });
      } else {
        res.status(400).json({estado:400, mensaje:"El libro " + titulo + " ya existe"});
      }

      conexion.end();
    }

  } 
  catch (error) 
  {
    res.status(400).json({mensaje:error.message});
  }

});

const verificarLibroCrear = (conexion, titulo) => {
  return new Promise((resolve) => {
    conexion.query(
      "SELECT * FROM libros WHERE titulo = ?",
      [titulo],
      (error, resultado) => {
        
        if (error) {
          return reject(error);
        }

        if (resultado && resultado.length >= 1) {
          return resolve(true);
        }

        resolve(false);
      });
  });
};

router.put("/:id", async (req,res) => {

  try 
  {
    if(helper.estaVacio(req.params.id)) 
    {
      res.status(400).json({estado:400, mensaje:"Falta el ID"});
    }
    else if(helper.estaVacio(req.body.titulo))
    {
      res.status(400).json({estado:400, mensaje:"Falta el título"});
    }
    else if(helper.estaVacio(req.body.autor))
    {
      res.status(400).json({estado:400, mensaje:"Falta el autor"});
    }
    else if(helper.estaVacio(req.body.id_tipo))
    {
      res.status(400).json({estado:400, mensaje:"Falta el ID del tipo"});
    }
    else if(helper.estaVacio(req.body.id_genero)) 
    {
      res.status(400).json({estado:400, mensaje:"Falta el ID del género"});
    } 
    else 
    {
      var id = req.params.id;
      var titulo = req.body.titulo;
      var autor = req.body.autor;
      var id_tipo = req.body.id_tipo;
      var id_genero = req.body.id_genero;

      var conexion = bd.retornarConexion();
      conexion.connect();

      const estaRepetido = await verificarLibroEditar(conexion, titulo, id);

      if(estaRepetido == false) {

        conexion.query("UPDATE libros SET titulo = ?, autor = ?, id_tipo = ?, id_genero = ? WHERE id = ?",
                        [titulo,autor,id_tipo,id_genero,id],
        function(error, resultado){
          if (error){
              res.status(400).json({estado:400, mensaje:"Error editando libro"});
          } else {
              res.json({estado:200, mensaje:"Libro editado"});
          }
        });

      } else {
        res.status(400).json({estado:400, mensaje:"El libro " + titulo + " ya existe"});
      }

      conexion.end();
    }

  }
  catch (error) 
  {
    res.status(400).json({estado:400, mensaje:error.message});
  }
  
});

const verificarLibroEditar = (conexion, titulo, id_libro) => {
  return new Promise((resolve) => {
    conexion.query(
      "SELECT * FROM libros WHERE titulo = ? AND id != ?",
      [titulo, id_libro],
      (error, resultado) => {
        
        if (error) {
          return reject(error);
        }

        if (resultado && resultado.length >= 1) {
          return resolve(true);
        }

        resolve(false);
      });
  });
};

router.delete("/:id", function (req, res) {
  var id = req.params.id;

  var conexion = bd.retornarConexion();
  conexion.connect();

  conexion.query("DELETE FROM libros WHERE id = ?", [id], function(error, resultado){
    if (error){
        res.status(400).json({estado:400, mensaje:"Error borrando libro"});
    } else {
        res.json({estado: 200, mensaje: "Libro borrado"});
    }
  });

  conexion.end();

});

module.exports = router;