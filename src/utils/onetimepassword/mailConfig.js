import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_GEN_EMAIL,
    pass: process.env.NEXT_GEN_EMAIL_PASS
  }
});

export const mailOptions = (email, otp) => {
  const expirationMinutes = 5;
  const currentYear = new Date().getFullYear();

  return {
    from: `ByteCart Authentication <${process.env.NEXT_GEN_EMAIL}>`,
    to: email,
    subject: "Your ByteCart Authentication Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
        <h2 style="color: #2c3e50; text-align: center;">Your One-Time Password (OTP)</h2>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
          <div style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #2c3e50;">${otp}</div>
        </div>
        <p style="color: #7f8c8d; text-align: center;">
          This code will expire in ${expirationMinutes} minutes.
        </p>
        <p style="color: #7f8c8d; font-size: 12px; text-align: center; margin-top: 30px;">
          For your security, never share this code with anyone. 
          ByteCart will never ask you for this code.
        </p>
        <p style="color: #95a5a6; font-size: 11px; text-align: center; margin-top: 20px;">
          © ${currentYear} ByteCart. All rights reserved.
        </p>
      </div>
    `,
    // Text version for email clients that don't support HTML
    text: `Your ByteCart authentication code is: ${otp}\n\nThis code will expire in ${expirationMinutes} minutes.`
  };
};