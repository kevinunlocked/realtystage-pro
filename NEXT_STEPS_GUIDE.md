# Next Steps Guide - Getting Your App Production Ready

This guide will walk you through the immediate next steps to get your RealtyStage Pro application fully functional.

## ✅ What's Already Done

- ✅ Frontend UI complete
- ✅ Deployed to Vercel
- ✅ Serverless API functions set up
- ✅ Git repository set up
- ✅ Basic configuration complete

## 🎯 Immediate Next Steps (Do This First)

### Step 1: Set Up Environment Variables (5 minutes)

**What to do:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `VITE_API_URL` = `/api`
3. Select all environments: Production, Preview, Development
4. Click Save
5. Redeploy your application

**Why:**
- Your frontend needs to know where to call the API
- In production, API is on same domain at `/api`

**See:** `ENVIRONMENT_VARIABLES.md` for detailed instructions

### Step 2: Test Your Deployment (5 minutes)

**What to do:**
1. Visit your Vercel production URL
2. Check browser console for errors
3. Test API: `https://your-app.vercel.app/api/health`
4. Navigate through your app

**Expected results:**
- ✅ App loads without errors
- ✅ API health check returns: `{ status: 'ok' }`
- ✅ All pages load correctly
- ✅ Navigation works

### Step 3: Set Up Database (30-60 minutes)

**Why you need it:**
- Store user data
- Store assets metadata
- Store staging projects
- Store social media posts

**Recommended: Supabase (Free Tier)**
1. Go to https://supabase.com
2. Sign up for free account
3. Create new project
4. Wait for database to be ready (2-3 minutes)
5. Go to Settings → Database
6. Copy connection string
7. Add to Vercel: `DATABASE_URL` = `postgresql://...`

**Alternative: Neon (Free Tier)**
1. Go to https://neon.tech
2. Sign up for free account
3. Create new project
4. Copy connection string
5. Add to Vercel: `DATABASE_URL` = `postgresql://...`

**What you'll get:**
- PostgreSQL database
- Free tier: 500MB database, 1GB bandwidth
- Connection string for Vercel
- Web-based SQL editor

### Step 4: Set Up Prisma (Database ORM) (30 minutes)

**Why you need it:**
- Type-safe database access
- Easy migrations
- Auto-generated client

**Steps:**
1. Install Prisma in your project
2. Initialize Prisma
3. Create schema (see `DEVELOPMENT_ROADMAP.md`)
4. Run migrations
5. Generate Prisma client

**See:** `QUICK_START.md` for detailed instructions

### Step 5: Implement Authentication (2-4 hours)

**What to implement:**
1. User registration endpoint
2. User login endpoint
3. JWT token generation
4. Protected routes middleware
5. Login/register pages in frontend

**Steps:**
1. Create User model in database
2. Implement password hashing (bcrypt)
3. Create auth endpoints in `api/auth/`
4. Generate JWT tokens
5. Create login/register pages
6. Connect frontend to auth API

**Environment variables needed:**
- `JWT_SECRET` - Random secret string (32+ characters)
- `JWT_REFRESH_SECRET` - Random secret string

**See:** `DEVELOPMENT_ROADMAP.md` Phase 1.3 for detailed guide

## 📅 Recommended Timeline

### Week 1: Foundation
- [x] Deploy to Vercel
- [ ] Set up environment variables
- [ ] Set up database (Supabase/Neon)
- [ ] Set up Prisma
- [ ] Implement authentication

### Week 2: Core Features
- [ ] Implement asset management API
- [ ] Set up file storage (S3/Cloudinary)
- [ ] Connect frontend to backend
- [ ] Test file uploads

### Week 3: AI Features
- [ ] Set up Replicate API
- [ ] Implement AI staging endpoint
- [ ] Connect frontend to staging API
- [ ] Test staging generation

### Week 4: Social Media
- [ ] Set up social media OAuth
- [ ] Implement posting endpoints
- [ ] Set up scheduling system
- [ ] Test social media integration

## 🔧 Step-by-Step: Setting Up Environment Variables

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click on your project: **realtystage-pro**

2. **Navigate to Environment Variables**
   - Click **Settings** (top navigation)
   - Click **Environment Variables** (left sidebar)

3. **Add Variable**
   - **Key**: `VITE_API_URL`
   - **Value**: `/api`
   - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**

4. **Redeploy**
   - Go to **Deployments** tab
   - Click **...** on latest deployment
   - Click **Redeploy**

### Option B: Via Vercel CLI

```bash
# Set environment variable
vercel env add VITE_API_URL

# When prompted:
# Value: /api
# Environment: Production, Preview, Development (select all)

# Redeploy
vercel --prod
```

## 🗄️ Step-by-Step: Setting Up Database (Supabase)

### 1. Create Supabase Account
- Go to https://supabase.com
- Click "Start your project"
- Sign up with GitHub (recommended)

### 2. Create New Project
- Click "New Project"
- Fill in:
  - **Name**: realtystage-pro
  - **Database Password**: (generate strong password)
  - **Region**: Choose closest to you
- Click "Create new project"
- Wait 2-3 minutes for setup

### 3. Get Connection String
- Go to **Settings** → **Database**
- Scroll to **Connection String**
- Copy **URI** connection string
- Format: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### 4. Add to Vercel
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add: `DATABASE_URL` = `postgresql://...`
- Select: Production, Preview, Development
- Click **Save**

### 5. Test Connection
- You can test the connection from your serverless functions
- Or use Supabase's SQL editor to verify

## 🔐 Step-by-Step: Setting Up Authentication

### 1. Generate JWT Secrets
```bash
# Generate random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Run twice to get two secrets:
# - JWT_SECRET
# - JWT_REFRESH_SECRET
```

### 2. Add to Vercel
- Go to Vercel Dashboard → Environment Variables
- Add: `JWT_SECRET` = `your-generated-secret`
- Add: `JWT_REFRESH_SECRET` = `your-generated-secret`
- Select: Production, Preview, Development
- Click **Save**

### 3. Install Dependencies
```bash
npm install jsonwebtoken bcrypt
```

### 4. Implement Auth Endpoints
- Update `api/auth/register.js` with real registration
- Update `api/auth/login.js` with real login
- Add password hashing
- Add JWT token generation

### 5. Create Auth Pages
- Create `src/pages/Login.jsx`
- Create `src/pages/Register.jsx`
- Connect to auth API
- Add routing

## 📦 Step-by-Step: Setting Up File Storage

### Option A: AWS S3 (More Control)

1. **Create AWS Account**
   - Go to https://aws.amazon.com
   - Sign up for account

2. **Create S3 Bucket**
   - Go to S3 Console
   - Click "Create bucket"
   - Name: `realtystage-pro-assets`
   - Region: Choose closest
   - Uncheck "Block all public access" (if you need public assets)
   - Click "Create bucket"

3. **Create IAM User**
   - Go to IAM Console
   - Click "Users" → "Add user"
   - Name: `realtystage-s3-user`
   - Access type: Programmatic access
   - Permissions: Attach `AmazonS3FullAccess` policy
   - Create user and save credentials

4. **Add to Vercel**
   - `AWS_ACCESS_KEY_ID` = `your-access-key`
   - `AWS_SECRET_ACCESS_KEY` = `your-secret-key`
   - `AWS_REGION` = `us-east-1` (or your region)
   - `AWS_S3_BUCKET` = `realtystage-pro-assets`

### Option B: Cloudinary (Easier)

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

## 🎨 Step-by-Step: Setting Up AI Services

### Replicate (AI Staging)

1. **Create Account**
   - Go to https://replicate.com
   - Sign up for account

2. **Get API Token**
   - Go to Account → API Tokens
   - Create new token
   - Copy token

3. **Add to Vercel**
   - `REPLICATE_API_TOKEN` = `your-token`

### OpenAI (AI Assistant)

1. **Create Account**
   - Go to https://platform.openai.com
   - Sign up for account
   - Add payment method (required)

2. **Get API Key**
   - Go to API Keys
   - Create new secret key
   - Copy key (only shown once)

3. **Add to Vercel**
   - `OPENAI_API_KEY` = `your-api-key`

## ✅ Checklist: What to Do Now

### Immediate (Today)
- [ ] Set `VITE_API_URL=/api` in Vercel
- [ ] Redeploy application
- [ ] Test deployment works
- [ ] Verify API endpoints respond

### This Week
- [ ] Set up database (Supabase/Neon)
- [ ] Add `DATABASE_URL` to Vercel
- [ ] Set up Prisma
- [ ] Create database schema
- [ ] Implement authentication
- [ ] Add `JWT_SECRET` to Vercel

### Next Week
- [ ] Set up file storage (S3/Cloudinary)
- [ ] Add storage credentials to Vercel
- [ ] Implement file upload API
- [ ] Connect frontend to upload API
- [ ] Test file uploads

### Later
- [ ] Set up AI services
- [ ] Implement AI staging
- [ ] Set up social media APIs
- [ ] Implement social posting

## 🆘 Need Help?

### Resources
- **Environment Variables**: See `ENVIRONMENT_VARIABLES.md`
- **Development Roadmap**: See `DEVELOPMENT_ROADMAP.md`
- **Quick Start**: See `QUICK_START.md`
- **Vercel Docs**: https://vercel.com/docs

### Common Issues
- **Variables not working?** → Redeploy after adding
- **API not responding?** → Check `VITE_API_URL` is set
- **Database connection failed?** → Check `DATABASE_URL` format
- **Build failing?** → Check Vercel build logs

## 🎉 Success Criteria

Your app is production-ready when:
- ✅ Environment variables are set
- ✅ Database is connected
- ✅ Authentication works
- ✅ File uploads work
- ✅ API endpoints respond
- ✅ Frontend connects to backend
- ✅ No console errors
- ✅ All features functional

---

**Start with environment variables, then database, then authentication. Take it one step at a time!**

