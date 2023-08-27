import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import HeaderAdmin from "../../layouts/admin/header_admin";
import FooterAdmin from "../../layouts/admin/footer_admin";

import History from "../../../src/History";

class FormEditarLibro extends Component {

    constructor(props) {
      super(props);

      this.state = {
        tipos: [],
        generos: [],
        id : "",
        titulo: "",
        autor : "",
        id_tipo : "",
        id_genero : ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

      var history_url = History.location.pathname;
      var id_libro = history_url.split("libros/").pop().split("/editar").shift();
      var url_api_libro = window.$url_api + "/libros/" + id_libro;

      var url_tipos = window.$url_api + "/tipos";
      axios.get(url_tipos, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          this.setState({
            isLoaded: true,
            tipos: res.data.tipos
          });          
      }).catch(e => {
          console.log(e);
      });

      var url_generos = window.$url_api + "/generos";
      axios.get(url_generos, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          this.setState({
            isLoaded: true,
            generos: res.data.generos
          });          
      }).catch(e => {
          console.log(e);
      });

      axios.get(url_api_libro, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            id : res.data.libro[0].id,
            titulo: res.data.libro[0].titulo,
            autor: res.data.libro[0].autor,
            id_tipo : res.data.libro[0].id_tipo,
            id_genero : res.data.libro[0].id_genero
          });       
      }).catch(e => {
          console.log(e);
      });

    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSelectChangeTipo = (event) => {
      this.setState({
        id_tipo: event.target.value
      })
    }

    handleSelectChangeGenero = (event) => {
      this.setState({
        id_genero: event.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { id, titulo, autor, id_tipo, id_genero } = this.state;

      var url = window.$url_api + "/libros/" + id;
      axios.put(url, 
        {"titulo" : titulo, "autor" : autor, "id_tipo" : id_tipo, "id_genero" : id_genero},
        {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {
        var estado = res.data.estado;
        if(estado == 200) {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "El libro fue editado exitosamente", tipo : "success" }));   
          History.push("/libros");      
          History.go();
        } else {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error editando el libro", tipo : "danger" }));   
          History.push("/libros");      
          History.go();
        }
      }).catch(e => {
        sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error editando el libro", tipo : "danger" }));   
        History.push("/libros");      
        History.go();
      });

    }

    render() {

        const { id, tipos, generos, titulo, autor, id_tipo, id_genero } = this.state;

        return (
          <div>
            <HeaderAdmin />
            <div className="container">
              <br/>
              <h3 align="center">Libros</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Editando el libro {titulo}</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
                              <input type="hidden" name="id" value={id} onChange={this.handleChange} />
                              <legend>Datos</legend>
                              <div className="form-group">
                                <label>Título</label>
                                <input type="text" name="titulo" value={titulo} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Autor</label>
                                <input type="text" name="autor" value={autor} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Tipo</label>
                                <select name="id_tipo" value={id_tipo} onChange={this.handleSelectChangeTipo} className="form-control" required>
                                  <option value="" disabled>Seleccione un tipo</option>
                                  {tipos.length && tipos.map((item, index) => (
                                       <option key={item.id} value={item.id}>{item.nombre}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="form-group">
                                <label>Género</label>
                                <select name="id_genero" value={id_genero} onChange={this.handleSelectChangeGenero} className="form-control" required>
                                  <option value="" disabled>Seleccione un género</option>
                                  {generos.length && generos.map((item, index) => (
                                       <option key={item.id} value={item.id}>{item.nombre}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="text-center pt-4">
                                  <p className="lead">
                                    <button type="submit" name="guardar" id="guardar" className="btn btn-primary boton-largo">Guardar</button>
                                    <a href="/libros" className="btn btn-info boton-largo center-block">Atrás</a>
                                  </p>
                              </div>               
                          </form>
                      </div>
                  </div>
              </div>
            </div>
            <FooterAdmin />
          </div>
        );
    }
}
export default FormEditarLibro;