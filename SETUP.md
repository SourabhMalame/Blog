# MongoDB Setup Instructions

## Environment Variables

Create a `.env.local` file in the `my-app` directory with the following variables:

```env
# MongoDB Connection String
# Replace <db_password> with your actual MongoDB password
MONGODB_URI=mongodb+srv://sourabhmalame:sourabh1234@pgadmin.evcqvgp.mongodb.net/?appName=pgadmin

# JWT Secret Key (change this to a random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Steps to Setup

1. **Create `.env.local` file** in the `my-app` directory
2. **Replace `<db_password>`** in the MONGODB_URI with your actual MongoDB password
3. **Set a secure JWT_SECRET** - use a long random string for production
4. **Start the development server**:
   ```bash
   npm run dev
   ```

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
