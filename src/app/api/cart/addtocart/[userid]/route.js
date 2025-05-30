import cartModel from "@/models/cartModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { userid } = await params;
    const { productid, quantity, amount } = await req.json();
    await connectDataBase();
    const userCart = await cartModel.findOne({ userid });
    if (userCart) {
      const isExistingProduct = await userCart.cartItems.findIndex(item => item.productid.toString() === productid);
      if (isExistingProduct !== -1) {
        return NextResponse.json(
          { message: "Product already in cart" },
          { status: 409 }
        );
      } else {
        userCart.cartItems.push({ productid, quantity, amount });
        await userCart.save();
      }
    } else {
      await cartModel.create({
        userid, cartItems: [{
          productid, quantity, amount
        }]
      });
    }
    return NextResponse.json(
      { message: "Cart updated successfully" },
      { status: 201 }
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