import { mailOptions, transporter } from "./mailConfig";
import { kv } from '@vercel/kv';

const OTP_EXPIRATION = 5 * 60;

export const sendOtp = async (email) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await kv.set(`otp:${email}`, otp, { ex: OTP_EXPIRATION });

    await transporter.sendMail(mailOptions(email, otp));
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("OTP send error:", error);
    throw new Error("Failed to send OTP");
  }
};

export const verifyOtp = async (email, userOtp) => {
  try {
    const storedOtp = await kv.get(`otp:${email}`);

    if (!storedOtp) {
      return { success: false, message: "No OTP found or expired" };
    }

    if (userOtp !== storedOtp) {
      return { success: false, message: "Invalid OTP" };
    }

    await kv.del(`otp:${email}`);
    return { success: true, message: "OTP verified successfully" };
  } catch (error) {
    console.error("OTP verification error:", error);
    throw new Error("OTP verification failed");
  }
};