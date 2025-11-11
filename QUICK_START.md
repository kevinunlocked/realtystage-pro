# Quick Start Guide - Implementing Backend

This guide will help you set up the backend infrastructure quickly.

## Step 1: Create Backend Directory

```bash
mkdir backend
cd backend
npm init -y
```

## Step 2: Install Backend Dependencies

```bash
npm install express cors dotenv bcrypt jsonwebtoken express-validator multer aws-sdk prisma @prisma/client
npm install -D nodemon @types/express @types/node
```

## Step 3: Initialize Prisma

```bash
npx prisma init
```

## Step 4: Set Up Environment Variables

Create `backend/.env`:
```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/realtystage?schema=public"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this

# AWS S3 (or use Cloudinary)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# AI Services
REPLICATE_API_TOKEN=your-replicate-token
OPENAI_API_KEY=your-openai-key

# Social Media (get from platform dashboards)
INSTAGRAM_APP_ID=your-app-id
INSTAGRAM_APP_SECRET=your-app-secret
FACEBOOK_APP_ID=your-app-id
FACEBOOK_APP_SECRET=your-app-secret
```

## Step 5: Create Basic Server Structure

### `backend/server.js`
```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4028',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// API Routes (to be created)
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/assets', require('./routes/assets'));
// app.use('/api/staging', require('./routes/staging'));
// app.use('/api/videos', require('./routes/videos'));
// app.use('/api/social', require('./routes/social'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Step 6: Update Frontend to Use API

### Create API Client

Create `src/services/api.js`:
```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Create Asset Service

Create `src/services/assetService.js`:
```javascript
import api from './api';

export const assetService = {
  // Get all assets
  getAssets: async (filters = {}) => {
    const response = await api.get('/assets', { params: filters });
    return response.data;
  },

  // Upload asset
  uploadAsset: async (file, metadata = {}) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));

    const response = await api.post('/assets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        // You can emit this to a progress handler
        return percentCompleted;
      },
    });
    return response.data;
  },

  // Get asset by ID
  getAsset: async (id) => {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },

  // Update asset
  updateAsset: async (id, updates) => {
    const response = await api.put(`/assets/${id}`, updates);
    return response.data;
  },

  // Delete asset
  deleteAsset: async (id) => {
    const response = await api.delete(`/assets/${id}`);
    return response.data;
  },

  // Search assets
  searchAssets: async (query) => {
    const response = await api.get('/assets/search', { params: { q: query } });
    return response.data;
  },
};
```

## Step 7: Update Frontend Environment

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001/api
```

## Step 8: Connect Asset Library to API

Update `src/pages/asset-library/index.jsx` to use real API:

```javascript
import { useEffect, useState } from 'react';
import { assetService } from '../../services/assetService';

const AssetLibrary = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const data = await assetService.getAssets();
      setAssets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilesUploaded = async (files) => {
    try {
      for (const file of files) {
        await assetService.uploadAsset(file, {
          property: selectedFolder,
          tags: [],
        });
      }
      loadAssets(); // Reload assets
    } catch (err) {
      setError(err.message);
    }
  };

  // ... rest of component
};
```

## Step 9: Create Prisma Schema

Update `backend/prisma/schema.prisma`:
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
  uploadedBy    User     @relation(fields: [uploadedById], references: [id])
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
  createdBy     User     @relation(fields: [createdById], references: [id])
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
  createdBy     User     @relation(fields: [createdById], references: [id])
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
  createdBy     User     @relation(fields: [createdById], references: [id])
  createdAt     DateTime @default(now())
  
  @@index([createdById])
  @@index([scheduledFor])
}
```

## Step 10: Run Database Migration

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

## Next Steps

1. Implement authentication routes
2. Create asset upload endpoint
3. Set up file storage (S3/Cloudinary)
4. Implement AI staging endpoint
5. Connect social media APIs

See `DEVELOPMENT_ROADMAP.md` for detailed implementation guide.

