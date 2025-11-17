// ========================================
// MIDDLEWARE DE LOG
// ========================================
// Este middleware registra todas as requisições feitas à API
const logger = (req, res, next) => {
  // Pega a data e hora atual
  const dataHora = new Date().toLocaleString('pt-BR');
  
  // Pega o método HTTP (GET, POST, PUT, DELETE, etc)
  const metodo = req.method;
  
  // Pega a URL acessada
  const url = req.url;
  
  // Exibe no console as informações da requisição
  console.log(`[${dataHora}] ${metodo} ${url}`);
  
  // Chama next() para passar para o próximo middleware ou rota
  next();
};

// Exporta o middleware
module.exports = logger;