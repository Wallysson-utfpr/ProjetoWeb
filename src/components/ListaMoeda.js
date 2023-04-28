import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { Link } from "react-router-dom";
import "../styles/listaMoeda.css";

function ListaMoeda() {
  const [moedas, setMoedas] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function fetchMoedas() {
      try {
        const response = await axios.get("/listarMoeda");
        setMoedas(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMoedas();
  }, []);

  const buscarMoedas = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/listarMoeda?nome=${busca}`);
      setMoedas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuscaChange = (event) => {
    setBusca(event.target.value);
  };

  return (
    <div className="lista-moeda">
      <h1>Lista de moedas:</h1>
      <form onSubmit={buscarMoedas}>
        <input type="text" value={busca} onChange={handleBuscaChange} />
      </form>
      <Link className="bt-voltar" to="/">
        Voltar
      </Link>
      <ul>
        {moedas.map((moeda) =>
          busca !== "" &&
          moeda.nome.toLowerCase().indexOf(busca.toLowerCase()) ===
            -1 ? null : (
            <li key={moeda._id}>
              <span className="corWhite">Nome da moeda:</span> {moeda.nome}{" "}
              <br /> <span className="corWhite">Máxima:</span> {moeda.alta}{" "}
              <br /> <span className="corWhite">Mínima:</span> {moeda.baixa}
            </li>
          )
        )}
      </ul>
      
    </div>
  );
}

export default ListaMoeda;
