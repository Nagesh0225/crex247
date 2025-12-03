import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Whatsapp from "@/app/models/Whatsapp";

export async function GET() {
  try {
    await connectDB();
    const data = await Whatsapp.findOne();
    // If not set, return empty defaults
    if (!data) {
      return NextResponse.json({ newCustomer: "", deposit: "", withdrawal: "", support: "" }, { status: 200 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch WhatsApp numbers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Replace existing document (single doc expected). Use upsert.
    await Whatsapp.findOneAndUpdate({}, body, { upsert: true, new: true });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
