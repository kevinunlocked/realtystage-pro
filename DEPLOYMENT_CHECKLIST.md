# Vercel Deployment Checklist

Use this checklist to ensure a successful deployment to Vercel.

## Pre-Deployment

- [ ] Code is committed to Git repository
- [ ] Repository is pushed to GitHub/GitLab/Bitbucket
- [ ] All dependencies are in `package.json`
- [ ] Build command works locally (`npm run build`)
- [ ] No console errors in development
- [ ] Environment variables documented

## Vercel Setup

### Account & Project
- [ ] Vercel account created
- [ ] Project imported from Git repository
- [ ] Framework preset set to "Vite" (auto-detected)
- [ ] Root directory set to `./` (default)
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`
- [ ] Install command: `npm install`

### Configuration Files
- [ ] `vercel.json` exists and is correct
- [ ] `api/` directory exists with serverless functions
- [ ] `.vercelignore` exists (optional but recommended)

## Environment Variables

### Frontend Variables
- [ ] `VITE_API_URL` - Set to `/api` for production (same domain)
- [ ] `NODE_ENV` - Set to `production`

### Backend Variables (when implementing)
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `JWT_SECRET` - Random secure string
- [ ] `JWT_REFRESH_SECRET` - Random secure string
- [ ] `AWS_ACCESS_KEY_ID` - AWS S3 access key (if using S3)
- [ ] `AWS_SECRET_ACCESS_KEY` - AWS S3 secret key (if using S3)
- [ ] `AWS_REGION` - AWS region (if using S3)
- [ ] `AWS_S3_BUCKET` - S3 bucket name (if using S3)
- [ ] `REPLICATE_API_TOKEN` - Replicate API token (if using)
- [ ] `OPENAI_API_KEY` - OpenAI API key (if using)

### Social Media Variables (when implementing)
- [ ] `INSTAGRAM_APP_ID` - Instagram App ID
- [ ] `INSTAGRAM_APP_SECRET` - Instagram App Secret
- [ ] `FACEBOOK_APP_ID` - Facebook App ID
- [ ] `FACEBOOK_APP_SECRET` - Facebook App Secret

## Deployment

- [ ] Initial deployment completed
- [ ] Deployment URL obtained
- [ ] Build logs reviewed (no errors)
- [ ] Frontend loads correctly
- [ ] API endpoints accessible

## Testing

### Frontend
- [ ] App loads without errors
- [ ] All routes work (navigation)
- [ ] No console errors
- [ ] Responsive design works
- [ ] Images and assets load correctly

### API Endpoints
- [ ] Health check works: `/api/health`
- [ ] CORS headers are set correctly
- [ ] API responses are correct
- [ ] Error handling works

### Serverless Functions
- [ ] Functions are accessible
- [ ] Functions handle requests correctly
- [ ] Functions handle errors gracefully
- [ ] Logs are accessible in Vercel dashboard

## Post-Deployment

### Domain (Optional)
- [ ] Custom domain configured (if applicable)
- [ ] DNS records set correctly
- [ ] SSL certificate provisioned
- [ ] Domain redirects work

### Monitoring
- [ ] Error tracking set up (optional)
- [ ] Analytics configured (optional)
- [ ] Deployment notifications enabled
- [ ] Logs accessible

### Security
- [ ] Environment variables are secure
- [ ] API keys are not exposed
- [ ] CORS is configured correctly
- [ ] HTTPS is enabled (automatic on Vercel)

## Troubleshooting

### Build Fails
- [ ] Check build logs in Vercel dashboard
- [ ] Verify all dependencies are in `package.json`
- [ ] Check for syntax errors
- [ ] Verify build command is correct

### API Not Working
- [ ] Verify serverless functions are in `api/` directory
- [ ] Check function exports are correct
- [ ] Review function logs
- [ ] Verify CORS configuration

### Environment Variables Not Working
- [ ] Variables are set for correct environment (Production)
- [ ] Variables are redeployed after adding
- [ ] Variable names are correct (case-sensitive)
- [ ] No typos in variable values

### Database Connection Issues
- [ ] `DATABASE_URL` is correct
- [ ] Database allows connections from Vercel
- [ ] Database is accessible (not behind firewall)
- [ ] Database credentials are correct

## Next Steps After Deployment

- [ ] Set up database (Supabase/Neon/Railway)
- [ ] Configure file storage (S3/Cloudinary)
- [ ] Implement authentication
- [ ] Add API endpoints
- [ ] Test all features
- [ ] Set up monitoring
- [ ] Configure backups

## Useful Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View logs
vercel logs

# Pull environment variables locally
vercel env pull .env.local

# List deployments
vercel ls

# Remove deployment
vercel remove
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

Check off items as you complete them to track your deployment progress!

