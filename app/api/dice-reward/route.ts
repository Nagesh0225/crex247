import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { DiceRewardV1, DiceRewardV2, DiceRewardV3, DiceRewardV4 } from "@/app/models/DiceReward";

export async function GET() {
  try {
    await connectDB();
    const rewards = await DiceRewardV1.find().sort({ diceNumber: 1 }); // or DiceRewardV2, DiceRewardV3, DiceRewardV4 as needed
    return NextResponse.json(rewards, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch dice rewards" }, { status: 500 });
  }
}
