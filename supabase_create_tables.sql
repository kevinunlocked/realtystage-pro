-- Supabase SQL Script to Create Tables
-- Run this in Supabase Dashboard → SQL Editor

-- Create User table
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
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "assetIds" TEXT[] NOT NULL DEFAULT '{}',
    "outputUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "settings" JSONB NOT NULL DEFAULT '{}',
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
    "platforms" TEXT[] NOT NULL DEFAULT '{}',
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "assetIds" TEXT[] NOT NULL DEFAULT '{}',
    "engagement" JSONB,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScheduledPost_pkey" PRIMARY KEY ("id")
);

-- Create indexes on ScheduledPost
CREATE INDEX IF NOT EXISTS "ScheduledPost_createdById_idx" ON "ScheduledPost"("createdById");
CREATE INDEX IF NOT EXISTS "ScheduledPost_scheduledFor_idx" ON "ScheduledPost"("scheduledFor");

-- Create foreign key constraints
ALTER TABLE "Asset" 
ADD CONSTRAINT "Asset_uploadedById_fkey" 
FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "StagingProject" 
ADD CONSTRAINT "StagingProject_createdById_fkey" 
FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "VideoProject" 
ADD CONSTRAINT "VideoProject_createdById_fkey" 
FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ScheduledPost" 
ADD CONSTRAINT "ScheduledPost_createdById_fkey" 
FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Verify tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('User', 'Asset', 'StagingProject', 'VideoProject', 'ScheduledPost');

