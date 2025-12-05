import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import {
  WhatsappV1,
  WhatsappV2,
  WhatsappV3,
  WhatsappV4,
} from "@/app/models/Whatsapp";

// ✅ GET API
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const version = searchParams.get("version");

    let Model;

    if (version === "v1") Model = WhatsappV1;
    else if (version === "v2") Model = WhatsappV2;
    else if (version === "v3") Model = WhatsappV3;
    else if (version === "v4") Model = WhatsappV4;
    else {
      return NextResponse.json(
        { message: "version required" },
        { status: 400 }
      );
    }

    const data = await Model.findOne();

    return NextResponse.json(
      data || { newCustomer: "", deposit: "", withdrawal: "", support: "" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch WhatsApp numbers" },
      { status: 500 }
    );
  }
}

// ✅ POST API
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { version } = body;

    let Model;

    if (version === "v1") Model = WhatsappV1;
    else if (version === "v2") Model = WhatsappV2;
    else if (version === "v3") Model = WhatsappV3;
    else if (version === "v4") Model = WhatsappV4;
    else {
      return NextResponse.json(
        { success: false, message: "version required" },
        { status: 400 }
      );
    }

    await Model.findOneAndUpdate({}, body, {
      upsert: true,
      new: true,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
