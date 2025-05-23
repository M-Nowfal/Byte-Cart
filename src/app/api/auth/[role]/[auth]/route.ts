import { NextRequest } from "next/server";

interface Params {
  params: {
    auth: 'login' | 'logout' | 'signin' | 'signout'
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
    // auth logic here
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