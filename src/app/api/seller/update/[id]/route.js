import sellerModel from "@/models/sellerModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { name, email, phone, storeName } = await req.json();
    const { id } = await params;

    const seller = await sellerModel.findByIdAndUpdate(id, {
      $set: {  name, email, phone, storeName }
    }, { new: true });

    return NextResponse.json(
      { seller, message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server error", error: err.message },
      { status: 500 }
    );
  }
}