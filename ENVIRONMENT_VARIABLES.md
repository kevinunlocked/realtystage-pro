# Environment Variables Setup Guide

This guide will walk you through setting up environment variables for your RealtyStage Pro application on Vercel.

## Current Status: What You Need NOW

Since your API endpoints are currently using mock data, you only need **one environment variable** for the app to work:

### Required (Current)
- `VITE_API_URL` - API base URL (set to `/api` for production)

## Setting Up Environment Variables in Vercel

### Step 1: Access Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Sign in to your account
3. Click on your project: **realtystage-pro**

### Step 2: Navigate to Environment Variables
1. Click on **Settings** (top navigation)
2. Click on **Environment Variables** (left sidebar)
3. You'll see a section to add environment variables

### Step 3: Add Current Required Variable

#### VITE_API_URL
- **Key**: `VITE_API_URL`
- **Value**: `/api`
- **Environment**: Select all three:
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- Click **Save**

**Why `/api`?**
- In production, your API routes are on the same domain as your frontend
- Vercel serves serverless functions from the `/api` path
- This allows same-origin requests (no CORS issues)

### Step 4: Redeploy
After adding environment variables:
1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic deployment

## Testing Your Environment Variables

### 1. Test Frontend
Visit your production URL and check the browser console:
- Should not show API connection errors
- API calls should go to `/api/*`

### 2. Test API Endpoint
```bash
curl https://your-app.vercel.app/api/health
```
Should return: `{ status: 'ok', message: 'API is running' }`

## Future Environment Variables (When Implementing Features)

These are NOT needed right now, but you'll need them as you implement features:

### Database (When implementing real data storage)
```
DATABASE_URL=postgresql://user:password@host:5432/database
```
**Where to get it:**
- Supabase: Settings → Database → Connection String
- Neon: Dashboard → Connection String
- Railway: Database → Connect → Connection String

### Authentication (When implementing real auth)
```
JWT_SECRET=your-random-secret-string-min-32-characters
JWT_REFRESH_SECRET=your-random-refresh-secret-string
```
**How to generate:**
```bash
# Generate a random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### File Storage - AWS S3 (When implementing file uploads)
```
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```
**Where to get it:**
- AWS Console → IAM → Users → Create User → Programmatic Access
- Create S3 bucket in AWS Console

### File Storage - Cloudinary (Alternative to S3)
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```
**Where to get it:**
- Cloudinary Dashboard → Settings → API Keys

### AI Services (When implementing AI features)

#### Replicate (AI Staging)
```
REPLICATE_API_TOKEN=your-replicate-api-token
```
**Where to get it:**
- https://replicate.com → Account → API Tokens

#### OpenAI (AI Assistant, Captions)
```
OPENAI_API_KEY=your-openai-api-key
```
**Where to get it:**
- https://platform.openai.com → API Keys

#### Runway ML (Video Generation)
```
RUNWAY_API_KEY=your-runway-api-key
```
**Where to get it:**
- https://runwayml.com → API Settings

### Social Media APIs (When implementing social posting)

#### Instagram & Facebook (Meta)
```
INSTAGRAM_APP_ID=your-instagram-app-id
INSTAGRAM_APP_SECRET=your-instagram-app-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
```
**Where to get it:**
- https://developers.facebook.com → Create App → Instagram Basic Display / Facebook Login

#### TikTok
```
TIKTOK_CLIENT_KEY=your-tiktok-client-key
TIKTOK_CLIENT_SECRET=your-tiktok-client-secret
```
**Where to get it:**
- https://developers.tiktok.com → Create App

#### Snapchat
```
SNAPCHAT_CLIENT_ID=your-snapchat-client-id
SNAPCHAT_CLIENT_SECRET=your-snapchat-client-secret
```
**Where to get it:**
- https://developers.snapchat.com → Create App

## Environment Variable Best Practices

### 1. Security
- ✅ Never commit `.env` files to git
- ✅ Use Vercel's environment variables (encrypted)
- ✅ Use different values for Production/Preview/Development
- ✅ Rotate secrets regularly
- ✅ Use strong, random secrets (32+ characters)

### 2. Organization
- ✅ Use descriptive names (e.g., `DATABASE_URL` not `DB`)
- ✅ Group related variables (prefix with service name)
- ✅ Document what each variable does
- ✅ Set variables for all environments when appropriate

### 3. Vercel-Specific
- ✅ Frontend variables must start with `VITE_` (for Vite)
- ✅ Backend variables (in serverless functions) don't need prefix
- ✅ Variables are available in all serverless functions
- ✅ Changes require redeployment to take effect

## Quick Reference: Current Setup

### Minimum Required (Right Now)
```env
VITE_API_URL=/api
```

### When Implementing Database
```env
DATABASE_URL=postgresql://...
```

### When Implementing Authentication
```env
JWT_SECRET=...
JWT_REFRESH_SECRET=...
```

### When Implementing File Storage
```env
# Option A: AWS S3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=...

# Option B: Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### When Implementing AI Features
```env
REPLICATE_API_TOKEN=...
OPENAI_API_KEY=...
RUNWAY_API_KEY=...
```

## Next Steps Checklist

### Immediate (Do Now)
- [ ] Set `VITE_API_URL=/api` in Vercel
- [ ] Redeploy your application
- [ ] Test API endpoints work
- [ ] Verify frontend can call API

### Short Term (Next Week)
- [ ] Set up database (Supabase/Neon)
- [ ] Add `DATABASE_URL` to Vercel
- [ ] Implement authentication
- [ ] Add `JWT_SECRET` to Vercel

### Medium Term (Next Month)
- [ ] Set up file storage (S3/Cloudinary)
- [ ] Add storage credentials to Vercel
- [ ] Implement file uploads
- [ ] Test file storage

### Long Term (Future)
- [ ] Set up AI services
- [ ] Add AI API keys to Vercel
- [ ] Implement AI features
- [ ] Set up social media APIs
- [ ] Add social media credentials

## Troubleshooting

### Environment Variables Not Working?
1. **Check variable name**: Must match exactly (case-sensitive)
2. **Check environment**: Variable must be set for the correct environment
3. **Redeploy**: Changes require redeployment
4. **Check syntax**: No spaces around `=` sign
5. **Check prefix**: Frontend variables need `VITE_` prefix

### Frontend Can't Access Variables?
- Frontend variables must start with `VITE_`
- Variables are injected at build time
- Must rebuild/redeploy after adding variables

### Backend Can't Access Variables?
- Serverless functions access via `process.env.VARIABLE_NAME`
- Variables are available in all functions
- No prefix needed for backend variables

## Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Security Best Practices](https://vercel.com/docs/security)

---

**Start with just `VITE_API_URL=/api` for now. Add other variables as you implement features!**

