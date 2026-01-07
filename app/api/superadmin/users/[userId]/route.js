import { NextResponse } from "next/server";
import { ensureConnected } from "../../../../../../lib/moongoose";
import User from "@/models/User";
import Post from "@/models/Post";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Middleware to check if user is superadmin
async function checkSuperAdmin(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return { error: "Not authenticated", status: 401 };
  }

  try {
    await ensureConnected(); // Connection should already exist from login
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user || user.role !== "superadmin") {
      return {
        error: "Unauthorized - Superadmin access required",
        status: 403,
      };
    }

    return { user };
  } catch (error) {
    return { error: "Not authenticated", status: 401 };
  }
}

// Get single user with all details and posts
export async function GET(request, { params }) {
  const authCheck = await checkSuperAdmin(request);
  if (authCheck.error) {
    return NextResponse.json(
      { error: authCheck.error },
      { status: authCheck.status }
    );
  }

  try {
    await ensureConnected(); // Connection should already exist from login
    const { userId } = params;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get all posts by this user
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .select("title slug status category createdAt autoShareEnabled");

    return NextResponse.json({ user, posts });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// Update user social media settings
export async function PUT(request, { params }) {
  const authCheck = await checkSuperAdmin(request);
  if (authCheck.error) {
    return NextResponse.json(
      { error: authCheck.error },
      { status: authCheck.status }
    );
  }

  try {
    await ensureConnected(); // Connection should already exist from login
    const { userId } = params;
    const body = await request.json();
    const { socialMediaSettings, autoShareEnabled } = body;

    const updateData = {};
    if (socialMediaSettings !== undefined)
      updateData.socialMediaSettings = socialMediaSettings;
    if (autoShareEnabled !== undefined)
      updateData.autoShareEnabled = autoShareEnabled;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user,
      message: "User settings updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

