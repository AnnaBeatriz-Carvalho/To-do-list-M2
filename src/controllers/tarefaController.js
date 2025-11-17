// Importa o model Tarefa para manipular os dados
const Tarefa = require('../models/Tarefa');

// ========================================
// CRIAR UMA NOVA TAREFA
// ========================================
const criarTarefa = async (req, res) => {
  try {
    // Pega os dados enviados no corpo da requisição (body)
    const { titulo, descricao, status } = req.body;

    // Validação: verifica se o título foi enviado
    if (!titulo) {
      return res.status(400).json({ 
        erro: 'O título é obrigatório' 
      });
    }

    // Cria a nova tarefa no banco de dados
    const novaTarefa = await Tarefa.create({
      titulo,
      descricao,
      status: status || 'a fazer' // Se não enviar status, usa 'a fazer' como padrão
    });

    // Retorna a tarefa criada com status 201 (Created - Criado)
    return res.status(201).json(novaTarefa);

  } catch (error) {
    // Se der erro de validação do Sequelize, retorna erro 400
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        erro: 'Dados inválidos',
        detalhes: error.errors.map(e => e.message)
      });
    }
    
    // Se for outro tipo de erro, retorna erro 500 (Internal Server Error)
    console.error('Erro ao criar tarefa:', error);
    return res.status(500).json({ 
      erro: 'Erro interno do servidor ao criar tarefa' 
    });
  }
};

// ========================================
// LISTAR TODAS AS TAREFAS
// ========================================
const listarTarefas = async (req, res) => {
  try {
    // Busca todas as tarefas do banco de dados
    // order: ordena por data de criação (mais recentes primeiro)
    const tarefas = await Tarefa.findAll({
      order: [['createdAt', 'DESC']]
    });

    // Retorna as tarefas com status 200 (OK)
    return res.status(200).json(tarefas);

  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    return res.status(500).json({ 
      erro: 'Erro interno do servidor ao listar tarefas' 
    });
  }
};

// ========================================
// BUSCAR TAREFA POR ID
// ========================================
const buscarTarefaPorId = async (req, res) => {
  try {
    // Pega o ID da tarefa da URL (params)
    const { id } = req.params;

    // Busca a tarefa pelo ID no banco de dados
    const tarefa = await Tarefa.findByPk(id); // findByPk = find by Primary Key

    // Se não encontrar a tarefa, retorna erro 404 (Not Found)
    if (!tarefa) {
      return res.status(404).json({ 
        erro: 'Tarefa não encontrada' 
      });
    }

    // Retorna a tarefa encontrada com status 200 (OK)
    return res.status(200).json(tarefa);

  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    return res.status(500).json({ 
      erro: 'Erro interno do servidor ao buscar tarefa' 
    });
  }
};

// ========================================
// ATUALIZAR TAREFA COMPLETA (PUT)
// ========================================
const atualizarTarefa = async (req, res) => {
  try {
    // Pega o ID da URL
    const { id } = req.params;
    
    // Pega os novos dados do corpo da requisição
    const { titulo, descricao, status } = req.body;

    // Busca a tarefa pelo ID
    const tarefa = await Tarefa.findByPk(id);

    // Se não encontrar, retorna erro 404
    if (!tarefa) {
      return res.status(404).json({ 
        erro: 'Tarefa não encontrada' 
      });
    }

    // Validação: verifica se o título foi enviado
    if (!titulo) {
      return res.status(400).json({ 
        erro: 'O título é obrigatório' 
      });
    }

    // Atualiza os dados da tarefa
    tarefa.titulo = titulo;
    tarefa.descricao = descricao;
    if (status) {
      tarefa.status = status;
    }

    // Salva as alterações no banco de dados
    await tarefa.save();

    // Retorna a tarefa atualizada com status 200 (OK)
    return res.status(200).json(tarefa);

  } catch (error) {
    // Se der erro de validação do Sequelize
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        erro: 'Dados inválidos',
        detalhes: error.errors.map(e => e.message)
      });
    }

    console.error('Erro ao atualizar tarefa:', error);
    return res.status(500).json({ 
      erro: 'Erro interno do servidor ao atualizar tarefa' 
    });
  }
};

// ========================================
// ATUALIZAR APENAS O STATUS (PATCH)
// ========================================
const atualizarStatus = async (req, res) => {
  try {
    // Pega o ID da URL
    const { id } = req.params;
    
    // Pega o novo status do corpo da requisição
    const { status } = req.body;

    // Validação: verifica se o status foi enviado
    if (!status) {
      return res.status(400).json({ 
        erro: 'O status é obrigatório' 
      });
    }

    // Busca a tarefa pelo ID
    const tarefa = await Tarefa.findByPk(id);

    // Se não encontrar, retorna erro 404
    if (!tarefa) {
      return res.status(404).json({ 
        erro: 'Tarefa não encontrada' 
      });
    }

    // Atualiza apenas o status
    tarefa.status = status;

    // Salva a alteração no banco de dados
    await tarefa.save();

    // Retorna a tarefa atualizada com status 200 (OK)
    return res.status(200).json(tarefa);

  } catch (error) {
    // Se der erro de validação do Sequelize
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        erro: 'Status inválido. Use: "a fazer", "em andamento" ou "concluída"',
        detalhes: error.errors.map(e => e.message)
      });
    }

    console.error('Erro ao atualizar status:', error);
    return res.status(500).json({ 
      erro: 'Erro interno do servidor ao atualizar status' 
    });
  }
};

// ========================================
// DELETAR UMA TAREFA
// ========================================
const deletarTarefa = async (req, res) => {
  try {
    // Pega o ID da URL
    const { id } = req.params;

    // Busca a tarefa pelo ID
    const tarefa = await Tarefa.findByPk(id);

    // Se não encontrar, retorna erro 404
    if (!tarefa) {
      return res.status(404).json({ 
        erro: 'Tarefa não encontrada' 
      });
    }

    // Deleta a tarefa do banco de dados
    await tarefa.destroy();

    // Retorna status 204 (No Content - Sem Conteúdo)
    // Significa que a operação foi bem-sucedida, mas não há conteúdo para retornar
    return res.status(204).send();

  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    return res.status(500).json({ 
      erro: 'Erro interno do servidor ao deletar tarefa' 
    });
  }
};

// Exporta todas as funções para serem usadas nas rotas
module.exports = {
  criarTarefa,
  listarTarefas,
  buscarTarefaPorId,
  atualizarTarefa,
  atualizarStatus,
  deletarTarefa
};