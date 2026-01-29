const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Verifica se existe uma URL de banco de dados (o Render fornece isso automaticamente)
if (process.env.DATABASE_URL) {
  // CONFIGURAÇÃO DE PRODUÇÃO (PostgreSQL)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Desativa logs no console em produção para limpar a saída
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Necessário para conexões seguras no Render
      }
    }
  });
} else {
  // CONFIGURAÇÃO LOCAL (SQLite)
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: console.log
  });
}

async function testarConexao() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar no banco de dados:', error);
  }
}

module.exports = { sequelize, testarConexao };