import { userLogin, userLogout, userSignIn, userSignOut } from "@/controllers/user-controller";
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
        userLogin();
        break;
      case "logout":
        userLogout();
        break;
      case "signin":
        userSignIn();
        break;
      case "signout":
        userSignOut();
        break;
      default:
        redirect("/not_found");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log("Authentication Failed", err.message);
      return Response.json({ message: "Authentication Failed", status: false, error: err.message});
    } else {
      console.log("Authentication Failed", err);
      return Response.json({ message: "Authentication Failed", status: false, error: err});
    }
  }
}