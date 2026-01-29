// ========================================
// IMPORTAÇÕES
// ========================================
const express = require('express');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

// Importa os middlewares customizados
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

// Importa as rotas
const routes = require('./routes/index');

// ========================================
// CRIAÇÃO DA APLICAÇÃO EXPRESS
// ========================================
const app = express();
const cors = require('cors');
app.use(cors()); // Habilita CORS para todas as rotas
// ========================================
// MIDDLEWARES GLOBAIS
// ========================================

// 1. express.json() - Permite que a API entenda requisições com JSON no body
// Essencial para POST e PUT funcionarem
app.use(express.json());

// 2. express.urlencoded() - Permite entender dados de formulários
// Útil se quiser receber dados de formulários HTML
app.use(express.urlencoded({ extended: true }));

// 3. Logger customizado - Registra todas as requisições no console
app.use(logger);

// ========================================
// CONFIGURAÇÃO DAS ROTAS
// ========================================
// Todas as rotas definidas em routes/index.js
app.use('/', routes);

// ========================================
// ROTA 404 - Não Encontrado
// ========================================
// Captura qualquer rota que não foi definida acima
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    mensagem: `A rota ${req.method} ${req.url} não existe nesta API`
  });
});

// ========================================
// MIDDLEWARE DE TRATAMENTO DE ERROS
// ========================================
// Deve ser o ÚLTIMO middleware registrado
app.use(errorHandler);

// ========================================
// EXPORTA A APLICAÇÃO
// ========================================
module.exports = app;