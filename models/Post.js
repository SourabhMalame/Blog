import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    contentBlocks: { type: Array, default: [] },
    category: { type: String, required: true },
    featuredImage: { type: String },
    status: { 
      type: String, 
      enum: ['draft', 'published'], 
      default: 'draft' 
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    autoShareEnabled: { 
      type: Boolean, 
      default: false 
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
      twitterCard: { type: String, default: 'summary_large_image' },
    },
  },
  { timestamps: true }
);

// Generate slug from title before saving
PostSchema.pre("save", function (next) {
  // Always generate slug if it doesn't exist or is empty
  if (!this.slug || this.slug.trim() === "") {
    if (this.title) {
      this.slug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
  } else if (this.isModified("title") && this.title) {
    // If title is modified, regenerate slug
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

