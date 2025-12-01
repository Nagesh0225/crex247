import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Roll from "@/app/models/Roll";

const rewardMap: Record<number, number> = {
  1: 20,
  2: 25,
  3: 30,
  4: 35,
  5: 40,
  6: 45,
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const { number, code } = await req.json();

    const reward = rewardMap[number] || 0;

    const roll = await Roll.create({
      number,
      code,
      claimed: true,
      reward,
      claimedAt: new Date(),
    });

    return NextResponse.json({ roll });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create roll" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const rolls = await Roll.find().sort({ createdAt: -1 });
    return NextResponse.json(rolls);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch rolls" }, { status: 500 });
  }
}
