import productModel from "@/models/productModel";
import reviewModel from "@/models/reviewModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    const { product_id } = await params;
    await connectDataBase();
    const product = await productModel.findById(product_id).populate("reviews");
    return NextResponse.json({ product, message: "Products fetched successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { product_id } = await params;
    const { name, price, description, category, images, brand, stock, ratings, status, tags } = await req.json();
    await productModel.findByIdAndUpdate(product_id, {
      $set: { name, price, description, category, images, brand, stock, ratings, status, tags }
    });
    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { product_id } = await params;
    await productModel.findByIdAndDelete(product_id);
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}