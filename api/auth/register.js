import { setCorsHeaders, handleOptions } from '../utils/cors.js';
import { errorHandler, badRequest } from '../utils/errorHandler.js';

/**
 * Register endpoint
 * POST /api/auth/register
 * Body: { email: string, password: string, name: string }
 */
export default async function handler(req, res) {
  setCorsHeaders(res);
  
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return badRequest(res, 'Email, password, and name are required');
    }

    // TODO: Implement actual registration
    // For now, return a mock response
    // In production, you would:
    // 1. Validate input
    // 2. Check if user exists
    // 3. Hash password
    // 4. Create user in database
    // 5. Generate JWT token
    // 6. Return token and user data

    // Mock response (remove this when implementing real auth)
    return res.status(201).json({
      token: 'mock-jwt-token',
      user: {
        id: Date.now().toString(),
        email,
        name,
        role: 'agent',
      },
    });
  } catch (error) {
    return errorHandler(res, error);
  }
}

