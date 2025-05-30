import userModel from "@/models/userModel";
import connectDataBase from "@/utils/database/connectDataBase";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { id } = await params;
    const { firstName, lastName, email, phone, address } = body.userData;

    await connectDataBase();

    await userModel.findByIdAndUpdate(id, {
      $set: {
        firstName, lastName, email, phone, address
      }
    });

    return NextResponse.json(
      { message: "User details updated successfully" }, 
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: err.message }, 
      { status: 500 } 
    );
  }
}