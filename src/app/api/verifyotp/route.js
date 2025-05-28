import { verifyOtp } from "@/utils/onetimepassword/otpService";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();
    const isValidOtp = verifyOtp(email, otp);
    if (isValidOtp.success) {
      return NextResponse.json(
        { message: isValidOtp.message },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: isValidOtp.message },
        { status: 401 }
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