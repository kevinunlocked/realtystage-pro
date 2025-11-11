# Add Database URL to Vercel - Step by Step

## Your Connection String Format

✅ **Format is correct!** Your connection string should be:

```
postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres
```

**Important:** Replace `YOUR_ACTUAL_PASSWORD` with the password you set when creating the Supabase project.

## Step 1: Get Your Actual Password

1. **Remember your database password**
   - This is the password you set when creating the Supabase project
   - If you forgot it, you can reset it in Supabase Settings → Database → Database Password

2. **Construct the full connection string**
   - Replace `[YOUR_PASSWORD]` or `YOUR_ACTUAL_PASSWORD` with your actual password
   - Example: If password is `MyPass123!`, your string would be:
     ```
     postgresql://postgres:MyPass123!@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres
     ```

## Step 2: Add to Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click on your project: **realtystage-pro**

2. **Navigate to Environment Variables**
   - Click **Settings** (top navigation)
   - Click **Environment Variables** (left sidebar)

3. **Add DATABASE_URL**
   - Click **Add New** button
   - **Key**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres`
     - Replace `YOUR_ACTUAL_PASSWORD` with your actual password
   - **Environment**: Select all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **Save**

## Step 3: Verify Connection String

**Important Notes:**
- ✅ Make sure there are NO spaces in the connection string
- ✅ Make sure your password doesn't contain special characters that need URL encoding
- ✅ If your password has special characters, you may need to URL encode them:
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `$` becomes `%24`
  - `%` becomes `%25`
  - `&` becomes `%26`
  - `+` becomes `%2B`
  - `=` becomes `%3D`

## Step 4: Test Connection (Optional)

After adding to Vercel, you can test the connection:

1. **Test locally** (if you have the password):
   ```bash
   # Create a .env.local file (don't commit this!)
   echo "DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres" > .env.local
   
   # Test with Prisma
   npx prisma db pull
   ```

2. **Or test in Vercel** after deployment:
   - The connection will be tested when you run migrations
   - Check Vercel function logs for connection errors

## Step 5: Run Database Migrations

After adding DATABASE_URL to Vercel:

```bash
# Generate Prisma Client
npx prisma generate

# Create and run migration
npx prisma migrate dev --name init

# This will:
# - Create all tables in your database
# - Generate Prisma Client
# - Set up your database schema
```

## Troubleshooting

### Connection Failed?
- ✅ Check password is correct
- ✅ Verify no spaces in connection string
- ✅ Check special characters are URL encoded if needed
- ✅ Verify project reference ID is correct: `xkrtfpojmctcnuleaqvi`

### Password Has Special Characters?
If your password contains special characters, URL encode them:
- Example: Password `My@Pass#123` becomes `My%40Pass%23123`
- Or change your database password to one without special characters

### Forgot Password?
1. Go to Supabase Dashboard
2. Settings → Database
3. Click "Reset database password"
4. Generate a new password
5. Update the connection string in Vercel

## Next Steps

After adding DATABASE_URL to Vercel:

1. ✅ Add DATABASE_URL to Vercel
2. ⏭️ Run migrations: `npx prisma migrate dev --name init`
3. ⏭️ Generate Prisma Client: `npx prisma generate`
4. ⏭️ Test connection: `npx prisma studio`
5. ⏭️ Set up authentication
6. ⏭️ Implement API endpoints

---

**Once you've added DATABASE_URL to Vercel, let me know and we'll run the migrations!**

