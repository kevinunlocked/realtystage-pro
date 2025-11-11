# Quick Migration Steps

## Current Status

✅ Prisma Client generated
⚠️  Need DATABASE_URL in .env file to run migrations

## Step 1: Add DATABASE_URL to .env

1. **Open `.env` file** in your project root
2. **Add this line** (replace `YOUR_PASSWORD` with your actual database password):

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres"
```

**Example** (if your password is `MySecurePass123`):
```env
DATABASE_URL="postgresql://postgres:MySecurePass123@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres"
```

## Step 2: Run Migration

After adding DATABASE_URL to .env, run:

```bash
npx prisma migrate dev --name init
```

This will:
- Create migration file
- Create all tables in your database
- Set up your database schema

## Step 3: Verify Database

Open Prisma Studio to view your database:

```bash
npx prisma studio
```

This opens a web interface at http://localhost:5555 where you can view your database tables.

## Troubleshooting

### Error: Can't reach database server
- Check DATABASE_URL is correct in .env
- Verify password is correct
- Check internet connection
- Verify Supabase database is accessible

### Error: Password authentication failed
- Verify password is correct (no typos)
- Reset database password in Supabase if needed
- Update DATABASE_URL in .env

### Migration succeeds but can't see tables
- Check Prisma Studio: `npx prisma studio`
- Verify you're looking at the correct database
- Check Supabase dashboard → Table Editor

## Next Steps After Migration

1. ✅ Database tables created
2. ⏭️ Add DATABASE_URL to Vercel (for production)
3. ⏭️ Set up authentication
4. ⏭️ Update API endpoints to use database

---

**Add DATABASE_URL to .env file, then run the migration command!**

