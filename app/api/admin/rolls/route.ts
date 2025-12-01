import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Roll from "@/app/models/Roll";

export async function GET() {
  try {
    await connectDB();
    const rolls = await Roll.find().sort({ createdAt: -1 });
    return NextResponse.json(rolls);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch rolls" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { number, code } = await req.json();

    const probabilityMap: Record<number, number> = {
      1: 0.15,
      2: 0.15,
      3: 0.20,
      4: 0.20,
      5: 0.25,
      6: 0.25,
    };

    const roll = await Roll.create({
      number,
      code,
      probability: probabilityMap[number],
      claimed: true, // ✅ guaranteed
      claimedAt: new Date(),
    });

    return NextResponse.json({ roll });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create roll" }, { status: 500 });
  }
}
