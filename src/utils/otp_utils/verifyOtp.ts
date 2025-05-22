import otpModel from "@/models/otp-model";

const verifyOtp = async (OTP: Number, email: String) => {
  try {
    const otpInfo = await otpModel.findOne({ email });
    if (!otpInfo) {
      return false;
    } else {
      if (OTP === otpInfo?.otp) {
        return true;
      } else {
        return false;
      }
    }
  } catch (err: any) {
    console.log("Something happend", err.message);
  }
};

export default verifyOtp;