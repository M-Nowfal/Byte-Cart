import userModel from "@/models/userModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    const { userid } = await params;
    await connectDataBase();
    const wishlists = await userModel.findById(userid).populate("wishlist");
    return NextResponse.json(
      { wishlists: wishlists?.wishlist || [], message: "wishlist fetched successfully" }, 
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}