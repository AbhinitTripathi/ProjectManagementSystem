import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define the schema structure for the 'User' collection
const userSchema = new Schema(
  {
    // Avatar (Profile Picture) Field
    avatar: {
      type: {
        url: String, // URL of the image (stored on cloud storage/CDN)
        localPath: String, // Local path on your server (if applicable)
      },
      default: {
        url: "https://placehold.co/600x400?text=DP", // Default placeholder image
        localPath: "", // No local path by default
      },
    },

    // Username Field
    username: {
      type: String,
      required: true, // Must be provided
      lowercase: true, // Automatically convert to lowercase
      trim: true, // Removes whitespace from start and end
      index: true, // Create an index in MongoDB for faster queries
    },

    // Email Field
    email: {
      type: String,
      required: true, // Must be provided
      unique: true, // Must be unique across the collection
      lowercase: true, // Automatically convert to lowercase
      trim: true, // Trim whitespace
    },

    // Full Name Field (Optional)
    fullName: {
      type: String,
      trim: true, // Optional but trimmed if provided
    },

    // Password Field
    password: {
      type: String,
      required: [true, "Password is required"], // Custom error message
    },

    // Boolean flag to track if the email has been verified
    isEmailVerified: {
      type: Boolean,
      default: false, // Default to false until user verifies email
    },

    // Field for storing refresh tokens (for JWT-based auth)
    refreshToken: {
      type: String,
    },

    // Fields for handling forgot password functionality
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },

    // Fields for handling email verification functionality
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },

  // Mongoose option to add createdAt and updatedAt fields automatically
  {
    timestamps: true,
  },
);

// Pre Hook to hash coming password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Schema Method to equate passwords byt hashing incoming & existing
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Exporting a Mongoose model called 'User' that uses the defined schema
export const User = mongoose.model("User", userSchema);
