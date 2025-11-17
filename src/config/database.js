// Importa o Sequelize - biblioteca que facilita trabalhar com banco de dados
const { Sequelize } = require('sequelize');

// Importa o dotenv para ler as variáveis do arquivo .env
require('dotenv').config();

// Cria uma nova instância do Sequelize configurando a conexão com o banco
const sequelize = new Sequelize({
  // Tipo de banco de dados que vamos usar (SQLite)
  dialect: process.env.DB_DIALECT || 'sqlite',
  
  // Caminho onde o arquivo do banco de dados será salvo
  storage: process.env.DB_STORAGE || './database.sqlite',
  
  // Define se vai mostrar os comandos SQL no console (útil para aprender/debugar)
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  
  // Configurações adicionais do SQLite
  define: {
    // Adiciona automaticamente campos createdAt e updatedAt nas tabelas
    timestamps: true,
    
    // Impede que o Sequelize pluralize os nomes das tabelas automaticamente
    freezeTableName: true,
  }
});

// Função para testar a conexão com o banco de dados
async function testarConexao() {
  try {
    // Tenta autenticar (conectar) no banco de dados
    await sequelize.authenticate();
    console.log(' Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    // Se der erro, mostra a mensagem de erro
    console.error(' Erro ao conectar no banco de dados:', error);
  }
}

// Exporta a instância do sequelize para ser usada em outros arquivos
module.exports = { sequelize, testarConexao };