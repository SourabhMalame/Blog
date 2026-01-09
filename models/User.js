import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['NORMAL_USER', 'ADMIN'], 
      default: 'NORMAL_USER' 
    },
    accountType: {
      type: String,
      enum: ['individual', 'organization'],
      default: 'individual'
    },
    organizationName: {
      type: String,
      default: null
    },
    organizationWebsite: {
      type: String,
      default: null
    },
    organizationDescription: {
      type: String,
      default: null
    },
    autoShareEnabled: { 
      type: Boolean, 
      default: false 
    },
    socialMediaSettings: {
      facebook: { type: Boolean, default: false },
      twitter: { type: Boolean, default: false },
      instagram: { type: Boolean, default: false },
      linkedin: { type: Boolean, default: false },
      youtube: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash password
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Pre-save hook to ensure role is always set to NORMAL_USER for new users
// (unless explicitly set to ADMIN by authorized routes)
UserSchema.pre("save", async function () {
  // Only set default role if this is a new document and role is not already set
  if (this.isNew && !this.role) {
    this.role = "NORMAL_USER";
  }
  // Ensure role is valid enum value
  if (this.role && !["NORMAL_USER", "ADMIN"].includes(this.role)) {
    this.role = "NORMAL_USER";
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

