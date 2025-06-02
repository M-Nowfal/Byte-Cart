import mongoose, { model, models, Schema } from "mongoose"

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  orderItems: [{
    productid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    amount: {
      type: Number,
      required: true
    }
  }],
  totalItem: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    doorNo: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: Number, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ["cod", "upi", "card", "netbanking"],
    default: "cod"
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "success"],
    default: "pending"
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ["Order Placed", "Order Shipped", "Ordered Delivered"],
    default: "Order Placed"
  },
  orderedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  deliveredAt: {
    type: Date,
    required: true
  }
});

const orderModel = models.Order || model("Order", orderSchema);

export default orderModel;