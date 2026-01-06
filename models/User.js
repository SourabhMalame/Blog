import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['user', 'superadmin'], 
      default: 'user' 
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

// ✅ CORRECT pre-save hook (NO next)
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

