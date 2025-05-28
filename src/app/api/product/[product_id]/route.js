import productModel from "@/models/productModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { product_id } = await params;
    await connectDataBase();
    const product = await productModel.findById(product_id);
    return NextResponse.json(product, { status: 200 }, { message: "Products fetched successfully" });
  } catch (err) {
    console.log("Error while fetching products");
    return NextResponse.json({ status: 500 }, { error: err });
  }
}