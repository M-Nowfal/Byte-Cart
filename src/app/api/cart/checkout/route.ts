import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // cart checkout logic here
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error while fetching cart items", err.message);
      return Response.json({ message: "Error while fetching cart items", status: false, error: err.message });
    } else {
      console.log("Error while fetching cart items", err);
      return Response.json({ message: "Error while fetching cart items", status: false, error: err });
    }
  }
}