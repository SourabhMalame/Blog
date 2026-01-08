# MongoDB Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory (`my-app`) with the following variables:

```env
# MongoDB Connection String
# Format: mongodb+srv://username:password@cluster.mongodb.net/databaseName?retryWrites=true&w=majority
# IMPORTANT: Replace with your actual MongoDB Atlas connection string
# Get it from: MongoDB Atlas > Connect > Connect your application
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/databaseName?retryWrites=true&w=majority

# JWT Secret Key (change this to a random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin Secret Key (for creating admin users via API)
ADMIN_SECRET=admin-secret-key-change-in-production
```

## Steps to Setup

1. **Create `.env.local` file** in the root directory
2. **Get your MongoDB Atlas connection string**:
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Select your cluster
   - Click "Connect" > "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Add your database name after the cluster URL (e.g., `/myblog`)
3. **Set secure secrets**:
   - Generate a strong random string for `JWT_SECRET`
   - Generate a strong random string for `ADMIN_SECRET`
4. **Whitelist your IP address in MongoDB Atlas**:
   - Go to Network Access in MongoDB Atlas
   - Add your current IP address (or use 0.0.0.0/0 for development - NOT recommended for production)
5. **Start the development server**:
   ```bash
   npm run dev
   ```

## Troubleshooting Connection Issues

If you get `ECONNREFUSED` or connection errors:

1. **Check your connection string format**:
   - Should include database name: `mongodb+srv://...@cluster.net/databaseName?...`
   - Should not have hardcoded credentials (use environment variables)

2. **Verify MongoDB Atlas settings**:
   - Cluster is running (not paused)
   - Your IP address is whitelisted in Network Access
   - Database user exists and has correct permissions

3. **Check network connectivity**:
   - Try accessing MongoDB Atlas dashboard
   - Check if firewall is blocking connections

4. **Verify environment variables**:
   - `.env.local` file exists in root directory
   - `MONGODB_URI` is set correctly
   - Restart the dev server after changing `.env.local`

## Features Implemented

✅ MongoDB connection with Mongoose
✅ User registration with password hashing (bcrypt)
✅ User login with JWT authentication
✅ Protected API routes
✅ User menu in navbar (shows when logged in)
✅ Logout functionality
✅ Session management with HTTP-only cookies

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user
- `GET /api/auth/me` - Get current user info

## Pages

- `/login` - Login page
- `/register` - Registration page

