import { NextResponse } from "next/server";
import { ensureConnected } from "@/lib/moongoose";
import User from "@/models/User";
import jwt from "jsonwebtoken";

// Next.js: Get env vars at runtime
function getJWTSecret() {
  return process.env.JWT_SECRET || "your-secret-key-change-in-production";
}

function getAdminSecret() {
  return process.env.ADMIN_SECRET || "admin-secret-key";
}

// Create or promote user to ADMIN
// Can be accessed via secret key or by existing ADMIN
export async function POST(request) {
  try {
    const { email, secret } = await request.json();

    // Check if using secret key (for initial setup)
    const ADMIN_SECRET = getAdminSecret();
    if (secret && secret === ADMIN_SECRET) {
      await ensureConnected(); // May need to connect if called before login
      const user = await User.findOneAndUpdate(
        { email },
        { role: "ADMIN" },
        { new: true }
      ).select("-password");

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        message: "User promoted to ADMIN successfully",
        user,
      });
    }

    // Otherwise, check if requester is ADMIN
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const JWT_SECRET = getJWTSecret();
    const decoded = jwt.verify(token, JWT_SECRET);
    await ensureConnected(); // Connection should already exist from login
    const requester = await User.findById(decoded.userId).select("-password");

    if (!requester || requester.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }

    const user = await User.findOneAndUpdate(
      { email },
      { role: "ADMIN" },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User promoted to ADMIN successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 }
    );
  }
}
