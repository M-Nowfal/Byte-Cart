import nodemailer, { SendMailOptions } from "nodemailer";

const sendOtp = async (OTP: number, email: string) => {
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
          <h2>Your OTP Code</h2>
          <p style="font-size: 24px; font-weight: bold;">${OTP}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err: any) {
    console.log("Failed to send OTP", err.message);
    return false;
  }
};

export default sendOtp;