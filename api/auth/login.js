import { setCorsHeaders, handleOptions } from '../utils/cors.js';
import { errorHandler, badRequest } from '../utils/errorHandler.js';

/**
 * Login endpoint
 * POST /api/auth/login
 * Body: { email: string, password: string }
 */
export default async function handler(req, res) {
  setCorsHeaders(res);
  
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return badRequest(res, 'Email and password are required');
    }

    // TODO: Implement actual authentication
    // For now, return a mock response
    // In production, you would:
    // 1. Validate user credentials against database
    // 2. Generate JWT token
    // 3. Return token and user data

    // Mock response (remove this when implementing real auth)
    if (email === 'demo@example.com' && password === 'password') {
      return res.status(200).json({
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User',
          role: 'agent',
        },
      });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    return errorHandler(res, error);
  }
}

