import mongoose, { model, models, Schema } from "mongoose";

const reviewSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  username: {
    type: String,
    required: true,
    default: "bytecart-user"
  },
  review: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const reviewModel = models.Review || model("Review", reviewSchema);

export default reviewModel;