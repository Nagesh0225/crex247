import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Whatsapp from "@/app/models/Whatsapp";

export async function GET() {
  try {
    await connectDB();
    const data = await Whatsapp.findOne();
    if (!data) return NextResponse.json({ newCustomer: "", deposit: "", withdrawal: "", support: "" });
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    await Whatsapp.findOneAndUpdate({}, body, { upsert: true, new: true });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...rest } = await req.json();
    await Whatsapp.findByIdAndUpdate(id, rest);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    await Whatsapp.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
