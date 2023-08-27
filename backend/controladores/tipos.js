var express = require("express");
var bd = require("../funciones/conexion");
var helper = require("../funciones/helper.js");
var router = express.Router();

router.get("/", function (req, res) {

  var conexion = bd.retornarConexion();
  conexion.connect();

  conexion.query("SELECT * FROM tipos", function(error, resultado){
    if (error){
        res.status(400).json({estado:400, mensaje:"Error listando tipos"});
    } else {
        res.json({estado:200, "tipos":resultado});
    }
  });

  conexion.end();

});

router.get("/:id", function (req, res) {
  var id = req.params.id;

  var conexion = bd.retornarConexion();
  conexion.connect();

  conexion.query("SELECT * FROM tipos WHERE id = ?", [id], function(error, resultado){
    if (error){
        res.status(400).json({estado:400, mensaje:"Error cargando tipo"});
    } else {
        res.json({estado:200, "tipo":resultado});
    }
  });

  conexion.end();

});

module.exports = router;