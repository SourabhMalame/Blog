import { NextResponse } from "next/server";
// import { connectDB } from "../../../../../lib/moongoose";
import Post from "@/models/Post";
import User from "@/models/User";
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
    const decoded = jwt.verify(token, JWT_SECRET);
    // await connectDB();
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

// Get all posts
export async function GET(request) {
  const authCheck = await checkSuperAdmin(request);
  if (authCheck.error) {
    return NextResponse.json(
      { error: authCheck.error },
      { status: authCheck.status }
    );
  }

  try {
    await connectDB();
    const posts = await Post.find({})
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// Update post
export async function PUT(request) {
  const authCheck = await checkSuperAdmin(request);
  if (authCheck.error) {
    return NextResponse.json(
      { error: authCheck.error },
      { status: authCheck.status }
    );
  }

  try {
    const body = await request.json();
    const { postId, title, category, status, autoShareEnabled } = body;

    await connectDB();

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (category !== undefined) updateData.category = category;
    if (status !== undefined) {
      updateData.status = status;
      if (status === "published" && !updateData.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    if (autoShareEnabled !== undefined)
      updateData.autoShareEnabled = autoShareEnabled;

    const post = await Post.findByIdAndUpdate(
      postId,
      { $set: updateData },
      { new: true }
    ).populate("author", "name email");

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post, message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// Delete post
export async function DELETE(request) {
  const authCheck = await checkSuperAdmin(request);
  if (authCheck.error) {
    return NextResponse.json(
      { error: authCheck.error },
      { status: authCheck.status }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ error: "Post ID required" }, { status: 400 });
    }

    await connectDB();
    await Post.findByIdAndDelete(postId);

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
