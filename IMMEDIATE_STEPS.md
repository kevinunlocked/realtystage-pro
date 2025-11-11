# Immediate Steps - Set Up Environment Variables

## 🎯 What You Need Right Now

**Only ONE environment variable is required:**
- `VITE_API_URL` = `/api`

This allows your frontend to call your API endpoints on the same domain.

## 📸 Step-by-Step: Setting Up in Vercel

### Step 1: Open Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Sign in to your account
3. You should see your project: **realtystage-pro**

### Step 2: Navigate to Settings
1. Click on your project: **realtystage-pro**
2. Click on **Settings** in the top navigation bar
3. In the left sidebar, click on **Environment Variables**

### Step 3: Add Environment Variable
1. Click the **Add New** button
2. Fill in the form:
   - **Key**: `VITE_API_URL`
   - **Value**: `/api`
   - **Environment**: Check all three boxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. Click **Save**

### Step 4: Redeploy Your Application
1. Click on **Deployments** in the top navigation
2. Find your latest deployment
3. Click the **...** (three dots) menu
4. Click **Redeploy**
5. Wait 2-3 minutes for deployment to complete

### Step 5: Verify It Works
1. Visit your production URL (found in Deployments tab)
2. Open browser developer tools (F12)
3. Check the Console tab for errors
4. Test API: Visit `https://your-app.vercel.app/api/health`
5. Should see: `{ status: 'ok', message: 'API is running' }`

## ✅ That's It!

Your app is now configured and working with mock data. The API endpoints will respond with mock data until you implement the real backend logic.

## 🔄 What Happens Next?

### Current State
- ✅ Frontend is deployed and working
- ✅ API endpoints are available (returning mock data)
- ✅ Environment variable is set
- ✅ App is functional

### Next Steps (When Ready)
1. **Set up Database** (Supabase/Neon)
   - Add `DATABASE_URL` to Vercel
   - Set up Prisma
   - Create database schema

2. **Implement Authentication**
   - Add `JWT_SECRET` to Vercel
   - Implement real auth endpoints
   - Create login/register pages

3. **Set up File Storage** (S3/Cloudinary)
   - Add storage credentials to Vercel
   - Implement file upload API
   - Connect frontend to upload API

## 📋 Quick Checklist

- [ ] Set `VITE_API_URL=/api` in Vercel
- [ ] Redeploy application
- [ ] Test API endpoint works
- [ ] Verify app loads without errors
- [ ] Check browser console (no errors)

## 🆘 Troubleshooting

### Variable Not Working?
- Make sure you selected all environments (Production, Preview, Development)
- Redeploy after adding the variable
- Check the variable name is exactly `VITE_API_URL` (case-sensitive)

### API Not Responding?
- Check your production URL is correct
- Verify the variable is set for Production environment
- Check Vercel deployment logs for errors

### Build Failing?
- Check Vercel build logs
- Verify all dependencies are in package.json
- Check for syntax errors in code

## 📚 More Information

- **Full Environment Variables Guide**: See `ENVIRONMENT_VARIABLES.md`
- **Next Steps Guide**: See `NEXT_STEPS_GUIDE.md`
- **Setup Checklist**: See `SETUP_CHECKLIST.md`
- **Development Roadmap**: See `DEVELOPMENT_ROADMAP.md`

---

**You only need `VITE_API_URL` for now. Add other variables as you implement features!**

