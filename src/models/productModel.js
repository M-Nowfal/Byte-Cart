import mongoose, { model, models, Schema } from "mongoose";

const productSchema = new Schema({
  // Basic details
  name: { type: String, required: true },
  price: { type: Number, required: true, default: 10 },
  description: { type: String, required: true },
  category: { type: String, required: true },
  images: { type: Array, required: true },

  // Seller details
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  barand: { type: String, required: true },
  stock: { type: Number, required: true },

  // Reviews
  ratings: { type: Number, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],

  // Availability
  status: { type: Boolean, required: true },

  // Searching optimizing
  tags: { type: Array }
}, { timestamps: true });

const productModel = models.Product || model("Product", productSchema);

export default productModel;