import sellerModel from "@/models/sellerModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectDataBase();
    const seller = await sellerModel.findOne({ email });
    if (seller) {
      if (await bcryptjs.compare(password, seller.password)) {
        return NextResponse.json(
          { message: `Welcome again ${seller.name}`, seller: { name: seller.name, id: seller._id } },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Incorrect Password" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "No Seller exist" },
        { status: 404 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}