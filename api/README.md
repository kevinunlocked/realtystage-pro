# API Serverless Functions

This directory contains Vercel serverless functions for the backend API.

## Structure

```
api/
├── utils/
│   ├── cors.js           # CORS utilities
│   └── errorHandler.js   # Error handling utilities
├── auth/
│   ├── login.js          # POST /api/auth/login
│   └── register.js       # POST /api/auth/register
├── assets/
│   └── index.js          # GET/POST /api/assets
└── health.js             # GET /api/health
```

## Adding New Endpoints

1. Create a new file in the appropriate directory (e.g., `api/staging/generate.js`)
2. Export a default async function that handles the request
3. Use CORS utilities and error handlers
4. The route will be automatically available at `/api/staging/generate`

Example:
```javascript
import { setCorsHeaders, handleOptions } from '../utils/cors.js';
import { errorHandler } from '../utils/errorHandler.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  if (handleOptions(req, res)) return;

  try {
    // Your logic here
    return res.status(200).json({ success: true });
  } catch (error) {
    return errorHandler(res, error);
  }
}
```

## Environment Variables

Set these in Vercel dashboard:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT tokens
- `AWS_ACCESS_KEY_ID` - AWS S3 access key
- `AWS_SECRET_ACCESS_KEY` - AWS S3 secret key
- `AWS_S3_BUCKET` - S3 bucket name
- `REPLICATE_API_TOKEN` - Replicate API token
- `OPENAI_API_KEY` - OpenAI API key

## Local Development

Vercel serverless functions can be tested locally using Vercel CLI:
```bash
npm install -g vercel
vercel dev
```

This will start a local server that mimics Vercel's serverless environment.

