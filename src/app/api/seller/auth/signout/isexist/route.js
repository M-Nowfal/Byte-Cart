import sellerModel from "@/models/sellerModel";
import connectDataBase from "@/utils/database/connectDataBase";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id, email, password } = await req.json();
    await connectDataBase();
    const seller = await sellerModel.findById(id);
    if (seller.email !== email) {
      return NextResponse.json(
        { message: "incorrect credentials" },
        { status: 401 }
      );
    }
    if (await bcryptjs.compare(password, seller.password)) {
      return NextResponse.json(
        { message: "everything ok" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "incorrect credentials" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error", error: err },
      { status: 500 }
    );
  }
}