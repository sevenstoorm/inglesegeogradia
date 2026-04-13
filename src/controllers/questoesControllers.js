const questaoModel = require("../models/questoesModels");

async function listarTodas(req, res) {
  try {
    const questoes = await questaoModel.listarTodas();
    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar questões",
      erro: erro.message,
    });
  }
}

// views
async function infos_view(req, res) {
  try {
    const questoes = await questaoModel.infos_view();
    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar questões",
      erro: erro.message,
    });
  }
}

async function buscarPorChave(req, res) {
  try {
    const chave = req.params.chave;
    if (!chave) {
      return res.status(400).json({ mensagem: "Chave de busca obrigatória" });
    }

    const questoes = await questaoModel.res(chave);
    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar questões",
      erro: erro.message,
    });
  }
}

async function vw_questoes_com_topicos(req, res) {
  try {
    const questoes = await questaoModel.vw_questoes_com_topicos();
    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar questões",
      erro: erro.message,
    });
  }
}

// back
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ mensagem: "ID inválido" });
    }

    const questao = await questaoModel.buscarPorId(id);

    if (questao) {
      res.status(200).json(questao);
    } else {
      res.status(404).json({ mensagem: `Questão ${id} não encontrada` });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar questão",
      erro: erro.message,
    });
  }
}

async function criar(req, res) {
  try {
    const { topicoid, enunciado, resposta, link_bib } = req.body;

    if (!topicoid || !enunciado || !resposta || !link_bib) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }

    const novaQuestao = await questaoModel.criar({
      topicoid,
      enunciado,
      resposta,
      link_bib,
      dtinclusao: new Date(),
    });

    res.status(201).json(novaQuestao);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao criar questão",
      erro: erro.message,
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { topicoid, enunciado, resposta, link_bib } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ mensagem: "ID inválido" });
    }

    const atualizada = await questaoModel.atualizar(id, {
      topicoid,
      enunciado,
      resposta,
      link_bib,
    });

    if (atualizada) {
      res.status(200).json(atualizada);
    } else {
      res.status(404).json({ mensagem: `Questão ${id} não encontrada` });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar questão",
      erro: erro.message,
    });
  }
}

async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ mensagem: "ID inválido" });
    }

    const deletado = await questaoModel.deletar(id);

    if (deletado) {
      res.status(200).json({
        mensagem: `Questão ${id} removida com sucesso`,
      });
    } else {
      res.status(404).json({
        mensagem: `Questão ${id} não encontrada`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao deletar questão",
      erro: erro.message,
    });
  }
}

async function buscarPorTopico(req, res) {
  try {
    const topicoid = parseInt(req.params.topicoid);

    if (isNaN(topicoid)) {
      return res.status(400).json({ mensagem: "ID do tópico inválido" });
    }

    const questoes = await questaoModel.buscarPorTopico(topicoid);

    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar questões por tópico",
      erro: erro.message,
    });
  }
}

module.exports = {
  buscarPorTopico,
  listarTodas,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  infos_view,
  res: buscarPorChave,
  vw_questoes_com_topicos,
};