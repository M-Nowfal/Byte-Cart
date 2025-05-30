import cartModel from "@/models/cartModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function PUT(_req, { params }) {
  try {
    const { slug } = await params;
    const [cartId, cartItemId, state] = slug;

    await connectDataBase();

    const inc = (state == "inc") ? 1 : -1;

    await cartModel.findByIdAndUpdate(
      cartId,
      { $inc: { "cartItems.$[elem].quantity": inc } },
      { arrayFilters: [{ "elem._id": cartItemId }], new: true }
    );

    return NextResponse.json(
      { message: "Updated successfully" },
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