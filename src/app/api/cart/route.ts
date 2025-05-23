import { NextRequest } from "next/server";

interface Params {
  params: {
    product_id: string,
    user_id: string
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
    // Add to Cart logic here
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed to add product to cart", err.message);
      return Response.json({ message: "Failed to add product to cart", status: false, error: err.message});
    } else {
      console.log("Failed to add product to cart", err);
      return Response.json({ message: "Failed to add product to cart", status: false, error: err});
    }
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    // Get products from Cart logic here
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed to get products from cart", err.message);
      return Response.json({ message: "Failed to get products from cart", status: false, error: err.message});
    } else {
      console.log("Failed to get products from cart", err);
      return Response.json({ message: "Failed to get products from cart", status: false, error: err});
    }
  }
}