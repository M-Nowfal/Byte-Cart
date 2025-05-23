import nodemailer, { SendMailOptions } from "nodemailer";

const sendOtp = async (OTP: number, email: string, auth: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.BYTE_CART_EMAIL,
        pass: process.env.BYTE_CART_EMAIL_PASS
      }
    });

    const mailOptions: SendMailOptions = {
      from: `"Byte Cart" <${process.env.BYTE_CART_EMAIL}>`,
      to: email,
      subject: "OTP Code for Byte Cart Authentication",
      html: `
        <div style="text-align: center; font-family: Arial;">
          <h2>Your OTP Code for ${auth}</h2>
          <p style="font-size: 24px; font-weight: bold;">${OTP}</p>
          <p>OTP valid for 10 minutes</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed to send OTP", err.message);
    } else {
      console.log("Failed to send OTP", err);
    }
    return false;
  }
};

export default sendOtp;