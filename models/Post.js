import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String, required: true, default: "" },
    contentBlocks: { type: Array, default: [] },
    category: { type: String, required: true },
    featuredImage: { type: String },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    autoShareEnabled: {
      type: Boolean,
      default: false,
    },
    publishedAt: { type: Date },
    // SEO Fields
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      metaKeywords: { type: String },
      ogTitle: { type: String },
      ogDescription: { type: String },
      ogImage: { type: String },
      twitterCard: { type: String, default: "summary_large_image" },
    },
  },
  { timestamps: true }
);

// Generate slug from title before saving
PostSchema.pre("save", async function () {
  try {
    // Always generate slug if it doesn't exist or is empty
    if (!this.slug || this.slug.trim() === "") {
      if (this.title && this.title.trim() !== "") {
        this.slug = this.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }
    } else if (
      this.isModified("title") &&
      this.title &&
      this.title.trim() !== ""
    ) {
      // If title is modified, regenerate slug
      this.slug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // Ensure slug is not empty (fallback) - this is critical for required field
    if (!this.slug || this.slug.trim() === "") {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);
      this.slug = `post-${timestamp}-${random}`;
    }

    // Ensure slug doesn't start or end with dash
    this.slug = this.slug.replace(/(^-|-$)/g, "");

    if (this.status === "published" && !this.publishedAt) {
      this.publishedAt = new Date();
    }
  } catch (error) {
    console.error("Error in pre-save hook:", error);
    // If slug generation fails, use timestamp-based fallback
    if (!this.slug || this.slug.trim() === "") {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);
      this.slug = `post-${timestamp}-${random}`;
    }
  }
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
