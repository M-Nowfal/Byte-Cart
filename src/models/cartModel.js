import mongoose, { model, models, Schema } from "mongoose";

const cartSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  cartItems: [{
    productid: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: [1, "Quanty can't be less than 1"], default: 1 },
    amount: { type: Number, required: true, min: 0 }
  }]
}, { timestamps: true });

const cartModel = models.Cart || model("Cart", cartSchema);

export default cartModel;