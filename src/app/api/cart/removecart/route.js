import cartModel from "@/models/cartModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { id, cartId } = await req.json();
    await connectDataBase();
    await cartModel.findByIdAndUpdate(cartId, {
      $pull: {
        cartItems: { _id: id }
      }
    }, { new: true });
    return NextResponse.json(
      { message: "Cart item removed" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
      { error: err.message }
    );
  }
}