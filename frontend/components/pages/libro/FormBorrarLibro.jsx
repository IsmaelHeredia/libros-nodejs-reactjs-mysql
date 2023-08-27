import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import HeaderAdmin from "../../layouts/admin/header_admin";
import FooterAdmin from "../../layouts/admin/footer_admin";

import History from "../../../src/History";

class FormBorrarLibro extends Component {

    constructor(props) {
      super(props);

      this.state = {
        id: "",
        titulo: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      var history_url = History.location.pathname;
      var id_libro = history_url.split("libros/").pop().split("/borrar").shift();
      var url = window.$url_api + "/libros/" + id_libro;
      axios.get(url, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          this.setState({
            isLoaded: true,
            id : res.data.libro[0].id,
            titulo: res.data.libro[0].titulo
          });          
      }).catch(e => {
          console.log(e);
      });
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { id, titulo } = this.state;
      
      var url = window.$url_api + "/libros/" + id;
      axios.delete(url, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {
        var estado = res.data.estado;
        if(estado == 200) {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "El libro fue borrado exitosamente", tipo : "success" }));   
          History.push("/libros");      
          History.go();
        } else {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error borrando el libro", tipo : "danger" }));   
          History.push("/libros");      
          History.go();
        }
      });

    }

    render() {

        const { id, titulo } = this.state;

        return (
          <div>
            <HeaderAdmin />
            <div className="container">
              <br/>
              <h3 align="center">Libros</h3>
              <br/>
              <div className="jumbotron">
                  <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input type="hidden" name="id" value={id} onChange={this.handleChange} />
                        <div className="text-center">
                            <h1 className="display-3">Eliminacíon</h1>
                            <p className="lead">¿Estás seguro que deseas eliminar el libro { titulo }</p>
                            <p className="lead">
                                <button type="submit" name="guardar" id="guardar" className="btn btn-danger boton-largo">Borrar</button>
                                <a href="/libros" className="btn btn-info boton-largo center-block">Atrás</a>
                            </p>
                        </div>
                    </fieldset>
                  </form>
              </div>
            </div>
            <FooterAdmin />
          </div>
        );
    }
}
export default FormBorrarLibro;