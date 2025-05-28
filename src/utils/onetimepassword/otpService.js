import otpModel from "@/models/otpModel";
import { mailOptions, transporter } from "./mailConfig";
import connectDataBase from "../database/connectDataBase";

const OTP_EXPIRATION = 10 * 60;

export const sendOtp = async (email) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await transporter.sendMail(mailOptions(email, otp));
    
    await connectDataBase();
    const alreadyHaveOtp = await otpModel.findOne({ email });
    if (alreadyHaveOtp) {
      await otpModel.updateOne({ email }, { 
        $set: { otp, createdAt: Date.now() }
      });
    } else {
      await otpModel.create({ email, otp });
    }
    
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("OTP send error:", error);
    throw new Error("Failed to send OTP");
  }
};

export const verifyOtp = async (email, userOtp) => {
  try {
    await connectDataBase();
    const storedOtp = await otpModel.findOne({ email });

    if (!storedOtp) {
      return { success: false, message: "No OTP found or expired" };
    }

    if (userOtp !== storedOtp.otp) {
      return { success: false, message: "Invalid OTP" };
    }

    await otpModel.findOneAndDelete({ email });
    return { success: true, message: "OTP verified successfully" };
  } catch (error) {
    console.error("OTP verification error:", error);
    throw new Error("OTP verification failed");
  }
};