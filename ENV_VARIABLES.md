# Next.js Environment Variables Guide

## How Next.js Handles Environment Variables

Next.js automatically loads environment variables from the following files (in order of priority):

1. `.env.local` - Local overrides (ignored by git, use for secrets)
2. `.env.development` - Development environment
3. `.env.production` - Production environment
4. `.env` - Default values (can be committed to git)

## Best Practices for Next.js

### ✅ DO: Access env vars at runtime

```javascript
// ✅ CORRECT - Access inside functions/routes
export async function POST(request) {
  const mongoUri = process.env.MONGODB_URI;
  // Use mongoUri here
}
```

### ❌ DON'T: Check env vars at module level

```javascript
// ❌ WRONG - This will fail during build
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}
```

## Implementation in This Project

### Server-Side (API Routes, Server Components)

All environment variables are accessed **at runtime** inside functions:

```javascript
// lib/moongoose.js
function getMongoDBUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("❌ MONGODB_URI is missing");
  }
  return uri;
}

export async function connectDB() {
  const mongoUri = getMongoDBUri(); // Called at runtime
  // ...
}
```

### Client-Side (Browser)

For client-side code, prefix variables with `NEXT_PUBLIC_`:

```javascript
// ❌ Won't work in browser
const apiUrl = process.env.API_URL;

// ✅ Works in browser
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Environment Variables Used

### Required Variables

1. **MONGODB_URI**
   - MongoDB Atlas connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/databaseName?retryWrites=true&w=majority`
   - Server-side only

2. **JWT_SECRET**
   - Secret key for JWT token signing
   - Use a strong random string
   - Server-side only

3. **ADMIN_SECRET** (Optional)
   - Secret key for creating admin users
   - Use a strong random string
   - Server-side only

## Setting Up Environment Variables

### Local Development

Create `.env.local` in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/databaseName?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-change-in-production
ADMIN_SECRET=admin-secret-key-change-in-production
```

### Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string
   - **Environment**: Select all (Production, Preview, Development)
4. Repeat for `JWT_SECRET` and `ADMIN_SECRET`
5. **Redeploy** your application after adding variables

## Why This Approach?

1. **Build-time safety**: Environment variables aren't checked during build, preventing build failures
2. **Runtime validation**: Errors occur when actually needed, with better error messages
3. **Vercel compatibility**: Works correctly with Vercel's environment variable system
4. **Security**: Secrets are never exposed to client-side code

## Troubleshooting

### Build fails with "MONGODB_URI is missing"

- ✅ **Fixed**: We now check env vars at runtime, not at build time
- The build should succeed even without env vars
- Errors will only occur when API routes are called

### "Environment variable not found" at runtime

1. Check `.env.local` exists in root directory
2. Restart dev server after changing `.env.local`
3. For Vercel: Verify variables are set in dashboard
4. For Vercel: Redeploy after adding variables

### Variables work locally but not on Vercel

1. Check Vercel dashboard → Settings → Environment Variables
2. Ensure variables are set for the correct environment
3. Redeploy after adding/changing variables
4. Check variable names match exactly (case-sensitive)

