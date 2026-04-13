require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const topicosRoutes = require("./routes/topicosRoutes");
const questoesRoutes = require("./routes/questoesRoutes");

app.use("/topicos", topicosRoutes);
app.use("/questoes", questoesRoutes);

app.get("/", (req, res) => {
  res.json({
    mensagem: "API de tópicos e questões com PostgreSQL",
    versao: "2.0",
    ambiente: process.env.NODE_ENV || "development",
    banco: "PostgreSQL",
  });
});

app.listen(PORT, () => {
  console.log("=".repeat(49));
  console.log("🚀 Servidor rodando!");
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME})`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || "development"}`);
  console.log("=".repeat(49));
});