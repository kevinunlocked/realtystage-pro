# Step-by-Step: Database Setup (Final Solution)

## The Problem

- Connection poolers don't support Prisma migrations (prepared statements)
- Direct connections are blocked by Supabase
- Need alternative approach

## ✅ Solution: Manual Table Creation (5 Minutes)

### Step 1: Open Supabase SQL Editor

1. Go to: https://app.supabase.com
2. Select your project: `realtystage-pro`
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**

### Step 2: Copy and Run SQL Script

1. Open file: `supabase_create_tables.sql` (in your project root)
2. Select **ALL** the SQL code (Cmd/Ctrl + A)
3. Copy it (Cmd/Ctrl + C)
4. Paste into Supabase SQL Editor
5. Click **Run** button (or Cmd/Ctrl + Enter)
6. Wait for "Success" message

### Step 3: Verify Tables Created

1. Go to **Table Editor** in Supabase Dashboard
2. You should see 5 tables:
   - ✅ User
   - ✅ Asset  
   - ✅ StagingProject
   - ✅ VideoProject
   - ✅ ScheduledPost

### Step 4: Generate Prisma Client

After tables are created, run:

```bash
npx prisma generate
```

This generates the Prisma Client for your database.

### Step 5: Test Database Connection

```bash
npx prisma studio
```

This opens a web interface at http://localhost:5555 where you can:
- View all tables
- See table structure
- View data (once you add some)
- Test database operations

### Step 6: Create Migration Record (Optional)

Since we created tables manually, create a migration record:

```bash
# Create migration directory
mkdir -p prisma/migrations/0_init

# Create migration file
cat > prisma/migrations/0_init/migration.sql << 'MIGRATION'
-- Tables created manually in Supabase SQL Editor
-- See: supabase_create_tables.sql
MIGRATION

# Mark migration as applied
npx prisma migrate resolve --applied 0_init
```

## What Gets Created

### Tables:
1. **User** - User accounts and authentication
2. **Asset** - Property photos, videos, documents
3. **StagingProject** - AI staging projects
4. **VideoProject** - Video generation projects
5. **ScheduledPost** - Social media scheduled posts

### Indexes:
- Email index on User (for fast lookups)
- Foreign key indexes (for fast joins)
- Status and date indexes (for filtering)

### Relationships:
- User → Assets (one-to-many)
- User → StagingProjects (one-to-many)
- User → VideoProjects (one-to-many)
- User → ScheduledPosts (one-to-many)

## Connection Strings

### For Local Development (.env)
```env
DATABASE_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:Chisango1234@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"
DIRECT_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:Chisango1234@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"
```

### For Vercel Production
Add to Vercel Environment Variables:
```
DATABASE_URL=postgresql://postgres.xkrtfpojmctcnuleaqvi:Chisango1234@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
DIRECT_URL=postgresql://postgres.xkrtfpojmctcnuleaqvi:Chisango1234@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

## Verification Checklist

After setup, verify:

- [ ] Tables created in Supabase (Table Editor)
- [ ] Prisma Client generated (`npx prisma generate`)
- [ ] Prisma Studio opens (`npx prisma studio`)
- [ ] Can see all 5 tables in Prisma Studio
- [ ] Connection string works
- [ ] DATABASE_URL added to Vercel

## Next Steps

After database is set up:

1. ✅ Database tables created
2. ✅ Prisma Client generated
3. ⏭️ Set up authentication
4. ⏭️ Update API endpoints to use database
5. ⏭️ Test database operations
6. ⏭️ Implement file storage
7. ⏭️ Connect AI services

## Troubleshooting

### SQL Script Fails?
- Check for syntax errors
- Verify you're in the correct project
- Check Supabase logs for errors
- Make sure tables don't already exist

### Prisma Client Not Working?
- Verify tables exist in Supabase
- Run `npx prisma generate` again
- Check connection string is correct
- Verify DATABASE_URL in .env

### Can't See Tables in Prisma Studio?
- Check connection string
- Verify tables were created
- Check Prisma Studio is using correct DATABASE_URL
- Try refreshing Prisma Studio

---

**Follow these steps - it's the most reliable way to set up your database!**



