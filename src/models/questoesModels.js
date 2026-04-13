const pool = require("../config/database");

async function listarTodas() {
  const result = await pool.query(
    "SELECT * FROM questoes ORDER BY idc"
  );
  return result.rows;
}

// views
async function infos_view() {
  const result = await pool.query(
    `
    SELECT t.descricao_topico, q.idc, q.enunciado
    FROM questoes q, topicos t
    WHERE q.topicoid = 1
    `
  );
  return result.rows;
}

async function res(chave) {
  const result = await pool.query(
    `
    SELECT enunciado, resposta
    FROM questoes
    WHERE enunciado ILIKE $1;
    `,
    [`%${chave}%`]
  );
  return result.rows;
}

async function vw_questoes_com_topicos() {
  const result = await pool.query(
    `
    SELECT 
    t.descricao_topico AS nome_topico,
    t.disciplina,
    q.enunciado,
    q.resposta,
    q.link_bib
    FROM questoes q
    JOIN topicos t ON q.topicoid = t.idt
    `
  );
  return result.rows;
}

// back
async function buscarPorId(id) {
  const result = await pool.query(
    "SELECT * FROM questoes WHERE idc = $1",
    [id]
  );
  return result.rows[0];
}

async function buscarPorTopico(topicoid) {
  const result = await pool.query(
    "SELECT * FROM questoes WHERE topicoid = $1",
    [topicoid]
  );

  return result.rows;
}

async function criar(dados) {
  const { topicoid, enunciado, resposta, link_bib, dtinclusao } = dados;

  const sql = `
    INSERT INTO questoes (topicoid, enunciado, resposta, link_bib, dtinclusao)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const result = await pool.query(sql, [
    topicoid,
    enunciado,
    resposta,
    link_bib,
    dtinclusao,
  ]);

  return result.rows[0];
}

async function atualizar(id, dados) {
  const { topicoid, enunciado, resposta, link_bib } = dados;

  const sql = `
    UPDATE questoes
    SET topicoid = $1,
        enunciado = $2,
        resposta = $3,
        link_bib = $4
    WHERE idc = $5
    RETURNING *
  `;

  const result = await pool.query(sql, [
    topicoid,
    enunciado,
    resposta,
    link_bib,
    id,
  ]);

  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    "DELETE FROM questoes WHERE idc = $1",
    [id]
  );

  return result.rowCount > 0;
}

async function buscarPorTopico(topicoid) {
  const result = await pool.query(
    "SELECT * FROM questoes WHERE topicoid = $1",
    [topicoid]
  );

  return result.rows;
}

module.exports = {
  listarTodas,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorTopico,
  infos_view,
  res,
  vw_questoes_com_topicos,
};