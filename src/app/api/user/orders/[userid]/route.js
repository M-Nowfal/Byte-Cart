import userModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    const { userid } = await params;
    const userOrders = await userModel.findById(userid).populate({
      path: 'orders',
      populate: {
        path: 'orderItems.productid',
        model: 'Product'
      }
    });

    return NextResponse.json(
      { message: "Orders fetched Successfully", orders: userOrders },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}