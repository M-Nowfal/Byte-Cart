import { sendOtp } from "@/utils/onetimepassword/otpService";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const isOtpSent = await sendOtp(email);
    if (isOtpSent.success) {
      return NextResponse.json(
        { message: isOtpSent.message },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}