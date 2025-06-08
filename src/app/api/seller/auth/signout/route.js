import sellerModel from "@/models/sellerModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connectDataBase from "@/utils/database/connectDataBase";

export async function POST(req) {
  try {
    const { email, phone, password, sellerid } = await req.json();

    await connectDataBase();
    const seller = await sellerModel.findById(sellerid);
    if (!seller) {
      return NextResponse.json(
        { message: "Seller not found" },
        { status: 404 }
      );
    } else {
      if (email !== seller.email || phone !== seller.phone) {
        return NextResponse.json(
          { mesage: "Invalid email or phone" },
          { status: 401 }
        );
      }
      if (await bcryptjs.compare(password, seller.password)) {
        await sellerModel.findByIdAndDelete(sellerid);
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
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}