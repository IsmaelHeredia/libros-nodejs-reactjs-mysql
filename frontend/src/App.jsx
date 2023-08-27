window.$url_api = "http://localhost:3030";
window.$nombre_session = "react_session";
window.$nombre_session_mensaje = "mensaje_session";

import React, { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import ReactDOM from "react-dom";
import axios from "axios";

import "bootswatch/dist/litera/bootstrap.min.css"
import $ from "jquery";
import { createPopper } from "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle.min";

import FormIngreso from "../components/pages/ingreso/FormIngreso";

import Home from "../components/pages/home/Home";

import RutasNormales from "../components/RutasNormales";
import ProtegerRutas from "../components/ProtegerRutas";

import Libro from "../components/pages/libro/ListarLibro";
import FormAgregarLibro from "../components/pages/libro/FormAgregarLibro";
import FormEditarLibro from "../components/pages/libro/FormEditarLibro";
import FormBorrarLibro from "../components/pages/libro/FormBorrarLibro";

import GraficoLibro from "../components/pages/estadisticas/GraficoLibro";

import FormCambiarUsuario from "../components/pages/cuenta/FormCambiarUsuario";
import FormCambiarClave from "../components/pages/cuenta/FormCambiarClave";

import About from "../components/pages/about/About";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RutasNormales />}>
          <Route path="/ingreso" element={<FormIngreso />} />
        </Route>
        <Route element={<ProtegerRutas />}>
          <Route path="/" element={<Home/>} />
          <Route path="/libros" element={<Libro/>} />
          <Route path="/libros/agregar" element={<FormAgregarLibro/>} />
          <Route path="/libros/:id/editar" element={<FormEditarLibro/>} />
          <Route path="/libros/:id/borrar" element={<FormBorrarLibro/>} />
          <Route path="/estadisticas" element={<GraficoLibro/>} />
          <Route path="/cambiarUsuario" element={<FormCambiarUsuario/>} />
          <Route path="/cambiarClave" element={<FormCambiarClave/>} />
          <Route path="/about" element={<About/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}