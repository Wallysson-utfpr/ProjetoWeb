import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Login from "./components/Login";
// import Cadastro from "./components/Cadastro";
import Home from "./components/Home";
import Moeda from "./components/Moeda";
// import ListaMoeda from "./components/ListaMoeda";

import { getToken } from "./services/auth";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!getToken();
  return isAuthenticated ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!getToken();
  return isAuthenticated ? <Navigate to="/home" /> : children;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      {/* <Route path="/cadastro" element={<Cadastro />} /> */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/cadastroMoeda" element={<Moeda />} />
      {/* <Route path="/listaMoeda" element={<ListaMoeda />} /> */}
    </Routes>
  </BrowserRouter>
);

export default PrivateRoute;
