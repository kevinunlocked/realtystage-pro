/**
 * Error handler utility for Vercel serverless functions
 */
export function errorHandler(res, error, statusCode = 500) {
  console.error('API Error:', error);
  
  const message = error.message || 'Internal server error';
  const status = error.statusCode || statusCode;
  
  return res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
      details: error,
    }),
  });
}

export function notFound(res, message = 'Resource not found') {
  return res.status(404).json({ error: message });
}

export function unauthorized(res, message = 'Unauthorized') {
  return res.status(401).json({ error: message });
}

export function badRequest(res, message = 'Bad request') {
  return res.status(400).json({ error: message });
}

