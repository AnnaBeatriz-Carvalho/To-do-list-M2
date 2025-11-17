// Importa a conexão com o banco de dados
const { sequelize } = require('../config/database');

// Importa o model Tarefa
const Tarefa = require('./Tarefa');

// Função para sincronizar os models com o banco de dados
async function sincronizarDatabase() {
  try {
    // sync() cria as tabelas no banco de dados baseado nos models
    // { alter: true } atualiza a tabela se ela já existir
    // { force: false } não apaga os dados existentes
    await sequelize.sync({ alter: true });
    console.log('Tabelas sincronizadas com sucesso!');
  } catch (error) {
    console.error('Erro ao sincronizar tabelas:', error);
  }
}

// Exporta os models e a função de sincronização
module.exports = {
  sequelize,
  Tarefa,
  sincronizarDatabase
};