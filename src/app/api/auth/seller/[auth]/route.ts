import { sellerLogin, sellerLogout, sellerSignIn, sellerSignOut } from "@/controllers/seller-controller";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

interface Params {
  params: {
    auth: 'login' | 'logout' | 'signin' | 'signout'
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { auth } = await params;
    switch (auth) {
      case "login": 
        sellerLogin();
        break;
      case "logout":
        sellerLogout();
        break;
      case "signin":
        sellerSignIn();
        break;
      case "signout":
        sellerSignOut();
        break;
      default:
        redirect("/not_found");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log("Seller Authentication Failed", err.message);
      return Response.json({ message: "Seller Authentication Failed", status: false, error: err.message});
    } else {
      console.log("Seller Authentication Failed", err);
      return Response.json({ message: "Seller Authentication Failed", status: false, error: err});
    }
  }
}