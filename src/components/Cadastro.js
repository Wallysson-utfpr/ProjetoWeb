import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/cadastro.css";

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRedirect = () => {
    window.location.href = "/";
  };
