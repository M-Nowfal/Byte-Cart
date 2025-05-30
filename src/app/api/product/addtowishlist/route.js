import userModel from "@/models/userModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userid, productid } = await req.json();
    await connectDataBase();
    await userModel.findByIdAndUpdate(userid, {
      $push: { wishlist: productid }
    });
    return NextResponse.json(
      { message: "Product added to wishlist" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { userid, productid } = await req.json();
    await connectDataBase();
    await userModel.findByIdAndUpdate(userid, {
      $pull: { wishlist: productid }
    });
    return NextResponse.json(
      { message: "Product removed from wishlist" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}