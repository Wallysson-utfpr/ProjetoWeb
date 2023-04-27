const express = require("express");
const app = express();
const conectDatabase = require("./database/db");
const usuarioRouter = require("./routes/rotasUser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); //
app.use(usuarioRouter);

app.use(express.json());

conectDatabase();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
