import productModel from "@/models/productModel";
import reviewModel from "@/models/reviewModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userid, username, review, productid } = await req.json();
    const comment = await reviewModel.create({
      userid: userid || null, username: username || "Guest-User", review
    });
    await productModel.findByIdAndUpdate(productid, {
      $push: { reviews: comment._id }
    });
    return NextResponse.json(
      { message: "Review added", id: comment._id, userid },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { reviewid, productid } = await req.json();
    await reviewModel.findByIdAndDelete(reviewid);
    await productModel.findByIdAndUpdate(productid, {
      $pull: { reviews: reviewid }
    });
    return NextResponse.json(
      { message: "Review deleted" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}