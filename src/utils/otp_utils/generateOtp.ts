
const generateOtp = () => {
  const randomNumber = 100000 + Math.random() * 900000;
  const OTP = Math.floor(randomNumber);
  return OTP;
};

export default generateOtp;