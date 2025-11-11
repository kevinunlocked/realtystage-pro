# Quick Deploy to Vercel - Step by Step

This is a simplified step-by-step guide to get your app deployed to Vercel quickly.

## Prerequisites Check

Before starting, make sure you have:
- ✅ Git repository set up
- ✅ Code committed and pushed to GitHub/GitLab/Bitbucket
- ✅ Vercel account (or create one at https://vercel.com)

## Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Push to Git
```bash
# If not already done
git add .
git commit -m "Ready for Vercel deployment"
git push
```

### Step 2: Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Sign in (or create account with GitHub/GitLab/Bitbucket)

### Step 3: Import Project
1. Click **"Add New..."** button (top right)
2. Click **"Project"**
3. Import your Git repository
4. Select your repository from the list

### Step 4: Configure Project
Vercel should auto-detect your settings, but verify:
- **Framework Preset**: Vite ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `build` ✅
- **Install Command**: `npm install` ✅

### Step 5: Add Environment Variables (Optional for now)
You can skip this for the initial deployment, but you'll need these later:
- Click **"Environment Variables"**
- Add `VITE_API_URL` = `/api` (for production)
- Click **"Add"** for each variable

### Step 6: Deploy
1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. You'll see a success message with your deployment URL
4. Click the URL to visit your live app!

### Step 7: Update API URL
After first deployment:
1. Go to **Project Settings** → **Environment Variables**
2. Add/Update `VITE_API_URL` = `https://your-project.vercel.app/api`
3. Click **"Redeploy"** to apply changes

## Method 2: Deploy via Vercel CLI (Advanced)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```
Follow the prompts to authenticate.

### Step 3: Deploy
```bash
# From your project root directory
vercel
```

### Step 4: Follow Prompts
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No** (first time)
- Project name? Press Enter (uses folder name)
- Directory? Press Enter (uses current directory)
- Override settings? **No**

### Step 5: Deploy to Production
```bash
vercel --prod
```

## Testing Your Deployment

### 1. Test Frontend
Visit your deployment URL (e.g., `https://your-project.vercel.app`)
- ✅ App should load
- ✅ No console errors
- ✅ Navigation works

### 2. Test API
Visit: `https://your-project.vercel.app/api/health`
- ✅ Should return: `{ status: 'ok', message: 'API is running' }`

### 3. Test API Endpoints
```bash
# Health check
curl https://your-project.vercel.app/api/health

# Login (mock)
curl -X POST https://your-project.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password"}'
```

## Common Issues & Fixes

### Issue: Build Fails
**Fix**: 
- Check build logs in Vercel dashboard
- Verify `package.json` has all dependencies
- Check for syntax errors

### Issue: API Not Working
**Fix**:
- Verify `api/` directory exists
- Check serverless function exports
- Review function logs in Vercel dashboard

### Issue: CORS Errors
**Fix**:
- Already handled in `vercel.json` and API functions
- Verify `VITE_API_URL` is set correctly

### Issue: Environment Variables Not Working
**Fix**:
- Variables must be set for "Production" environment
- Redeploy after adding variables
- Check for typos in variable names

## Next Steps After Deployment

1. ✅ **Test your deployment** - Verify everything works
2. ⏭️ **Set up database** - Supabase/Neon (free tiers available)
3. ⏭️ **Configure file storage** - AWS S3 or Cloudinary
4. ⏭️ **Implement authentication** - Add real auth endpoints
5. ⏭️ **Add API endpoints** - Implement your backend logic
6. ⏭️ **Set up custom domain** - Add your own domain (optional)

## Environment Variables You'll Need Later

When you're ready to implement features, add these in Vercel Dashboard:

### Database
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

### Authentication
```
JWT_SECRET=your-random-secret-string
JWT_REFRESH_SECRET=your-random-secret-string
```

### File Storage (AWS S3)
```
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

### AI Services
```
REPLICATE_API_TOKEN=your-replicate-token
OPENAI_API_KEY=your-openai-key
```

## Useful Vercel Dashboard Links

- **Deployments**: View all deployments and logs
- **Settings**: Configure project settings
- **Environment Variables**: Manage environment variables
- **Domains**: Add custom domains
- **Analytics**: View usage and performance (if enabled)

## Getting Help

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Project Issues**: Check deployment logs in Vercel dashboard

## Success! 🎉

Once deployed, you'll have:
- ✅ Live frontend at `https://your-project.vercel.app`
- ✅ API endpoints at `https://your-project.vercel.app/api/*`
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push (if configured)

Your app is now live! 🚀

