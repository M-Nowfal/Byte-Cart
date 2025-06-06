import sellerModel from "@/models/sellerModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    const { id } = await params;
    await connectDataBase();
    const seller = await sellerModel.findById(id, {
      _id: 0, password: 0
    });
    if (seller) {
      return NextResponse.json(
        {
          message: "Seller data fetched",
          seller
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No seller found" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}