import productModel from "@/models/productModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDataBase();
    const products = await productModel.find({});
    return NextResponse.json(products, { status: 200 }, { message: "Products fetched successfully" });
  } catch (err) {
    console.log("Error while fetching products");
    return NextResponse.json({ status: 500 }, { error: err });
  }
}