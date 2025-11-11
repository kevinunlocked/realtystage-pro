-- =====================================================
-- Supabase SQL Script to Create Database Tables
-- Run this in Supabase Dashboard → SQL Editor
-- =====================================================

-- Enable UUID extension (if needed)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist (for clean setup)
-- WARNING: This will delete all data if tables exist
-- DROP TABLE IF EXISTS "ScheduledPost" CASCADE;
-- DROP TABLE IF EXISTS "VideoProject" CASCADE;
-- DROP TABLE IF EXISTS "StagingProject" CASCADE;
-- DROP TABLE IF EXISTS "Asset" CASCADE;
-- DROP TABLE IF EXISTS "User" CASCADE;

-- =====================================================
-- Create User table
-- =====================================================
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'agent',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Create unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");

-- =====================================================
-- Create Asset table
-- =====================================================
CREATE TABLE IF NOT EXISTS "Asset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "size" INTEGER NOT NULL,
    "metadata" JSONB DEFAULT '{}'::jsonb,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- Create indexes on Asset
CREATE INDEX IF NOT EXISTS "Asset_uploadedById_idx" ON "Asset"("uploadedById");
CREATE INDEX IF NOT EXISTS "Asset_type_idx" ON "Asset"("type");

-- Create foreign key constraint
ALTER TABLE "Asset" 
DROP CONSTRAINT IF EXISTS "Asset_uploadedById_fkey",
ADD CONSTRAINT "Asset_uploadedById_fkey" 
FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- =====================================================
-- Create StagingProject table
-- =====================================================
CREATE TABLE IF NOT EXISTS "StagingProject" (
    "id" TEXT NOT NULL,
    "originalImageId" TEXT NOT NULL,
    "stagedImageUrl" TEXT,
    "style" TEXT NOT NULL,
    "parameters" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StagingProject_pkey" PRIMARY KEY ("id")
);

-- Create index on StagingProject
CREATE INDEX IF NOT EXISTS "StagingProject_createdById_idx" ON "StagingProject"("createdById");

-- Create foreign key constraint
ALTER TABLE "StagingProject" 
DROP CONSTRAINT IF EXISTS "StagingProject_createdById_fkey",
ADD CONSTRAINT "StagingProject_createdById_fkey" 
FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- =====================================================
-- Create VideoProject table
-- =====================================================
CREATE TABLE IF NOT EXISTS "VideoProject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "assetIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "outputUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "settings" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoProject_pkey" PRIMARY KEY ("id")
);

-- Create index on VideoProject
CREATE INDEX IF NOT EXISTS "VideoProject_createdById_idx" ON "VideoProject"("createdById");

-- Create foreign key constraint
ALTER TABLE "VideoProject" 
DROP CONSTRAINT IF EXISTS "VideoProject_createdById_fkey",
ADD CONSTRAINT "VideoProject_createdById_fkey" 
FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- =====================================================
-- Create ScheduledPost table
-- =====================================================
CREATE TABLE IF NOT EXISTS "ScheduledPost" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "platforms" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "assetIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "engagement" JSONB DEFAULT '{}'::jsonb,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScheduledPost_pkey" PRIMARY KEY ("id")
);

-- Create indexes on ScheduledPost
CREATE INDEX IF NOT EXISTS "ScheduledPost_createdById_idx" ON "ScheduledPost"("createdById");
CREATE INDEX IF NOT EXISTS "ScheduledPost_scheduledFor_idx" ON "ScheduledPost"("scheduledFor");

-- Create foreign key constraint
ALTER TABLE "ScheduledPost" 
DROP CONSTRAINT IF EXISTS "ScheduledPost_createdById_fkey",
ADD CONSTRAINT "ScheduledPost_createdById_fkey" 
FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- =====================================================
-- Verify tables were created
-- =====================================================
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
AND table_name IN ('User', 'Asset', 'StagingProject', 'VideoProject', 'ScheduledPost')
ORDER BY table_name;

-- =====================================================
-- Success! Tables created.
-- Next steps:
-- 1. Run: npx prisma generate
-- 2. Run: npx prisma studio (to verify)
-- =====================================================
