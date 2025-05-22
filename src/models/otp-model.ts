import { model, models, Schema } from "mongoose";

const otpSchema = new Schema({
  otp: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const otpModel = models.Otp || model("Otp", otpSchema);

export default otpModel;