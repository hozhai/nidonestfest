# Neon PostgreSQL Setup Guide

## Step 1: Create a Neon Database

1. Go to https://neon.tech/
2. Sign up or log in (can use GitHub)
3. Click "Create a project"
4. Name: `nidonestfest`
5. Region: Choose closest to your users (e.g., US East)
6. Click "Create project"

## Step 2: Get Connection String

1. After creating, you'll see the connection string
2. Copy the **Connection string** (looks like: `postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`)
3. Save this for the next step

## Step 3: Add to Vercel Environment Variables

Run this command with your actual Neon connection string:

```bash
vercel env rm DATABASE_URL production
printf "%s" "YOUR_NEON_CONNECTION_STRING_HERE" | vercel env add DATABASE_URL production
```

Example (replace with your actual string):
```bash
vercel env rm DATABASE_URL production
printf "%s" "postgresql://user:pass@ep-abc123.us-east-2.aws.neon.tech/neondb?sslmode=require" | vercel env add DATABASE_URL production
```

## Step 4: Run Database Migration

Once you have the connection string, run:

```bash
# Set your Neon connection string
export DATABASE_URL="your_neon_connection_string_here"

# Run better-auth migration
bunx @better-auth/cli migrate
```

## Step 5: Update Local .env

Add to your `.env` file:
```
DATABASE_URL="your_neon_connection_string_here"
```

## Step 6: Deploy

```bash
git add -A
git commit -m "Switch to Neon PostgreSQL database"
git push
```

## Benefits of Neon over Turso

- ✅ Better PostgreSQL support in better-auth
- ✅ No serverless adapter issues
- ✅ Native Vercel integration
- ✅ Automatic connection pooling
- ✅ Free tier with 0.5GB storage
- ✅ Instant cold starts
