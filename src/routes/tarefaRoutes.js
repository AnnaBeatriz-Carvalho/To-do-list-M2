// Importa o Router do Express para criar as rotas
const express = require('express');
const router = express.Router();

// Importa as funções do controller
const {
  criarTarefa,
  listarTarefas,
  buscarTarefaPorId,
  atualizarTarefa,
  atualizarStatus,
  deletarTarefa
} = require('../controllers/tarefaController');

// ========================================
// DEFINIÇÃO DAS ROTAS
// ========================================

// POST /tarefas - Criar uma nova tarefa
router.post('/', criarTarefa);

// GET /tarefas - Listar todas as tarefas
router.get('/', listarTarefas);

// GET /tarefas/:id - Buscar uma tarefa específica pelo ID
router.get('/:id', buscarTarefaPorId);

// PUT /tarefas/:id - Atualizar uma tarefa completa
router.put('/:id', atualizarTarefa);

// PATCH /tarefas/:id/status - Atualizar apenas o status da tarefa
router.patch('/:id/status', atualizarStatus);

// DELETE /tarefas/:id - Deletar uma tarefa
router.delete('/:id', deletarTarefa);

// Exporta o router para ser usado no app.js
module.exports = router;