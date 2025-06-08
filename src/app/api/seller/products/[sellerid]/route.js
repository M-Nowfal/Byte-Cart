import productModel from "@/models/productModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    const { sellerid } = await params;
    await connectDataBase();
    const products = await productModel.find({ sellerId: sellerid});
    return NextResponse.json(
      { products, message: "Products fetched successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}