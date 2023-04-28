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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/cadastro", {
        email,
        senha,
      });
      console.log(response.data);
      toast.success("Cadastro realizado com sucesso!", {
        autoClose: 1000,
        onClose: handleRedirect,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  
