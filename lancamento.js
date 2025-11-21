const mongoose = require("mongoose");

const LancamentoSchema = new mongoose.Schema({
  mes: { type: String, required: true },
  Despesa_receita: { type: String, enum: ["RECEITA", "DESPESA"], required: true },
  Categoria: { type: String, required: true },
  Valor: { type: Number, required: true },
  data_vencimento: { type: Date, required: true }
});

module.exports = mongoose.model("Lancamento", LancamentoSchema);
