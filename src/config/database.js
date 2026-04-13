require("dotenv").config();

const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DB_USER, // Lê DB_USER do .env
  host: process.env.DB_HOST, // Lê DB_HOST do .env
  database: process.env.DB_NAME, // Lê DB_NAME do .env
  password: process.env.DB_PASSWORD, // Lê DB_PASSWORD do .env
  port: parseInt(process.env.DB_PORT), // Lê DB_PORT e converte para número
});

pool.connect((erro, client, release) => {
  if (erro) {
    console.error("❌ Erro ao conectar ao PostgreSQL:", erro.message);
    console.error("💡 Verifique suas credenciais no arquivo .env");
  } else {
    console.log("✅ Conectado ao PostgreSQL!");
    console.log(`📊 Banco: ${process.env.DB_NAME}`);
    console.log(`🏠 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    release(); // Devolver a conexão ao pool
  }
});

const criarTabela = async () => {
  const sql = `
    create table if not exists topicos (
      idt serial primary key,
      disciplina varchar(100),
      professor varchar(100),
      descricao_topico varchar(100)
    );

    create table if not exists questoes (
      idc serial primary key,
      topicoid int references topicos(idt),
      enunciado varchar(200),
      resposta varchar(300),
      link_bib varchar(500),
      dtinclusao date
    );
  `;

  try {
    await pool.query(sql);
    console.log("✅ Tabela produtos verificada/criada");
  } catch (erro) {
    console.error("❌ Erro ao criar tabela:", erro.message);
  }
};

criarTabela();

module.exports = pool;