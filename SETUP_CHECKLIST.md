# Setup Checklist - Environment Variables & Next Steps

## 🎯 Right Now: What You Need (5 minutes)

### 1. Set Up Environment Variable in Vercel

**Required:** `VITE_API_URL`

**Steps:**
1. Go to https://vercel.com/dashboard
2. Click on your project: **realtystage-pro**
3. Click **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key**: `VITE_API_URL`
   - **Value**: `/api`
   - **Environment**: Select all three (Production, Preview, Development)
6. Click **Save**
7. Go to **Deployments** tab
8. Click **...** on latest deployment → **Redeploy**

**That's it! Your app will work with mock data.**

---

## 📋 Complete Setup Checklist

### Phase 1: Basic Setup (Do First)
- [ ] Set `VITE_API_URL=/api` in Vercel
- [ ] Redeploy application
- [ ] Test API endpoint: `https://your-app.vercel.app/api/health`
- [ ] Verify app loads without errors

### Phase 2: Database Setup (Next)
- [ ] Create Supabase account (or Neon)
- [ ] Create new project
- [ ] Get database connection string
- [ ] Add `DATABASE_URL` to Vercel
- [ ] Set up Prisma in project
- [ ] Create database schema
- [ ] Run migrations

### Phase 3: Authentication (After Database)
- [ ] Generate JWT secrets
- [ ] Add `JWT_SECRET` to Vercel
- [ ] Add `JWT_REFRESH_SECRET` to Vercel
- [ ] Implement auth endpoints
- [ ] Create login/register pages
- [ ] Test authentication

### Phase 4: File Storage (When Needed)
- [ ] Choose: AWS S3 or Cloudinary
- [ ] Set up account
- [ ] Get credentials
- [ ] Add credentials to Vercel
- [ ] Implement file upload API
- [ ] Test file uploads

### Phase 5: AI Services (When Needed)
- [ ] Set up Replicate account
- [ ] Add `REPLICATE_API_TOKEN` to Vercel
- [ ] Set up OpenAI account
- [ ] Add `OPENAI_API_KEY` to Vercel
- [ ] Implement AI endpoints
- [ ] Test AI features

### Phase 6: Social Media (When Needed)
- [ ] Set up Facebook/Instagram app
- [ ] Add Instagram/Facebook credentials to Vercel
- [ ] Set up TikTok account
- [ ] Add TikTok credentials to Vercel
- [ ] Implement OAuth flows
- [ ] Test social posting

---

## 🔧 Quick Reference: Environment Variables

### Currently Needed
```env
VITE_API_URL=/api
```

### When Implementing Database
```env
DATABASE_URL=postgresql://user:password@host:5432/database
```

### When Implementing Authentication
```env
JWT_SECRET=your-random-secret-32-characters-minimum
JWT_REFRESH_SECRET=your-random-refresh-secret
```

### When Implementing File Storage
```env
# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# OR Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### When Implementing AI
```env
REPLICATE_API_TOKEN=your-replicate-token
OPENAI_API_KEY=your-openai-key
```

---

## 📝 Step-by-Step: Set Up VITE_API_URL

### Via Vercel Dashboard

1. **Go to Vercel Dashboard**
   ```
   https://vercel.com/dashboard
   ```

2. **Select Your Project**
   - Click on **realtystage-pro**

3. **Navigate to Environment Variables**
   - Click **Settings** (top navigation)
   - Click **Environment Variables** (left sidebar)

4. **Add Variable**
   - Click **Add New** button
   - **Key**: `VITE_API_URL`
   - **Value**: `/api`
   - **Environment**: 
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
   - Click **Save**

5. **Redeploy**
   - Go to **Deployments** tab
   - Find latest deployment
   - Click **...** (three dots)
   - Click **Redeploy**
   - Wait for deployment to complete

6. **Verify**
   - Visit your production URL
   - Check browser console (should be no errors)
   - Test API: `https://your-app.vercel.app/api/health`

---

## 🎯 Next Steps Priority Order

### 1. Immediate (Today) ⚡
- Set `VITE_API_URL` in Vercel
- Redeploy and test
- **Time**: 5 minutes
- **Result**: App works with mock data

### 2. Short Term (This Week) 📅
- Set up database (Supabase)
- Add `DATABASE_URL` to Vercel
- Set up Prisma
- Implement authentication
- **Time**: 4-6 hours
- **Result**: Real data storage and auth

### 3. Medium Term (Next Week) 🔄
- Set up file storage
- Implement file uploads
- Connect frontend to backend
- **Time**: 4-6 hours
- **Result**: File uploads working

### 4. Long Term (Future) 🚀
- Set up AI services
- Implement AI features
- Set up social media APIs
- **Time**: 8-12 hours
- **Result**: Full feature set

---

## 📚 Documentation Reference

- **Environment Variables Guide**: `ENVIRONMENT_VARIABLES.md`
- **Next Steps Guide**: `NEXT_STEPS_GUIDE.md`
- **Development Roadmap**: `DEVELOPMENT_ROADMAP.md`
- **Quick Start**: `QUICK_START.md`

---

## ✅ Success Checklist

Your app is ready when:
- [x] Deployed to Vercel
- [ ] Environment variables set
- [ ] API endpoints respond
- [ ] Frontend loads without errors
- [ ] Database connected (when implemented)
- [ ] Authentication works (when implemented)
- [ ] File uploads work (when implemented)

---

**Start with `VITE_API_URL` - that's all you need right now!**

