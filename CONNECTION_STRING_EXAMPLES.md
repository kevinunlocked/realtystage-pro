# Connection String Examples for Supabase

## Your Project Details
- **Project Reference**: `xkrtfpojmctcnuleaqvi`
- **Host**: `db.xkrtfpojmctcnuleaqvi.supabase.co`

## Connection String Options

### Option 1: Direct Connection with SSL (Try This First)

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres?sslmode=require"
```

### Option 2: Connection Pooler (Recommended for Vercel/Serverless)

Get this from Supabase Dashboard → Settings → Database → Connection Pooling

```env
DATABASE_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

**Note**: 
- User format: `postgres.xkrtfpojmctcnuleaqvi` (includes project ref)
- Host: `aws-0-us-east-1.pooler.supabase.com` (pooler host)
- Port: `6543` (pooler port, not 5432)

### Option 3: Connection Pooler with Region

Your region might be different. Check in Supabase Dashboard:

```env
# For us-east-1 region
DATABASE_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres"

# For us-west-1 region
DATABASE_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:YOUR_PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres"

# For eu-west-1 region
DATABASE_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:YOUR_PASSWORD@aws-0-eu-west-1.pooler.supabase.com:6543/postgres"
```

## How to Get the Correct Connection String

### Method 1: From Supabase Dashboard (Easiest)

1. **Go to Supabase Dashboard**
   - https://app.supabase.com
   - Select your project

2. **Settings → Database**
   - Click **Settings** (gear icon)
   - Click **Database**

3. **Connection Pooling Section**
   - Scroll to **Connection Pooling**
   - Click on **Session mode** or **Transaction mode**
   - Copy the **Connection string**
   - It will have the correct format and region

### Method 2: Check Your Region

1. **Go to Settings → General**
   - Check your project's **Region**
   - Use that region in the pooler URL

### Method 3: Use Direct Connection with SSL

If pooler doesn't work, try direct connection with SSL:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres?sslmode=require"
```

## Quick Test

After updating DATABASE_URL:

```bash
# Test connection
npx prisma db pull

# If successful, run migration
npx prisma migrate dev --name init
```

## Troubleshooting

### Still Can't Connect?

1. **Verify password is correct**
   - Reset in Supabase if needed
   - Make sure no typos

2. **Check database status**
   - Go to Supabase Dashboard
   - Verify database is running
   - Check for any errors

3. **Try both connection methods**
   - Try direct connection with SSL
   - Try connection pooler
   - See which one works

4. **Check network/firewall**
   - Make sure your network allows database connections
   - Try from different network if possible

5. **Verify project reference ID**
   - Should be: `xkrtfpojmctcnuleaqvi`
   - Check in Supabase Dashboard → Settings → General

## Recommended: Use Connection Pooler

For best results, especially with Vercel:
- Use Connection Pooler (port 6543)
- Get the exact URI from Supabase Dashboard
- Use Session mode for migrations
- Use Transaction mode for serverless functions

---

**Get the Connection Pooler URI from Supabase Dashboard - it's the most reliable!**

