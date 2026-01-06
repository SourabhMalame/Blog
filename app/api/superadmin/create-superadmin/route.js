import { NextResponse } from "next/server";
// import { connectDB } from "../../../../../lib/moongoose";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const SUPERADMIN_SECRET =
  process.env.SUPERADMIN_SECRET || "superadmin-secret-key";

// Create or promote user to superadmin
// Can be accessed via secret key or by existing superadmin
export async function POST(request) {
  try {
    const { email, secret } = await request.json();

    // Check if using secret key (for initial setup)
    if (secret && secret === SUPERADMIN_SECRET) {
      // await connectDB();
      const user = await User.findOneAndUpdate(
        { email },
        { role: "superadmin" },
        { new: true }
      ).select("-password");

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        message: "User promoted to superadmin successfully",
        user,
      });
    }

    // Otherwise, check if requester is superadmin
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    await connectDB();
    const requester = await User.findById(decoded.userId).select("-password");

    if (!requester || requester.role !== "superadmin") {
      return NextResponse.json(
        { error: "Unauthorized - Superadmin access required" },
        { status: 403 }
      );
    }

    const user = await User.findOneAndUpdate(
      { email },
      { role: "superadmin" },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User promoted to superadmin successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating superadmin:", error);
    return NextResponse.json(
      { error: "Failed to create superadmin" },
      { status: 500 }
    );
  }
}
