import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connectDataBase from "@/utils/database/connectDataBase";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body?.loginDetails;
    await connectDataBase();
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      if (await bcryptjs.compare(password, userExist.password)) {
        return NextResponse.json(
          {
            message: `Welcome again ${userExist.firstName}`,
            user: { name: userExist.firstName, id: userExist._id }
          },
          { status: 201 }
        );
      } else {
        return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 500 }, { error: err.message });
  }
}