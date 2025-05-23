import productModel from "@/models/product-model";
import connectDataBase from "@/utils/database_utils/connect-db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    connectDataBase();
    const products = await productModel.find({});
    return Response.json({ message: "Products Fetched Successfully", status: true, products });
  } catch (err: any) {
    console.log("Failed to fetch products", err.message);
    return Response.json({ message: "Failed to fetch products", status: false, error: err.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newProduct = await req.json();
    connectDataBase();
    await productModel.create({ newProduct });
    return Response.json({ message: "Product Added Successfully", status: true });
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed to add product", err.message);
      return Response.json({ message: "Failed to add product", status: false, error: err.message });
    } else {
      console.log("Failed to add product", err);
      return Response.json({ message: "Failed to add product", status: false, error: err });
    }
  }
}