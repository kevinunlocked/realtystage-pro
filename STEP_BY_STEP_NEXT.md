# Step-by-Step: Next Steps Implementation Guide

This guide will walk you through implementing the core features step by step.

## 🎯 Phase 1: Database Setup (Priority: HIGH)

### Step 1: Create Supabase Account & Project

1. **Go to Supabase**
   - Visit: https://supabase.com
   - Click "Start your project"
   - Sign up with GitHub (recommended)

2. **Create New Project**
   - Click "New Project"
   - Fill in:
     - **Name**: `realtystage-pro`
     - **Database Password**: Generate a strong password (save it!)
     - **Region**: Choose closest to your users
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Get Connection String**
   - Go to **Settings** → **Database**
   - Scroll to **Connection String**
   - Select **URI** tab
   - Copy the connection string
   - Format: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

4. **Add to Vercel**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `DATABASE_URL` = `postgresql://...` (paste your connection string)
   - Select: Production, Preview, Development
   - Click **Save**

### Step 2: Set Up Prisma in Your Project

1. **Install Prisma Dependencies**
   ```bash
   cd "/Users/kevinchisango/Documents/sync estate marketing"
   npm install prisma @prisma/client
   npm install -D prisma
   ```

2. **Initialize Prisma**
   ```bash
   npx prisma init
   ```
   This creates:
   - `prisma/schema.prisma` - Database schema
   - `.env` file (don't commit this)

3. **Update Prisma Schema**
   - Open `prisma/schema.prisma`
   - Update the `datasource db` URL to use environment variable:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

4. **Create Database Schema**
   - Copy the schema from `DEVELOPMENT_ROADMAP.md` Phase 1.2
   - Or use the basic schema below to get started

5. **Run Migrations**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

6. **Test Connection**
   ```bash
   npx prisma studio
   ```
   This opens a web interface to view your database.

### Step 3: Create Basic Database Schema

Create `prisma/schema.prisma` with this basic schema:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  passwordHash  String
  role          String   @default("agent")
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  assets        Asset[]
  stagingProjects StagingProject[]
  videoProjects VideoProject[]
  posts         ScheduledPost[]
  
  @@index([email])
}

model Asset {
  id            String   @id @default(cuid())
  name          String
  type          String   // image, video, document
  url           String
  thumbnailUrl  String?
  size          Int
  metadata      Json?
  uploadedById  String
  uploadedBy    User     @relation(fields: [uploadedById], references: [id], onDelete: Cascade)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([uploadedById])
  @@index([type])
}

model StagingProject {
  id            String   @id @default(cuid())
  originalImageId String
  stagedImageUrl String?
  style         String
  parameters    Json
  status        String   @default("pending")
  createdById   String
  createdBy     User     @relation(fields: [createdById], references: [id], onDelete: Cascade)
  createdAt     DateTime @default(now())
  
  @@index([createdById])
}

model VideoProject {
  id            String   @id @default(cuid())
  name          String
  templateId    String
  assetIds      String[]
  outputUrl     String?
  status        String   @default("draft")
  settings      Json
  createdById   String
  createdBy     User     @relation(fields: [createdById], references: [id], onDelete: Cascade)
  createdAt     DateTime @default(now())
  
  @@index([createdById])
}

model ScheduledPost {
  id            String   @id @default(cuid())
  content       String
  platforms     String[]
  scheduledFor  DateTime
  status        String   @default("draft")
  assetIds      String[]
  engagement    Json?
  createdById   String
  createdBy     User     @relation(fields: [createdById], references: [id], onDelete: Cascade)
  createdAt     DateTime @default(now())
  
  @@index([createdById])
  @@index([scheduledFor])
}
```

---

## 🔐 Phase 2: Authentication Implementation (Priority: HIGH)

### Step 1: Generate JWT Secrets

1. **Generate Secrets**
   ```bash
   # Generate JWT_SECRET
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Run again for JWT_REFRESH_SECRET
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Add to Vercel**
   - Go to Vercel Dashboard → Environment Variables
   - Add: `JWT_SECRET` = `your-generated-secret`
   - Add: `JWT_REFRESH_SECRET` = `your-generated-secret`
   - Select: Production, Preview, Development
   - Click **Save**

### Step 2: Install Auth Dependencies

```bash
npm install jsonwebtoken bcrypt
```

### Step 3: Create Auth Utilities

Create `api/utils/auth.js`:

```javascript
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret';

export function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function generateRefreshToken(userId) {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '30d' });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}
```

### Step 4: Update Auth Endpoints

Update `api/auth/register.js`:

```javascript
import { setCorsHeaders, handleOptions } from '../utils/cors.js';
import { errorHandler, badRequest } from '../utils/errorHandler.js';
import { hashPassword, generateToken } from '../utils/auth.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: 'agent',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = generateToken(user.id);

    return res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
}
```

Update `api/auth/login.js`:

```javascript
import { setCorsHeaders, handleOptions } from '../utils/cors.js';
import { errorHandler, badRequest } from '../utils/errorHandler.js';
import { comparePassword, generateToken } from '../utils/auth.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValid = await comparePassword(password, user.passwordHash);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return errorHandler(res, error);
  }
}
```

### Step 5: Create Authentication Middleware

Create `api/utils/authMiddleware.js`:

```javascript
import { verifyToken } from './auth.js';

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
```

### Step 6: Create Login/Register Pages

Create `src/pages/Login.jsx`:

```javascript
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { login } from '../store/slices/authSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      setError(err || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="max-w-md w-full bg-white rounded-lg shadow-elevation-2 p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Login</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-error/10 text-error rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
```

Create `src/pages/Register.jsx` (similar structure).

### Step 7: Add Routes

Update `src/Routes.jsx`:

```javascript
import Login from './pages/Login';
import Register from './pages/Register';

// Add routes:
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
```

---

## 📦 Phase 3: File Storage Setup (Priority: MEDIUM)

### Option A: Cloudinary (Recommended - Easier)

1. **Create Cloudinary Account**
   - Go to https://cloudinary.com
   - Sign up for free account

2. **Get Credentials**
   - Go to Dashboard
   - Copy:
     - Cloud Name
     - API Key
     - API Secret

3. **Add to Vercel**
   - `CLOUDINARY_CLOUD_NAME` = `your-cloud-name`
   - `CLOUDINARY_API_KEY` = `your-api-key`
   - `CLOUDINARY_API_SECRET` = `your-api-secret`

4. **Install Cloudinary SDK**
   ```bash
   npm install cloudinary
   ```

5. **Create Upload Service**
   Create `api/utils/upload.js`:

   ```javascript
   import { v2 as cloudinary } from 'cloudinary';

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
   });

   export async function uploadFile(fileBuffer, folder = 'assets') {
     return new Promise((resolve, reject) => {
       cloudinary.uploader.upload_stream(
         { folder, resource_type: 'auto' },
         (error, result) => {
           if (error) reject(error);
           else resolve(result);
         }
       ).end(fileBuffer);
     });
   }

   export async function deleteFile(publicId) {
     return cloudinary.uploader.destroy(publicId);
   }
   ```

### Option B: AWS S3

1. **Create AWS Account**
2. **Create S3 Bucket**
3. **Create IAM User**
4. **Add Credentials to Vercel**
5. **Install AWS SDK**
   ```bash
   npm install @aws-sdk/client-s3
   ```

---

## 🎨 Phase 4: Implement Asset Management API

### Step 1: Update Assets Endpoint

Update `api/assets/index.js` to use database and file storage.

### Step 2: Create Asset Upload Endpoint

Create `api/assets/upload.js` for file uploads.

### Step 3: Connect Frontend

Update frontend to use real API instead of mock data.

---

## 📋 Implementation Checklist

### Database Setup
- [ ] Create Supabase account
- [ ] Create project
- [ ] Get connection string
- [ ] Add DATABASE_URL to Vercel
- [ ] Install Prisma
- [ ] Create schema
- [ ] Run migrations
- [ ] Test connection

### Authentication
- [ ] Generate JWT secrets
- [ ] Add secrets to Vercel
- [ ] Install auth dependencies
- [ ] Create auth utilities
- [ ] Update auth endpoints
- [ ] Create auth middleware
- [ ] Create login/register pages
- [ ] Add routes
- [ ] Test authentication

### File Storage
- [ ] Choose storage provider
- [ ] Set up account
- [ ] Add credentials to Vercel
- [ ] Install SDK
- [ ] Create upload service
- [ ] Update upload endpoints
- [ ] Test file uploads

---

## 🚀 Quick Start Commands

```bash
# Install Prisma
npm install prisma @prisma/client

# Initialize Prisma
npx prisma init

# Create migration
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio

# Install auth dependencies
npm install jsonwebtoken bcrypt

# Install file storage (Cloudinary)
npm install cloudinary

# Install file storage (AWS S3)
npm install @aws-sdk/client-s3
```

---

## 📚 Next Steps

1. **Start with Database** - Set up Supabase and Prisma
2. **Implement Authentication** - Add real auth endpoints
3. **Set up File Storage** - Configure Cloudinary or S3
4. **Implement Asset API** - Connect database and storage
5. **Test Everything** - Verify all features work

---

**Start with Phase 1 (Database Setup) - that's the foundation for everything else!**

