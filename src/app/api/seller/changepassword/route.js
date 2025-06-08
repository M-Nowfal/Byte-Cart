import sellerModel from "@/models/sellerModel";
import connectDataBase from "@/utils/database/connectDataBase";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userid, newPass } = await req.json();
    const newHashPass = await bcryptjs.hash(newPass, await bcryptjs.genSalt(10));
    await connectDataBase();
    await sellerModel.findByIdAndUpdate(userid, {
      password: newHashPass
    });
    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server error", error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { sellerid, oldPass, newPass } = await req.json();
    await connectDataBase();
    const seller = await sellerModel.findById(sellerid);
    if (await bcryptjs.compare(oldPass, seller.password)) {
      const hashedNewPass = await bcryptjs.hash(newPass, await bcryptjs.genSalt(10));
      await sellerModel.findByIdAndUpdate(sellerid, {
        $set: { password: hashedNewPass }
      });
    } else {
      return NextResponse.json(
        { message: "Incorrect current password" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server error", error: err.message },
      { status: 500 }
    );
  }
}
