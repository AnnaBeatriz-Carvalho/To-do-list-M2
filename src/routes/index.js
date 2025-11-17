// Importa o Router do Express
const express = require('express');
const router = express.Router();

// Importa as rotas de tarefas
const tarefaRoutes = require('./tarefaRoutes');

// ========================================
// ROTA RAIZ - Mensagem de boas-vindas
// ========================================
router.get('/', (req, res) => {
  res.json({
    mensagem: 'Bem-vindo à API To-Do List!',
    versao: '1.0.0',
    endpoints: {
      tarefas: '/tarefas',
    }
  });
});

// ========================================
// REGISTRA AS ROTAS DE TAREFAS
// ========================================
// Todas as rotas de tarefas começam com /tarefas
router.use('/tarefas', tarefaRoutes);

// Exporta o router principal
module.exports = router;