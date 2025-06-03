import sellerModel from "@/models/sellerModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, storeName, phone } = await req.json();
    await connectDataBase();
    if (await sellerModel.findOne({ email, phone })) {
      return NextResponse.json(
        { error: "Seller already exist with that email or phone" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcryptjs.hash(password, await bcryptjs.genSalt(10));
    const seller = await sellerModel.create({
      name, email, password: hashedPassword, storeName, phone
    });
    return NextResponse.json(
      { message: "Seller account created successfully", seller: { id: seller._id, name: seller.name } },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}