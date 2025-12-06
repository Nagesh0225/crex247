import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import DiceReward from "@/app/models/DiceReward";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const version = searchParams.get("version");
    const rewards = await DiceReward.find({ version }).sort({ diceNumber: 1 });
    return NextResponse.json(rewards, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch dice rewards" },
      { status: 500 }
    );
  }
}
