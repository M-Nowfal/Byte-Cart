import sellerModel from "@/models/sellerModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectDataBase();
    if (await sellerModel.findOne({ email })) {
      return NextResponse.json(
        { message: "Seller already exist with that email" },
        { status: 401 }
      );
    } else {
      return NextResponse.json(
        { message: "No Seller exist" },
        { status: 200 }
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