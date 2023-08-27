import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import HeaderAdmin from "../../layouts/admin/header_admin";
import FooterAdmin from "../../layouts/admin/footer_admin";

import Mensajes from "../../layouts/mensajes/Mensajes";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const url = window.$url_api;

export default class GraficoLibro extends Component {

    constructor(props){
      super(props);
      this.state = {
        opciones_grafico1: [],
        opciones_grafico2: []
      }
    }

    componentDidMount() {

      var url_grafico1 = window.$url_api + "/estadisticas/grafico1";

      axios.post(url_grafico1, {}, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {

          var datos = res.data.datos;

          const opciones = {
            chart: {
              type: "pie"
            },
            title: {
              text: "Cantidad de libros por tipo"
            },
            series: [{
              name: "Cantidad de libros",
              colorByPoint: true,
              data: datos
            }]
          };

          this.setState({
            opciones_grafico1: opciones
          })

      }).catch(e => {
          console.log(e);
      });

      var url_grafico2 = window.$url_api + "/estadisticas/grafico2";

      axios.post(url_grafico2, {}, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {

        var datos = res.data.datos;

        const opciones = {
          chart: {
            type: "pie"
          },
          title: {
            text: "Cantidad de libros por género"
          },
          series: [{
            name: "Cantidad de libros",
            colorByPoint: true,
            data: datos
          }]
        };

        this.setState({
          opciones_grafico2: opciones
        })

    }).catch(e => {
        console.log(e);
    });

    }

    render() {

      const { opciones_grafico1, opciones_grafico2 } = this.state;

      return (  
        <div>
          <HeaderAdmin />
          <br/>
          <div className="container">
            <h3 align="center" className="mb-5">Estadísticas</h3>
            <HighchartsReact highcharts={Highcharts} options={opciones_grafico1} constructorType = { "chart" } />
            <HighchartsReact highcharts={Highcharts} options={opciones_grafico2} constructorType = { "chart" } />
          </div>
          <FooterAdmin />
        </div>
      );
    }

}