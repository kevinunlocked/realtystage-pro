# Troubleshooting Database Connection Issues

## Problem Summary

The migration is failing because:
1. Connection poolers don't support Prisma migrations (prepared statements issue)
2. Direct connection (port 5432) can't be reached (network/firewall issue)
3. Need alternative approach for Supabase

## Solution Options

### Option 1: Create Tables Manually in Supabase (Recommended - Fastest)

Since Prisma migrations are having connection issues, we can create the tables directly in Supabase:

1. **Go to Supabase Dashboard → SQL Editor**
2. **Run the SQL script below** to create all tables
3. **Then use Prisma to generate client only** (no migration needed)

### Option 2: Fix Connection String Format

The connection string might need adjustments:
- Verify the exact format from Supabase
- Check if IP restrictions are enabled
- Try different connection modes

### Option 3: Use Supabase Migrations

Supabase has its own migration system that might work better.

## Recommended: Create Tables Manually

This is the fastest way to get your database set up:

1. **Go to Supabase Dashboard**
2. **SQL Editor → New Query**
3. **Run the SQL script** (provided below)
4. **Verify tables are created**
5. **Generate Prisma Client** (no migration needed)

## SQL Script to Create Tables

Run this in Supabase SQL Editor:

```sql
-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'agent',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Create unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");

-- Create Asset table
CREATE TABLE IF NOT EXISTS "Asset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "size" INTEGER NOT NULL,
    "metadata" JSONB,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- Create indexes on Asset
CREATE INDEX IF NOT EXISTS "Asset_uploadedById_idx" ON "Asset"("uploadedById");
CREATE INDEX IF NOT EXISTS "Asset_type_idx" ON "Asset"("type");

-- Create StagingProject table
CREATE TABLE IF NOT EXISTS "StagingProject" (
    "id" TEXT NOT NULL,
    "originalImageId" TEXT NOT NULL,
    "stagedImageUrl" TEXT,
    "style" TEXT NOT NULL,
    "parameters" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StagingProject_pkey" PRIMARY KEY ("id")
);

-- Create index on StagingProject
CREATE INDEX IF NOT EXISTS "StagingProject_createdById_idx" ON "StagingProject"("createdById");

-- Create VideoProject table
CREATE TABLE IF NOT EXISTS "VideoProject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "assetIds" TEXT[] NOT NULL,
    "outputUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "settings" JSONB NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoProject_pkey" PRIMARY KEY ("id")
);

-- Create index on VideoProject
CREATE INDEX IF NOT EXISTS "VideoProject_createdById_idx" ON "VideoProject"("createdById");

-- Create ScheduledPost table
CREATE TABLE IF NOT EXISTS "ScheduledPost" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "platforms" TEXT[] NOT NULL,
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "assetIds" TEXT[] NOT NULL,
    "engagement" JSONB,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScheduledPost_pkey" PRIMARY KEY ("id")
);

-- Create indexes on ScheduledPost
CREATE INDEX IF NOT EXISTS "ScheduledPost_createdById_idx" ON "ScheduledPost"("createdById");
CREATE INDEX IF NOT EXISTS "ScheduledPost_scheduledFor_idx" ON "ScheduledPost"("scheduledFor");

-- Create foreign key constraints
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "StagingProject" ADD CONSTRAINT "StagingProject_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "VideoProject" ADD CONSTRAINT "VideoProject_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ScheduledPost" ADD CONSTRAINT "ScheduledPost_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

## After Creating Tables Manually

1. **Verify tables are created:**
   - Go to Supabase Dashboard → Table Editor
   - You should see: User, Asset, StagingProject, VideoProject, ScheduledPost

2. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

3. **Mark migration as applied (optional):**
   ```bash
   npx prisma migrate resolve --applied init
   ```

4. **Test connection:**
   ```bash
   npx prisma studio
   ```

## Alternative: Check Supabase Network Settings

1. **Go to Supabase Dashboard → Settings → Database**
2. **Check "Network Restrictions"**
3. **Make sure your IP is allowed** (or allow all IPs)
4. **Check if "Connection Pooling" is enabled**
5. **Verify database is running**

## Alternative: Use Different Connection String

Try getting the connection string directly from Supabase:

1. **Settings → Database → Connection String**
2. **Copy the exact string** (don't modify it)
3. **Use that exact string** in .env

## Why This Happens

1. **Connection Poolers**: Don't support prepared statements (used by Prisma migrations)
2. **Network Restrictions**: Supabase might block direct connections
3. **Firewall**: Your network might block database ports
4. **SSL Requirements**: Connection might need specific SSL settings

## Quick Fix: Use Supabase SQL Editor

The fastest solution is to create tables manually in Supabase SQL Editor, then use Prisma Client to interact with them. This avoids migration connection issues entirely.

---

**Recommended: Create tables manually in Supabase SQL Editor, then generate Prisma Client!**

