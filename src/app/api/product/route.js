import productModel from "@/models/productModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDataBase();
    const products = await productModel.find({});
    return NextResponse.json(
      { products, message: "Products fetched successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error while fetching products");
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, price, description, category, images, brand, stock, ratings, status, tags } = body.formData;
    await productModel.create({
      name, price, description, category, images, brand, stock, ratings, status, tags, sellerId: body.sellerid
    });
    return NextResponse.json(
      { message: "Product added successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}