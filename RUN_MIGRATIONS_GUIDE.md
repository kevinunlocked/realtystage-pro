# Running Prisma Migrations - Step by Step Guide

## Prerequisites

Before running migrations, you need:

1. ✅ DATABASE_URL set up (connection string with actual password)
2. ✅ Prisma installed (already done)
3. ✅ Database schema created (already done)

## Step 1: Set Up Local Environment Variable

For local development, you need DATABASE_URL in a `.env` file:

### Option A: Create .env file manually

1. **Create `.env` file** in your project root:
   ```bash
   touch .env
   ```

2. **Add DATABASE_URL** to `.env`:
   ```
   DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres"
   ```
   Replace `YOUR_ACTUAL_PASSWORD` with your actual database password.

3. **Verify .env is in .gitignore** (should already be there)

### Option B: Copy from .env.example

1. **Copy .env.example to .env**:
   ```bash
   cp .env.example .env
   ```

2. **Update DATABASE_URL** in `.env` with your actual password

## Step 2: Generate Prisma Client

This creates the Prisma Client that you'll use to interact with your database:

```bash
npx prisma generate
```

**What this does:**
- Reads your `prisma/schema.prisma` file
- Generates TypeScript types for your models
- Creates Prisma Client in `node_modules/.prisma/client`

## Step 3: Create and Run Migration

This creates all the tables in your database:

```bash
npx prisma migrate dev --name init
```

**What this does:**
- Creates a migration file in `prisma/migrations/`
- Applies the migration to your database
- Creates all tables (User, Asset, StagingProject, etc.)
- Tracks migration history

**Expected output:**
```
✔ Generated Prisma Client
✔ Created migration `20240101000000_init`
✔ Applied migration `20240101000000_init`
```

## Step 4: Verify Database (Optional)

Open Prisma Studio to view your database in a web UI:

```bash
npx prisma studio
```

**What this does:**
- Opens a web interface at http://localhost:5555
- Shows all your database tables
- Lets you view and edit data
- Useful for testing and debugging

## Troubleshooting

### Error: Can't reach database server

**Problem:** Connection string is incorrect or database is not accessible

**Solution:**
- Verify DATABASE_URL is correct in `.env` file
- Check that password is correct
- Verify project reference ID: `xkrtfpojmctcnuleaqvi`
- Make sure database is accessible from your IP (Supabase should allow all by default)

### Error: Password authentication failed

**Problem:** Database password is incorrect

**Solution:**
- Reset database password in Supabase
- Update DATABASE_URL in `.env` file
- Try again

### Error: Database does not exist

**Problem:** Database name is incorrect

**Solution:**
- Verify database name is `postgres` (default for Supabase)
- Check connection string format

### Error: Migration failed

**Problem:** Migration couldn't be applied

**Solution:**
- Check database connection
- Verify schema is correct
- Check Prisma logs for specific error
- Make sure database is empty (or reset it in Supabase)

## What Happens After Migration

After running migrations successfully:

1. ✅ All tables are created in your database
2. ✅ Prisma Client is generated
3. ✅ You can start using the database in your API

## Next Steps

After migrations are successful:

1. ✅ Database is set up
2. ⏭️ Set up authentication (add JWT secrets)
3. ⏭️ Update API endpoints to use database
4. ⏭️ Test database connection in your API

## Commands Reference

```bash
# Generate Prisma Client
npx prisma generate

# Create and run migration
npx prisma migrate dev --name init

# View database in browser
npx prisma studio

# Check database connection
npx prisma db pull

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View migration status
npx prisma migrate status
```

## Important Notes

### .env File
- ✅ `.env` is already in `.gitignore` (won't be committed)
- ✅ Never commit `.env` file to git
- ✅ Use `.env.example` as a template
- ✅ Add actual values to `.env` locally

### Database Password
- ✅ Keep your database password secure
- ✅ Don't share it publicly
- ✅ Use environment variables in Vercel (not in code)

### Migration Files
- ✅ Migration files in `prisma/migrations/` are committed to git
- ✅ These are safe to commit (they don't contain passwords)
- ✅ They track your database schema changes

---

**Ready to run migrations? Make sure DATABASE_URL is set in your .env file first!**

