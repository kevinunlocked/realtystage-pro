# Finding Your Supabase Database Password

## Important: Database Password vs Login Password

**The database password is DIFFERENT from your Supabase login password!**

- **Supabase Login Password**: What you use to login to Supabase (you login with GitHub, so you don't have this)
- **Database Password**: The password for your PostgreSQL database (set when you created the project)

## Where to Find Your Database Password

### Option 1: Check Project Creation (If You Remember)

When you created your Supabase project, you were asked to set a database password. This is what you need.

### Option 2: Reset Database Password in Supabase

If you don't remember the password, you can reset it:

1. **Go to Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Select your project: `realtystage-pro`

2. **Go to Settings → Database**
   - Click **Settings** (gear icon)
   - Click **Database** in the menu

3. **Reset Database Password**
   - Look for **Database Password** section
   - Click **Reset database password** or **Change database password**
   - Generate a new password
   - **SAVE THIS PASSWORD** - you'll need it for the connection string

4. **Update Connection String**
   - Use the new password in your connection string
   - Format: `postgresql://postgres:NEW_PASSWORD@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres`

### Option 3: Check Connection String in Supabase

Sometimes Supabase shows the connection string with the password masked:

1. **Go to Settings → Database**
2. **Look for Connection String section**
3. **Click "Reveal" or "Show" button** (if available)
4. **Copy the connection string** - it should have the password filled in

### Option 4: Check Project Settings

1. **Go to Settings → General**
2. **Look for Database section**
3. **Check if password is shown there** (usually masked)

## Setting a New Database Password

If you need to reset it:

1. **Go to Settings → Database**
2. **Find "Database Password" section**
3. **Click "Reset database password"**
4. **Generate or set a new password**
5. **Copy and save the password**
6. **Update your connection string in Vercel**

## Important Notes

### Password Requirements
- Must be at least 8 characters
- Can contain letters, numbers, and special characters
- Avoid special characters that need URL encoding if possible

### Special Characters in Password
If your password contains special characters, you may need to URL encode them:
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`

**Tip:** Use a password without special characters to avoid encoding issues.

## Step-by-Step: Reset Database Password

1. **Login to Supabase**
   - Go to https://app.supabase.com
   - Login with GitHub (your normal login)

2. **Select Your Project**
   - Click on `realtystage-pro`

3. **Go to Settings → Database**
   - Click **Settings** (gear icon)
   - Click **Database**

4. **Reset Password**
   - Scroll to **Database Password** section
   - Click **Reset database password** or **Change password**
   - Generate a new password (or create your own)
   - **Copy the password immediately** - Supabase may not show it again

5. **Update Connection String**
   - Use the new password in your connection string:
     ```
     postgresql://postgres:YOUR_NEW_PASSWORD@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres
     ```

6. **Add to Vercel**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `DATABASE_URL` with the new password
   - Or add it if you haven't already

## Quick Test

After you have the password:

1. **Test the connection string locally** (optional):
   ```bash
   # Create .env.local file (don't commit this!)
   echo "DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xkrtfpojmctcnuleaqvi.supabase.co:5432/postgres" > .env.local
   
   # Test with Prisma
   npx prisma db pull
   ```

2. **Or test after adding to Vercel**:
   - Add to Vercel first
   - Run migrations: `npx prisma migrate dev --name init`
   - Check for connection errors

## Troubleshooting

### Can't Find Password Reset Option?
- Make sure you're in the correct project
- Check that you have the right permissions
- Try refreshing the page
- Look for "Database settings" or "Connection settings"

### Password Reset Not Working?
- Check Supabase status page
- Try logging out and back in
- Contact Supabase support if needed

### Connection Still Failing?
- Verify password is correct (no typos)
- Check for special characters that need encoding
- Verify project reference ID: `xkrtfpojmctcnuleaqvi`
- Check that database is accessible

## Next Steps

After you have the database password:

1. ✅ Reset database password in Supabase (if needed)
2. ✅ Update connection string with actual password
3. ✅ Add `DATABASE_URL` to Vercel
4. ⏭️ Run migrations: `npx prisma migrate dev --name init`
5. ⏭️ Test connection: `npx prisma studio`

---

**The database password is separate from your GitHub login. Reset it in Supabase Settings → Database if you don't remember it!**

