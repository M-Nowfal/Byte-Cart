import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { email, phone, password, id } = body;
    const user = await userModel.findById(id);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    } else {
      if (await bcryptjs.compare(password, user.password)) {
        await userModel.findByIdAndDelete(id);
        return NextResponse.json(
          { message: "Successfully Signed out" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }
    }
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
      { error: err.message }
    );
  }
}