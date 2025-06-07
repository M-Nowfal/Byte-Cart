import orderModel from "@/models/orderModel";
import productModel from "@/models/productModel";
import { NextResponse } from "next/server";

export async function DELETE(_req, { params }) {
  try {
    const { orderid } = await params;
    const order = await orderModel.findById(orderid);
    order?.orderItems.forEach(async (order) => {
      await productModel.findByIdAndUpdate(order.productid, {
        $inc: { stock: order.quantity }
      });
    });
    await orderModel.findByIdAndDelete(orderid);
    return NextResponse.json(
      { message: "Order cancelled" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}