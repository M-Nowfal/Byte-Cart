import userModel from "@/models/userModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    const { id } = await params;
    await connectDataBase();
    const user = await userModel.findById(id, {
      _id: 0, orders: 0, password: 0, wishlist: 0, __v: 0, isActive: 0, isVerified: 0, createdAt: 0, updatedAt: 0
    });
    if (user) {
      return NextResponse.json(
        {
          message: "User data fetched",
          user
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No user found" },
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