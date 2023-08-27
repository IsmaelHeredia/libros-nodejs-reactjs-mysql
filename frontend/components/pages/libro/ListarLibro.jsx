import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import HeaderAdmin from "../../layouts/admin/header_admin";
import FooterAdmin from "../../layouts/admin/footer_admin";

import Mensajes from "../../layouts/mensajes/Mensajes";

const url = window.$url_api;

export default class ListarLibro extends Component {

    constructor(props){
      super(props);
      this.state = {
        libros: [],
        isLoaded: false,
      }
    }

    componentDidMount() {
      var url = window.$url_api + "/libros";
      axios.get(url, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            libros: res.data.libros
          });          
      }).catch(e => {
          console.log(e);
      });

    }

    render() {
        return (
          <div>
            <HeaderAdmin />
            <br/>
            <div className="container">
              <h3 align="center">Lista de libros</h3>
              <br/>
              <table className="table table-bordered order-table ">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Tipo</th>
                    <th>Género</th>
                    <th>Fecha registro</th>
                    <th>Opción</th>
                  </tr>
                </thead>
                <tbody id="bodytable">
                    {this.renderList()}
                </tbody>
              </table>
              <div className="doble-espacio"></div>
              <div align="center">
                <a href="/libros/agregar" className="btn btn-primary boton-largo" role="button">Agregar nuevo libro</a>
              </div>
            </div>
            <FooterAdmin />
          </div>
        );
    }

    renderList(){
      var { libros = [] } = this.props;
      var { isLoaded } = this.state;
      if (!isLoaded) {
        return (
            <tr><td>Cargando...</td></tr>
          )

      } else {

        return this.state.libros.map((libro)=>{

          return(
            <tr key={libro.id}>
              <td>{libro.titulo}</td>
              <td>{libro.autor}</td>
              <td>{libro.nombre_tipo}</td>
              <td>{libro.nombre_genero}</td>
              <td>{libro.fecha_registro}</td>
              <td>
                <a href={"/libros/" + libro.id + "/editar"} className="btn btn-info" role="button">Editar</a>
                <a href={"/libros/" + libro.id + "/borrar"} className="btn btn-danger" role="button">Borrar</a>
              </td>
            </tr>
          )

        })
      }

    }

}