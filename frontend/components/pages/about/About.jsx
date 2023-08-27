import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Header from "../../layouts/admin/header_admin";
import Footer from "../../layouts/admin/footer_admin";

import Mensajes from "../../layouts/mensajes/Mensajes";

class About extends Component {

    render() {
        return (
          <div>
            <Header />
            <div className="container-fluid">
              <br />
              <div className="text-center">
                <h1>About</h1>
                <br/>
                <h3>Nombre del proyecto  : Biblioteca de libros</h3>
                <h3>Version : 1.0</h3>
                <h3>Descripción : Gestor para para ordenar libros por tipos y géneros. Tambien se pueden ver estadísticas sobre los registros</h3>
                <h3>Backend  : NodeJS 18.14.2</h3>
                <h3>Frontend : ReactJS 18.2</h3>
                <h3>Autor : Ismael Heredia</h3>
              </div>
              <br/>
            </div>
            <Footer />
          </div>
        );
    }

}

export default About;