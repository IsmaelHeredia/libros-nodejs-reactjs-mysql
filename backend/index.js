const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var jwt = require("jsonwebtoken");

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

var bd = require("./funciones/conexion");

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Método Passport JWT

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.CLAVE_JWT;
opts.algorithms = ["HS256"];

passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{

    var id = jwt_payload.id;

    var conexion = bd.retornarConexion();
    conexion.connect();
  
    conexion.query("SELECT * FROM usuarios WHERE id = ?", [id], function(error, resultado){
      if (error){
        return done(null, false);
      } else {
        return done(null, resultado);
      }
    });
  
    conexion.end();

}));

const asegurarRutasUsuario = express.Router(); 
asegurarRutasUsuario.use((req, res, next) => {
  passport.authenticate("jwt", {session: false}, (err, usuario, info)=>{

    if(info){ 
      return res.status(400).json({ estado:400, mensaje: "Acceso denegado" });
    }

    if (err) { 
      return res.status(400).json({ estado:400, mensaje: "Acceso denegado" });
    }

    if (!usuario) { 
      return res.status(400).json({ estado:400, mensaje: "Acceso denegado" });
    }
    
    next();

  })(req, res, next);
});

var acceso = require("./controladores/acceso.js");

var libros = require("./controladores/libros.js");
var tipos = require("./controladores/tipos.js");
var generos = require("./controladores/generos.js");
var estadisticas = require("./controladores/estadisticas.js");
var cuenta = require("./controladores/cuenta.js");

app.use("/acceso", acceso);

app.use("/libros", asegurarRutasUsuario, libros);
app.use("/tipos", asegurarRutasUsuario, tipos);
app.use("/generos", asegurarRutasUsuario, generos);
app.use("/estadisticas", asegurarRutasUsuario, estadisticas);
app.use("/cuenta", asegurarRutasUsuario, cuenta);

var puerto_servidor = process.env.PUERTO_SERVIDOR;

app.listen(puerto_servidor, () => {
 console.log("El servidor está inicializado en el puerto " + puerto_servidor);
});