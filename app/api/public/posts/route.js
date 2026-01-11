import { NextResponse } from "next/server";
import { ensureConnected } from "@/lib/moongoose";
import Post from "@/models/Post";

// Public endpoint to fetch published posts
export async function GET(request) {
  try {
    await ensureConnected();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 10;
    const category = searchParams.get("category");
    
    // Build query
    const query = { status: "published" };
    if (category) {
      query.category = category;
    }
    
    // Get published posts
    const posts = await Post.find(query)
      .populate("author", "name email")
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .select("title slug excerpt category featuredImage publishedAt author createdAt");

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching public posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts", posts: [] },
      { status: 500 }
    );
  }
}
