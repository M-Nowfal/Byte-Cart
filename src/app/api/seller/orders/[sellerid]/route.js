import orderModel from "@/models/orderModel";
import { NextResponse } from "next/server";
import productModel from "@/models/productModel";

export async function GET(_req, { params }) {
  try {
    const { sellerid } = await params;

    const allOrders = await orderModel.find().populate("orderItems.productid");

    const sellerOrders = allOrders.filter(order => 
      order.orderItems.some(item => 
        item.productid?.sellerId?.toString() === sellerid
      )
    );

    return NextResponse.json(
      { orders: sellerOrders },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server error", error: err.message },
      { status: 500 }
    );
  }
}