import userModel from "@/models/userModel";
import connectDataBase from "@/utils/database/connectDataBase";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userid, newPass } = await req.json();
    const newHashPass = await bcryptjs.hash(newPass, await bcryptjs.genSalt(10));
    await connectDataBase();
    await userModel.findByIdAndUpdate(userid, {
      password: newHashPass
    });
    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server error", error: err.message },
      { status: 500 }
    );
  }
}