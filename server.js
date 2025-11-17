// ========================================
// IMPORTAÇÕES
// ========================================
require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const app = require('./src/app'); // Importa a aplicação Express configurada
const { testarConexao } = require('./src/config/database'); // Importa função de teste de conexão
const { sincronizarDatabase } = require('./src/models/index'); // Importa função de sincronização

// ========================================
// CONFIGURAÇÕES
// ========================================
// Pega a porta do arquivo .env ou usa 3000 como padrão
const PORT = process.env.PORT || 3000;

// ========================================
// FUNÇÃO PARA INICIAR O SERVIDOR
// ========================================
const iniciarServidor = async () => {
  try {
    console.log(' Iniciando servidor...\n');

    // 1. Testa a conexão com o banco de dados
    console.log(' Testando conexão com o banco de dados...');
    await testarConexao();

    // 2. Sincroniza os models com o banco (cria/atualiza tabelas)
    console.log('\n Sincronizando tabelas...');
    await sincronizarDatabase();

    // 3. Inicia o servidor Express
    app.listen(PORT, () => {
      console.log(`\n Servidor rodando com sucesso!`);
      console.log(` URL: http://localhost:${PORT}`);
      console.log(` Endpoints disponíveis:`);
      console.log(`   GET    http://localhost:${PORT}/`);
      console.log(`   POST   http://localhost:${PORT}/tarefas`);
      console.log(`   GET    http://localhost:${PORT}/tarefas`);
      console.log(`   GET    http://localhost:${PORT}/tarefas/:id`);
      console.log(`   PUT    http://localhost:${PORT}/tarefas/:id`);
      console.log(`   PATCH  http://localhost:${PORT}/tarefas/:id/status`);
      console.log(`   DELETE http://localhost:${PORT}/tarefas/:id`);
      console.log(`\n  Para parar o servidor: CTRL + C\n`);
    });

  } catch (error) {
    // Se der erro em qualquer etapa, exibe o erro e encerra
    console.error(' Erro ao iniciar o servidor:', error);
    process.exit(1); // Encerra o processo com código de erro
  }
};

// ========================================
// TRATAMENTO DE ERROS NÃO CAPTURADOS
// ========================================
// Captura erros que não foram tratados no código
process.on('unhandledRejection', (erro) => {
  console.error('Erro não tratado (Promise Rejection):', erro);
  process.exit(1);
});

process.on('uncaughtException', (erro) => {
  console.error('Erro não capturado (Exception):', erro);
  process.exit(1);
});

// ========================================
// INICIA O SERVIDOR
// ========================================
iniciarServidor();