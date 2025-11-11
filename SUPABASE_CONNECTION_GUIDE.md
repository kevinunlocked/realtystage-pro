# Supabase Connection String Guide

## Finding Your Database Connection String

The connection string location in Supabase can vary. Here are multiple ways to find it:

## Method 1: Settings → Database → Connection String (Most Common)

1. **Go to Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Select your project: `realtystage-pro`

2. **Navigate to Settings**
   - Click on **Settings** (gear icon) in the left sidebar
   - Or click on your project name → **Settings**

3. **Go to Database Section**
   - Click on **Database** in the Settings menu
   - Scroll down to find **Connection string** or **Connection info**

4. **Find Connection String**
   - Look for **URI** or **Connection string** section
   - You might see tabs: **URI**, **JDBC**, **Golang**, etc.
   - Click on **URI** tab
   - Copy the connection string

## Method 2: Project Settings → Database → Connection Pooling

1. **Go to Project Settings**
   - Click on **Project Settings** (or just **Settings**)

2. **Database Section**
   - Click **Database** in the left menu

3. **Connection String**
   - Look for **Connection string** section
   - You should see different connection modes:
     - **Direct connection**
     - **Connection pooling**
     - **Session mode**

4. **Copy URI**
   - Use the **Direct connection** URI
   - Format: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

## Method 3: Database → Connection Info (Alternative Location)

1. **Go to Database Tab**
   - Click on **Database** in the left sidebar (not Settings)

2. **Connection Info**
   - Look for **Connection info** or **Connection string** button
   - Click on it to reveal the connection string

## Method 4: Construct It Manually

If you can't find the connection string, you can construct it manually:

1. **Find Your Project Details**
   - Go to **Settings** → **General**
   - Note your **Project Reference ID** (looks like: `abcdefghijklmnop`)
   - Note your **Database Password** (the one you set when creating the project)

2. **Construct Connection String**
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```
   
   Replace:
   - `[YOUR-PASSWORD]` with your database password
   - `[PROJECT-REF]` with your project reference ID

3. **Example:**
   ```
   postgresql://postgres:mypassword123@db.abcdefghijklmnop.supabase.co:5432/postgres
   ```

## Method 5: Use Connection Pooler (Recommended for Serverless)

For Vercel serverless functions, you might want to use the connection pooler:

1. **Go to Settings → Database**
2. **Look for "Connection Pooling"**
3. **Use the Connection Pooler URI**
   - Format: `postgresql://postgres.[PROJECT-REF]:[POOLER-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
   - Or: `postgresql://postgres.[PROJECT-REF]:[POOLER-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`

## What You're Looking For

The connection string should look like one of these:

### Direct Connection:
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### Connection Pooler (Recommended for Vercel):
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

## Step-by-Step: Current Supabase UI (2024)

1. **Login to Supabase**
   - Go to https://app.supabase.com
   - Login with your account

2. **Select Your Project**
   - Click on your project: `realtystage-pro`

3. **Go to Settings**
   - Look for **Settings** icon (gear ⚙️) in the left sidebar
   - Or click on your project name in the top left → **Settings**

4. **Click on Database**
   - In the Settings menu, click **Database**
   - You should see database settings

5. **Find Connection String**
   - Scroll down to find **Connection string** section
   - Look for **URI** tab or **Connection info** section
   - You might need to click **Show connection string** or **Reveal** button

6. **Copy the String**
   - Click on **URI** tab
   - Copy the entire connection string
   - It should start with `postgresql://`

## Alternative: Get It from Project API

If you still can't find it:

1. **Go to Settings → API**
2. **Look for Database URL**
3. **Or check Settings → Database → Connection parameters**
   - You'll see:
     - Host
     - Database name
     - Port
     - User
     - Password
   - Construct the URI manually using these values

## For Vercel (Recommended: Use Connection Pooler)

For serverless functions on Vercel, use the **Connection Pooler** instead of direct connection:

1. **Go to Settings → Database**
2. **Find "Connection Pooling" section**
3. **Enable Connection Pooling** (if not already enabled)
4. **Copy the Pooler URI**
   - Format: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@[POOLER-HOST]:6543/postgres`

## Troubleshooting

### Can't Find Connection String?
- Make sure you're in the correct project
- Check that you have the right permissions
- Try refreshing the page
- Look for "Connection info" or "Database URL" instead

### Connection String Not Working?
- Verify your password is correct
- Check that the project reference ID is correct
- Make sure you're using the right connection mode (direct vs pooler)
- For Vercel, use Connection Pooler (port 6543) instead of direct (port 5432)

### Still Stuck?
- Check Supabase documentation: https://supabase.com/docs/guides/database/connecting-to-postgres
- Use Supabase's SQL Editor to verify connection
- Contact Supabase support

## Quick Test

Once you have the connection string, test it:

```bash
# Test connection locally (if you have psql installed)
psql "postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Or test with Prisma
npx prisma db pull
```

## Next Steps

After you get the connection string:

1. **Add to Vercel**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `DATABASE_URL` = `your-connection-string`
   - Select: Production, Preview, Development
   - Click **Save**

2. **Run Migrations**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

---

**If you still can't find it, tell me what you see in your Supabase Dashboard and I'll help you locate it!**

