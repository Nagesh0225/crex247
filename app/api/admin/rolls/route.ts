import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Roll from "@/app/models/Roll";

export async function GET() {
  try {
    await connectDB();
    const rolls = await Roll.find().sort({ createdAt: -1 });
    return NextResponse.json({ data: rolls }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (body.action === "claim") {
      const { id } = body;

      await Roll.findByIdAndUpdate(id, {
        claimed: true,
      });

      return NextResponse.json(
        { success: true, message: "Reward claimed successfully" },
        { status: 200 }
      );
    }

    const { number, reward, code, instantId } = body;

    const roll = await Roll.create({
      number,
      reward,
      code,
      instantId,
      claimed: false,
    });

    return NextResponse.json({ roll }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
