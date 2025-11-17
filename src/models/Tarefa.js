// Importa os tipos de dados do Sequelize
const { DataTypes } = require('sequelize');

// Importa a conexão com o banco de dados
const { sequelize } = require('../config/database');

// Define o modelo (tabela) Tarefa
const Tarefa = sequelize.define('Tarefa', {
  // Campo ID - identificador único de cada tarefa
  id: {
    type: DataTypes.INTEGER,        // Tipo: número inteiro
    primaryKey: true,                // Define como chave primária (identificador único)
    autoIncrement: true,             // Incrementa automaticamente (1, 2, 3...)
  },
  
  // Campo titulo - nome/título da tarefa
  titulo: {
    type: DataTypes.STRING,          // Tipo: texto (string)
    allowNull: false,                // Não pode ser vazio (obrigatório)
    validate: {
      notEmpty: {                    // Validação: não pode ser uma string vazia
        msg: 'O título não pode ser vazio'
      },
      len: {                         // Validação: tamanho mínimo e máximo
        args: [3, 100],
        msg: 'O título deve ter entre 3 e 100 caracteres'
      }
    }
  },
  
  // Campo descricao - descrição detalhada da tarefa
  descricao: {
    type: DataTypes.TEXT,            // Tipo: texto longo
    allowNull: true,                 // Pode ser vazio (opcional)
  },
  
  // Campo status - estado atual da tarefa
  status: {
    type: DataTypes.ENUM,            // Tipo: ENUM (só aceita valores específicos)
    values: ['a fazer', 'em andamento', 'concluída'],  // Valores permitidos
    defaultValue: 'a fazer',         // Valor padrão quando criar uma nova tarefa
    allowNull: false,                // Não pode ser vazio (obrigatório)
    validate: {
      isIn: {                        // Validação: só aceita os valores definidos acima
        args: [['a fazer', 'em andamento', 'concluída']],
        msg: 'Status inválido. Use: "a fazer", "em andamento" ou "concluída"'
      }
    }
  }
}, {
  // Nome da tabela no banco de dados
  tableName: 'tarefas',
  
  // Adiciona automaticamente os campos createdAt e updatedAt
  timestamps: true,
});

// Exporta o modelo para ser usado em outros arquivos
module.exports = Tarefa;