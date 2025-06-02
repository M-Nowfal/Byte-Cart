import orderModel from "@/models/orderModel";
import productModel from "@/models/productModel";
import userModel from "@/models/userModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const body = await req.json();
    const { userid } = await params;

    const { orderItems, shippingAddress, paymentMethod } = body;

    const { doorNo, street, city, state, country, pinCode } = shippingAddress;

    const totalAmount = orderItems?.reduce((total, item) => total + (item.amount * item.quantity), 0);
    const totalItem = orderItems?.reduce((qty, item) => qty + item.quantity, 0);

    await connectDataBase();

    const order = await orderModel.create({
      user: userid, orderItems, totalItem, totalAmount, shippingAddress: {
        doorNo, street, city, state, country, pinCode
      }, paymentMethod
    });

    await userModel.findByIdAndUpdate(userid, {
      $push: { orders: order._id }
    });

    await Promise.all(orderItems.map(async (item) => {
      await productModel.findByIdAndUpdate(
        item.productid,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }));

    return NextResponse.json(
      { message: "Order place successfuly" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 },
      { error: err.message }
    );
  }
}