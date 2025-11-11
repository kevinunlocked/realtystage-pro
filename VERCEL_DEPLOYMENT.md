# Vercel Deployment Guide

This guide will walk you through deploying your RealtyStage Pro application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Git repository (GitHub, GitLab, or Bitbucket)
3. Node.js installed locally (for testing)

## Step 1: Prepare Your Repository

### 1.1 Push to Git

If you haven't already, initialize git and push to a remote repository:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for Vercel deployment"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/realtystage-pro.git

# Push to remote
git push -u origin main
```

### 1.2 Verify Files

Make sure these files are in your repository:
- ✅ `vercel.json` - Vercel configuration
- ✅ `package.json` - Dependencies and scripts
- ✅ `api/` directory - Serverless functions
- ✅ `src/` directory - React application
- ✅ `vite.config.mjs` - Vite configuration

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended for First Time)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Sign in or create an account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your Git repository (GitHub, GitLab, or Bitbucket)
   - Select your repository

3. **Configure Project**
   - **Framework Preset**: Vite (should be auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `build` (should be auto-detected)
   - **Install Command**: `npm install` (should be auto-detected)

4. **Environment Variables**
   - Click "Environment Variables"
   - Add the following variables:
     ```
     VITE_API_URL=https://your-project.vercel.app/api
     NODE_ENV=production
     DATABASE_URL=your-database-url
     JWT_SECRET=your-jwt-secret
     AWS_ACCESS_KEY_ID=your-aws-access-key
     AWS_SECRET_ACCESS_KEY=your-aws-secret-key
     AWS_S3_BUCKET=your-bucket-name
     REPLICATE_API_TOKEN=your-replicate-token
     OPENAI_API_KEY=your-openai-key
     ```
   - **Important**: Set `VITE_API_URL` to your Vercel deployment URL after first deploy

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your deployment URL (e.g., `https://your-project.vercel.app`)

6. **Update Environment Variables**
   - Go back to Project Settings → Environment Variables
   - Update `VITE_API_URL` to: `https://your-project.vercel.app/api`
   - Redeploy to apply changes

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # From your project root directory
   vercel
   
   # For production deployment
   vercel --prod
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add VITE_API_URL
   vercel env add DATABASE_URL
   vercel env add JWT_SECRET
   # ... add all other environment variables
   ```

## Step 3: Configure Environment Variables

### Required Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

#### Frontend Variables (VITE_*)
- `VITE_API_URL` - Your Vercel API URL (e.g., `https://your-project.vercel.app/api`)

#### Backend Variables
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT token generation (generate a random string)
- `JWT_REFRESH_SECRET` - Secret for refresh tokens
- `NODE_ENV` - Set to `production`

#### AWS S3 (for file storage)
- `AWS_ACCESS_KEY_ID` - Your AWS access key
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
- `AWS_REGION` - AWS region (e.g., `us-east-1`)
- `AWS_S3_BUCKET` - S3 bucket name

#### AI Services
- `REPLICATE_API_TOKEN` - Replicate API token
- `OPENAI_API_KEY` - OpenAI API key

#### Social Media (when implementing)
- `INSTAGRAM_APP_ID` - Instagram App ID
- `INSTAGRAM_APP_SECRET` - Instagram App Secret
- `FACEBOOK_APP_ID` - Facebook App ID
- `FACEBOOK_APP_SECRET` - Facebook App Secret

### Setting Environment Variables

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:
   - **Key**: Variable name (e.g., `DATABASE_URL`)
   - **Value**: Variable value
   - **Environment**: Select which environments (Production, Preview, Development)
5. Click "Save"
6. Redeploy to apply changes

## Step 4: Test Your Deployment

### 4.1 Test Frontend
1. Visit your deployment URL (e.g., `https://your-project.vercel.app`)
2. Verify the app loads correctly
3. Check browser console for errors

### 4.2 Test API Endpoints
1. Test health check: `https://your-project.vercel.app/api/health`
2. Should return: `{ status: 'ok', message: 'API is running' }`

### 4.3 Test Serverless Functions
```bash
# Test health endpoint
curl https://your-project.vercel.app/api/health

# Test login endpoint (mock)
curl -X POST https://your-project.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password"}'
```

## Step 5: Set Up Custom Domain (Optional)

1. Go to Vercel Dashboard → Project Settings → Domains
2. Add your custom domain (e.g., `app.realtystage.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation
5. SSL certificate will be automatically provisioned

## Step 6: Configure Database

### Option A: Supabase (Recommended - Free Tier Available)

1. Sign up at https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Add to Vercel environment variables as `DATABASE_URL`

### Option B: Neon (Recommended - Free Tier Available)

1. Sign up at https://neon.tech
2. Create a new project
3. Copy the connection string
4. Add to Vercel environment variables as `DATABASE_URL`

### Option C: Railway

1. Sign up at https://railway.app
2. Create a new PostgreSQL database
3. Copy the connection string
4. Add to Vercel environment variables as `DATABASE_URL`

## Step 7: Set Up File Storage

### Option A: AWS S3

1. Create AWS account
2. Create S3 bucket
3. Create IAM user with S3 permissions
4. Generate access keys
5. Add to Vercel environment variables:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `AWS_S3_BUCKET`

### Option B: Cloudinary (Easier Setup)

1. Sign up at https://cloudinary.com
2. Get API credentials from dashboard
3. Add to Vercel environment variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

## Step 8: Monitor Deployments

### View Logs
1. Go to Vercel Dashboard → Your Project
2. Click on a deployment
3. View build logs and runtime logs

### Set Up Alerts
1. Go to Project Settings → Notifications
2. Configure email notifications for deployments
3. Set up error alerts

## Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Verify all dependencies are in `package.json`
- Ensure build command is correct

### API Endpoints Not Working
- Verify serverless functions are in `api/` directory
- Check function exports are correct
- Review function logs in Vercel Dashboard

### Environment Variables Not Working
- Ensure variables are set for the correct environment (Production/Preview)
- Redeploy after adding environment variables
- Check variable names are correct (case-sensitive)

### CORS Errors
- Verify CORS headers in serverless functions
- Check `vercel.json` CORS configuration
- Ensure `VITE_API_URL` matches your deployment URL

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check database allows connections from Vercel IPs
- Ensure database is accessible (not behind firewall)

## Next Steps

1. ✅ Deploy to Vercel
2. ⏭️ Set up database (Supabase/Neon)
3. ⏭️ Configure file storage (S3/Cloudinary)
4. ⏭️ Implement authentication
5. ⏭️ Add API endpoints
6. ⏭️ Test all features
7. ⏭️ Set up custom domain

## Useful Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View logs
vercel logs

# Pull environment variables
vercel env pull .env.local

# List deployments
vercel ls
```

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
- Project Issues: Create an issue in your repository

## Security Notes

- Never commit `.env` files to git
- Use Vercel's environment variables for secrets
- Enable Vercel's security features
- Use HTTPS only (automatically enabled by Vercel)
- Regularly rotate API keys and secrets
- Use strong JWT secrets

---

Your application is now ready to deploy to Vercel! 🚀

