const express = require("express");
const router = express.Router();
const Usuario = require("../models/User");
const Moeda = require("../models/Moeda");
const jwt = require("jsonwebtoken");

router.post("/authenticate", async (req, res) => {
  const { email, senha } = req.body;
  const data = await Usuario.findOne({ email: email, senha: senha });
  if (data) {
    const token = jwt.sign({ id: data._id }, "secret", { expiresIn: "1h" });
    res.cookie("token", token, { maxAge: 3600000, httpOnly: true });
    res.status(200).json({ mensagem: "Usuário logado com sucesso" });
  } else {
    res.status(401).json({ mensagem: "E-mail ou senha incorretos" });
  }
});

router.post("/cadastro", async (req, res) => {
  const { email, senha } = req.body;

  const user = new Usuario({ email, senha });

  try {
    await user.save();
    res.status(200).json({ mensagem: "Usuário cadastrado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao cadastrar o usuário" });
  }
});

router.post("/cadastroMoeda", async (req, res) => {
  const { nome, alta, baixa } = req.body;

  const moeda = new Moeda({ nome, alta, baixa });

  try {
    await moeda.save();
    res.status(200).json({ mensagem: "Moeda cadastrada com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao cadastrar a moeda" });
  }
});

router.get("/listarMoeda", async (req, res) => {
  try {
    const moedas = await Moeda.find();
    res.json(moedas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar moedas");
  }
});

router.get("/listarMoeda/:nome", async (req, res) => {
  try {
    const nome = req.params.nome;
    const moedas = await Moeda.find({ nome: nome }).exec();
    res.json(moedas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
