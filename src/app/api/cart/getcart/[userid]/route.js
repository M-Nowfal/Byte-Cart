import cartModel from "@/models/cartModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    const { userid } = await params;
    await connectDataBase();
    const cart = await cartModel.findOne({ userid });
    if (!cart) {
      return NextResponse.json(
        { message: "Empty Cart", cartItems: { cartItems: [] } },
        { status: 200 }
      );
    } else {
      const cartItems = await cartModel.findById(cart._id).populate("cartItems.productid");
      return NextResponse.json(
        { cartItems, message: "cart items fetched successfully" },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
      { error: err.message }
    );
  }
}