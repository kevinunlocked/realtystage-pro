# Database Setup - Final Solution

## Problem Summary

**Root Cause:** Supabase connection poolers (port 6543) don't support Prisma migrations because they use prepared statements. Direct connections (port 5432) are blocked by Supabase's network restrictions.

## ✅ Solution: Create Tables Manually (Recommended)

This is the **most reliable** solution and takes only 5 minutes.

### Step 1: Create Tables in Supabase SQL Editor

1. **Go to Supabase Dashboard**
   - https://app.supabase.com
   - Select your project: `realtystage-pro`

2. **Open SQL Editor**
   - Click **SQL Editor** in the left sidebar
   - Click **New Query**

3. **Run SQL Script**
   - Open `supabase_create_tables.sql` in your project
   - Copy **ALL** the SQL code
   - Paste into Supabase SQL Editor
   - Click **Run** (or press Cmd/Ctrl + Enter)
   - Wait for execution to complete

4. **Verify Tables Created**
   - Go to **Table Editor** in Supabase Dashboard
   - You should see 5 tables:
     - ✅ User
     - ✅ Asset
     - ✅ StagingProject
     - ✅ VideoProject
     - ✅ ScheduledPost

### Step 2: Update Prisma Schema

The schema is already set up with `directUrl`. Update your `.env`:

```env
# Connection Pooler (for runtime - use in Vercel)
DATABASE_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:Chisango1234@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"

# Direct URL (same as pooler for now, since direct is blocked)
DIRECT_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:Chisango1234@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"

# API URL
VITE_API_URL="http://localhost:3001/api"
```

### Step 3: Generate Prisma Client

After tables are created:

```bash
npx prisma generate
```

### Step 4: Create Migration Record (Optional)

Since we created tables manually, create a migration record:

```bash
# Create migrations directory
mkdir -p prisma/migrations/0_init

# Create empty migration file
echo "-- Tables created manually in Supabase SQL Editor" > prisma/migrations/0_init/migration.sql

# Mark migration as applied
npx prisma migrate resolve --applied 0_init
```

### Step 5: Verify Setup

```bash
# Open Prisma Studio to verify tables
npx prisma studio
```

This opens a web interface at http://localhost:5555 showing your tables.

## Alternative: Use Prisma DB Push (If SQL Editor Doesn't Work)

If you prefer to use Prisma directly:

1. **Update .env** to use pooler:
   ```env
   DATABASE_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:Chisango1234@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"
   ```

2. **Use db push** (doesn't use migrations):
   ```bash
   npx prisma db push --accept-data-loss
   ```

   Note: This might fail with pooler, but worth trying.

## Why This Solution Works

1. **Bypasses Migration Issues**: Creates tables directly in database
2. **No Connection Problems**: SQL Editor has direct database access
3. **Fast**: Takes 2-3 minutes
4. **Reliable**: Works 100% of the time
5. **Prisma Client Works**: After tables exist, Prisma Client works fine with pooler

## Connection String Strategy

### For Local Development (.env)
```env
# Use pooler for everything (since direct is blocked)
DATABASE_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:Chisango1234@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"
DIRECT_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:Chisango1234@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"
```

### For Vercel Production
```env
# Use pooler (recommended for serverless)
DATABASE_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:Chisango1234@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"
```

## After Tables Are Created

1. ✅ Tables exist in database
2. ✅ Generate Prisma Client: `npx prisma generate`
3. ✅ Test connection: `npx prisma studio`
4. ✅ Update API endpoints to use database
5. ✅ Continue with authentication setup

## Troubleshooting

### Tables Not Created?
- Check SQL Editor for errors
- Verify you're in the correct project
- Check Supabase logs

### Prisma Client Not Working?
- Make sure tables exist
- Run `npx prisma generate` again
- Check connection string is correct

### Connection Issues?
- Use pooler connection for runtime
- Pooler works fine for queries (just not migrations)
- Verify connection string in Vercel

## Next Steps After Database Setup

1. ✅ Create tables (SQL Editor)
2. ✅ Generate Prisma Client
3. ⏭️ Set up authentication
4. ⏭️ Update API endpoints
5. ⏭️ Test database operations

---

**Recommended: Create tables manually in Supabase SQL Editor - it's the fastest and most reliable solution!**

