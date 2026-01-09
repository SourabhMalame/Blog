import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/moongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Next.js: Get env vars at runtime inside the function, not at module level
function getJWTSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("❌ JWT_SECRET is not defined. Please set it in your environment variables");
  }
  return secret;
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide email and password" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user - password is included by default in User model
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if user has password field
    if (!user.password) {
      console.error("User found but password field is missing");
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare password correctly
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const JWT_SECRET = getJWTSecret();
    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || 'NORMAL_USER',
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/", // IMPORTANT
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
