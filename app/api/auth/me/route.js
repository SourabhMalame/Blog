import { NextResponse } from "next/server";
import { ensureConnected } from "@/lib/moongoose";
import User from "@/models/User";
import jwt from "jsonwebtoken";

// Next.js: Get env vars at runtime
function getJWTSecret() {
  return process.env.JWT_SECRET || "your-secret-key";
}

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify token
    const JWT_SECRET = getJWTSecret();
    const decoded = jwt.verify(token, JWT_SECRET);

    // Ensure database is connected (connection should already exist from login)
    await ensureConnected();

    // Get user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "NORMAL_USER",
        autoShareEnabled: user.autoShareEnabled || false,
        socialMediaSettings: user.socialMediaSettings || {
          facebook: false,
          twitter: false,
          instagram: false,
          linkedin: false,
          youtube: false,
        },
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    
    // Provide more specific error messages
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return NextResponse.json(
        { error: "Invalid or expired token. Please login again." },
        { status: 401 }
      );
    }
    
    if (error.message?.includes("User not found")) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to get user. Please try logging in again." },
      { status: 401 }
    );
  }
}
