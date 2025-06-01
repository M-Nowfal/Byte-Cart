import productModel from "@/models/productModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    const { product_id } = await params;
    await connectDataBase();
    const product = await productModel.findById(product_id);
    return NextResponse.json({ product, message: "Products fetched successfully" }, { status: 200 });
  } catch (err) {
    console.log("Error while fetching products");
    return NextResponse.json({ status: 500 }, { error: err });
  }
}