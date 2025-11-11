# Fix Database Connection Issues

## Problem: Can't Reach Database Server

If you're getting connection errors, try these solutions:

## Solution 1: Use Connection Pooler (Recommended for External Connections)

Supabase recommends using the connection pooler for external connections:

1. **Go to Supabase Dashboard**
   - Settings → Database
   - Find **Connection Pooling** section

2. **Get Connection Pooler URI**
   - Look for **Connection Pooler** or **Session Mode**
   - Copy the pooler connection string
   - Format: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`

3. **Update DATABASE_URL in .env**
   - Use the pooler URI instead of direct connection
   - Port should be `6543` (not `5432`)

## Solution 2: Add SSL Parameter

Sometimes Supabase requires SSL connections:

1. **Update DATABASE_URL** to include SSL:
   ```
   DATABASE_URL="postgresql://postgres:PASSWORD@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres?sslmode=require"
   ```

2. **Or use connection string with SSL from Supabase dashboard**

## Solution 3: Check Database Status

1. **Verify database is running**
   - Go to Supabase Dashboard
   - Check project status
   - Make sure database is active

2. **Check IP restrictions**
   - Supabase should allow all IPs by default
   - But verify in Settings → Database → Network restrictions

## Solution 4: Use Supabase's Connection String from Dashboard

1. **Go to Settings → Database**
2. **Look for "Connection string" section**
3. **Copy the exact connection string** (not construct it manually)
4. **Use that exact string** in your .env file

## Solution 5: Test Connection in Supabase SQL Editor

1. **Go to Supabase Dashboard → SQL Editor**
2. **Run a test query:**
   ```sql
   SELECT version();
   ```
3. **If this works, database is accessible**
4. **The issue is with the connection string format**

## Recommended: Use Connection Pooler

For Vercel serverless functions and local development, use the connection pooler:

### Get Pooler URI from Supabase:

1. **Settings → Database → Connection Pooling**
2. **Copy the "Connection string" from Pooler section**
3. **It should look like:**
   ```
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

### Update .env:

```env
DATABASE_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

Note the differences:
- User: `postgres.xkrtfpojmctcnuleaqvi` (not just `postgres`)
- Host: `aws-0-us-east-1.pooler.supabase.com` (not `db.xkrtfpojmctcnuleaqvi.supabase.co`)
- Port: `6543` (not `5432`)

## Quick Fix: Try This Connection String Format

Update your DATABASE_URL in .env to:

```env
# Option 1: Direct connection with SSL
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres?sslmode=require"

# Option 2: Connection pooler (recommended)
DATABASE_URL="postgresql://postgres.xkrtfpojmctcnuleaqvi:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

## Verify Connection String

1. **Check password is correct**
2. **Verify project reference ID: `xkrtfpojmctcnuleaqvi`**
3. **Check for typos in connection string**
4. **Make sure no extra spaces or quotes**

## Test Connection

After updating DATABASE_URL:

```bash
# Test connection
npx prisma db pull

# If that works, run migration
npx prisma migrate dev --name init
```

## Common Issues

### Issue: Can't reach database server
- **Solution**: Use connection pooler or check database status

### Issue: Password authentication failed
- **Solution**: Verify password is correct, reset if needed

### Issue: Connection timeout
- **Solution**: Check internet connection, use pooler

### Issue: SSL required
- **Solution**: Add `?sslmode=require` to connection string

---

**Try using the connection pooler URI from Supabase Dashboard - that usually works better for external connections!**

