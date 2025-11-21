const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB conectado!"))
  .catch(err => console.error(err));

const Lancamento = require("./lancamento");

app.get("/", (req, res) => res.send("API funcionando"));

app.get("/lancamentos", async (req, res) => {
  const dados = await Lancamento.find();
  res.json(dados);
});

app.post("/lancamentos", async (req, res) => {
  try {
    const novo = new Lancamento(req.body);
    const salvo = await novo.save();
    res.status(201).json(salvo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

app.delete("/lancamentos/:id", async (req, res) => {
  await Lancamento.findByIdAndDelete(req.params.id);
  res.json({ msg: "Excluído" });
});

app.listen(3000, () => console.log("API rodando em http://localhost:3000"));
