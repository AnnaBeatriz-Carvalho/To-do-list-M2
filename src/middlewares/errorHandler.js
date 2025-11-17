// ========================================
// MIDDLEWARE DE TRATAMENTO DE ERROS
// ========================================
// Este middleware captura erros que não foram tratados
// e retorna uma resposta adequada ao cliente

const errorHandler = (err, req, res, next) => {
  // Log do erro no console para debugging
  console.error('Erro capturado:', err);

  // Define o status code (se não foi definido, usa 500)
  const statusCode = err.statusCode || 500;

  // Monta a resposta de erro
  const resposta = {
    erro: err.message || 'Erro interno do servidor',
    status: statusCode
  };

  // Se estiver em desenvolvimento, adiciona o stack trace (ajuda a debugar)
  if (process.env.NODE_ENV === 'development') {
    resposta.stack = err.stack;
  }

  // Retorna o erro em formato JSON
  res.status(statusCode).json(resposta);
};

// Exporta o middleware
module.exports = errorHandler;