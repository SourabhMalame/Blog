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
  },
  { timestamps: true }
);

// Generate slug from title before saving
PostSchema.pre("save", function () {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

