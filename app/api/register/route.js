import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/moongoose";
import User from "@/models/User";
// Register needs to connect as it can be called before login

export async function POST(request) {
  try {
    // Extract only name, email, password - ignore any role passed in request
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create new user - ALWAYS as NORMAL_USER
    // ADMIN role can only be assigned via /api/superadmin/create-superadmin route
    // We explicitly set role here to ensure it's always NORMAL_USER, even if someone tries to pass role in request
    const user = await User.create({
      name,
      email,
      password,
      role: "NORMAL_USER", // Force NORMAL_USER - registration NEVER creates admin users
    });

    // Return user data (without password)
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    // Provide more specific error messages
    if (error.name === "MongoServerError" && error.code === 8000) {
      return NextResponse.json(
        {
          error:
            "MongoDB authentication failed. Please check your connection string and credentials.",
        },
        { status: 500 }
      );
    }

    if (error.name === "MongoNetworkError") {
      return NextResponse.json(
        {
          error:
            "Cannot connect to MongoDB. Please check your connection string.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
