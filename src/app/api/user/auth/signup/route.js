import userModel from "@/models/userModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, password } = body.formData;
    connectDataBase();
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return NextResponse.json(
        { message: "User already exist with that email" }, 
        { status: 401 }
      );
    } else {
      const hashedPassword = await bcryptjs.hash(password, await bcryptjs.genSalt(10));
      const newUser = await userModel.create({ 
        email, password: hashedPassword, firstName, lastName, phone, wishlist: [], orders: [] 
      });
      return NextResponse.json(
        {
          message: `Successfully signed up to Byte-Cart`,
          user: { name: firstName, id: newUser._id }
        },
        { status: 201 }
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