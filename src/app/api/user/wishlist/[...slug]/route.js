import userModel from "@/models/userModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    const { slug } = await params;
    const [userid, productid] = slug;
    await connectDataBase();
    const user = await userModel.findById(userid);
    if (user) {
      const liked = user.wishlist?.find(item => item.toString() === productid);
      console.log(liked);
      if (liked) {
        return NextResponse.json(
          { message: "Liked product", liked: true },
          { status: 200 }
        );
      }
    }
    return NextResponse.json(
      { message: "Liked product", liked: false },
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