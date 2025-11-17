# API To-Do List

API REST para gerenciamento de tarefas desenvolvida com Node.js, Express e Sequelize.

## 📋 Sobre o Projeto

Este projeto é uma API completa para gerenciar listas de tarefas (To-Do List), permitindo criar, listar, atualizar e deletar tarefas. Desenvolvido seguindo as melhores práticas de arquitetura MVC e padrões REST.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **Sequelize** - ORM para banco de dados
- **SQLite** - Banco de dados relacional
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
todo-api/
├── src/
│   ├── config/         # Configurações do banco de dados
│   ├── models/         # Models do Sequelize
│   ├── controllers/    # Lógica de negócio
│   ├── routes/         # Rotas da API
│   ├── middlewares/    # Middlewares customizados
│   └── app.js          # Configuração do Express
├── .env                # Variáveis de ambiente
├── .gitignore          # Arquivos ignorados pelo Git
├── package.json        # Dependências do projeto
└── server.js           # Arquivo principal
```

## ⚙️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/todo-api.git
cd todo-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com:
```env
PORT=3000
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
NODE_ENV=development
```

4. Inicie o servidor:
```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start
```

## 📡 Endpoints da API

### Base URL: `http://localhost:3000`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Mensagem de boas-vindas |
| POST | `/tarefas` | Criar uma nova tarefa |
| GET | `/tarefas` | Listar todas as tarefas |
| GET | `/tarefas/:id` | Buscar tarefa por ID |
| PUT | `/tarefas/:id` | Atualizar tarefa completa |
| PATCH | `/tarefas/:id/status` | Atualizar apenas o status |
| DELETE | `/tarefas/:id` | Deletar uma tarefa |

## 📝 Exemplos de Uso

### Criar uma Tarefa
```http
POST /tarefas
Content-Type: application/json

{
  "titulo": "Estudar Node.js",
  "descricao": "Completar o curso de backend",
  "status": "a fazer"
}
```

### Listar Todas as Tarefas
```http
GET /tarefas
```

### Atualizar Status
```http
PATCH /tarefas/1/status
Content-Type: application/json

{
  "status": "concluída"
}
```

## 🎨 Status Permitidos

- `a fazer`
- `em andamento`
- `concluída`

## 🛡️ Validações

- **Título**: obrigatório, entre 3 e 100 caracteres
- **Descrição**: opcional
- **Status**: deve ser um dos valores permitidos

## 📦 Dependências Principais

```json
{
  "express": "^4.18.2",
  "sequelize": "^6.35.0",
  "sqlite3": "^5.1.6",
  "dotenv": "^16.3.1"
}
```

## 🧪 Testando a API

Recomendo usar:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (extensão VS Code)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👩‍💻 Autor

Desenvolvido com 💜 por [Seu Nome]

---

⭐ Se este projeto te ajudou, deixe uma estrela!
