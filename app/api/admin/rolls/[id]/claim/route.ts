import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/app/lib/db";
import Roll from "@/app/models/Roll";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // Wait for params Promise
    const { id } = await context.params;

    const roll = await Roll.findByIdAndUpdate(id, { claimed: true }, { new: true });

    return NextResponse.json(roll);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
