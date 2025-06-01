import mongoose, { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  // Basic details
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },

  // Authentiation
  isVerified: { type: Boolean, required: true, default: false },

  // Personal Details
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },

  // Address
  address: {
    type: { type: String, enum: ["Home", "Work"], default: "Home" },
    doorNo: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pinCode: { type: Number }
  },

  // Shopping Data
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],

  // 7. Admin & Status
  role: { type: String, enum: ["User", "Admin"], default: "User" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const userModel = models.User || model("User", userSchema);

export default userModel;