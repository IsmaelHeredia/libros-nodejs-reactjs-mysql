var express = require("express");
var bd = require("../funciones/conexion");
var helper = require("../funciones/helper.js");
var router = express.Router();

router.post("/grafico1", function (req, res) {

  var conexion = bd.retornarConexion();
  conexion.connect();

  conexion.query("SELECT t.nombre AS name,COUNT(l.id_tipo) AS y FROM libros l JOIN tipos t ON t.id = id_tipo GROUP BY t.nombre", function(error, resultado){
    if (error){
        res.status(400).json({estado:400, mensaje:"Error listando libros"});
    } else {
        res.json({estado:200, "datos":resultado});
    }
  });

  conexion.end();

});

router.post("/grafico2", function (req, res) {

  var conexion = bd.retornarConexion();
  conexion.connect();

  conexion.query("SELECT g.nombre AS name,COUNT(l.id_genero) AS y FROM libros l JOIN generos g ON g.id = id_genero GROUP BY g.nombre", function(error, resultado){
    if (error){
        res.status(400).json({estado:400, mensaje:"Error listando libros"});
    } else {
        res.json({estado:200, "datos":resultado});
    }
  });

  conexion.end();

});

module.exports = router;