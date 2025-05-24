import { sellerForgotPassword } from "@/controllers/seller-controller";
import { userForgotPassword } from "@/controllers/user-controller";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

interface Params {
  params: {
    role: 'user' | 'seller' | 'admin'
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { role } = await params;
    switch (role) {
      case "user":
        userForgotPassword();
        break;
      case "seller":
        sellerForgotPassword();
        break;
      case "admin":
        // will be add in future
        break;
      default: 
        redirect("/not_found");
    }
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