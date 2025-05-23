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
  } catch (err) {
    if (err instanceof Error) {
      console.log("Something happened:", err.message);
    } else {
      console.log("An unknown error occurred:", err);
    }
  }
};

export default verifyOtp;