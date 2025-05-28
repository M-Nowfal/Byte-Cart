import userModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (await userModel.findOne({ email })) {
      return NextResponse.json(
        { message: "User already exist with that email" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
      { error: err }
    );
  }
}