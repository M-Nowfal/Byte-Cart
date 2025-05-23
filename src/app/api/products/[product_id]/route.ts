import productModel from "@/models/product-model";
import { NextRequest } from "next/server";

interface Params {
  params: {
    product_id: string
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { product_id } = await params;
    const product = await productModel.findById(product_id);
    return Response.json({ message: "Product fetched Successfully", status: true, product });
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error while fetching product", err.message);
      return Response.json({ message: "Error while fetching product", status: false, error: err.message });
    } else {
      console.log("Error while fetching product", err);
      return Response.json({ message: "Error while fetching product", status: false, error: err });
    }
  }
}

