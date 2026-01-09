import { NextResponse } from "next/server";
import { ensureConnected } from "@/lib/moongoose";
import Post from "@/models/Post";
import User from "@/models/User";
import jwt from "jsonwebtoken";

// Next.js: Get env vars at runtime
function getJWTSecret() {
  return process.env.JWT_SECRET || "your-secret-key-change-in-production";
}

// Middleware to check if user is authenticated (both NORMAL_USER and ADMIN can create posts)
async function checkAuth(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return { error: "Not authenticated", status: 401 };
  }

  try {
    await ensureConnected();
    const JWT_SECRET = getJWTSecret();
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return {
        error: "User not found",
        status: 404,
      };
    }

    // Allow both NORMAL_USER and ADMIN to create posts
    if (user.role !== "NORMAL_USER" && user.role !== "ADMIN") {
      return {
        error: "Unauthorized - Invalid user role",
        status: 403,
      };
    }

    return { user };
  } catch (error) {
    return { error: "Not authenticated", status: 401 };
  }
}

// Create a new post
export async function POST(request) {
  const authCheck = await checkAuth(request);
  if (authCheck.error) {
    return NextResponse.json(
      { error: authCheck.error },
      { status: authCheck.status }
    );
  }

  try {
    const body = await request.json();
    const { title, content, category, status, featuredImage, contentBlocks, excerpt, seo } = body;

    // Validate required fields
    if (!title || !category) {
      return NextResponse.json(
        { error: "Title and category are required" },
        { status: 400 }
      );
    }

    await ensureConnected();

    // Generate slug from title
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if slug already exists and append a number if needed
    let slugExists = true;
    let slugCounter = 1;
    let finalSlug = slug;
    
    while (slugExists) {
      const existingPost = await Post.findOne({ slug: finalSlug });
      if (!existingPost) {
        slugExists = false;
      } else {
        finalSlug = `${slug}-${slugCounter}`;
        slugCounter++;
      }
    }

    // Create the post with the authenticated user as author
    const post = await Post.create({
      title,
      slug: finalSlug,
      excerpt: excerpt || "",
      content: content || "",
      category,
      status: status || "draft",
      featuredImage: featuredImage || "",
      contentBlocks: contentBlocks || [],
      author: authCheck.user._id,
      seo: seo || {},
    });

    // Populate author info for response
    await post.populate("author", "name email");

    return NextResponse.json(
      { post, message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    
    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "A post with this title already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

// Get posts (optional - for fetching user's own posts)
export async function GET(request) {
  const authCheck = await checkAuth(request);
  if (authCheck.error) {
    return NextResponse.json(
      { error: authCheck.error },
      { status: authCheck.status }
    );
  }

  try {
    await ensureConnected();
    
    // Get posts created by the authenticated user
    const posts = await Post.find({ author: authCheck.user._id })
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

