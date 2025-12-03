import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import DiceReward from "@/app/models/DiceReward";

export async function POST(req: Request) {
  try {
    await connectDB();
    const rewards = await req.json();

    if (!Array.isArray(rewards)) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    for (const item of rewards) {
      const diceNumber = item.diceNumber;
      const percent = Number(item.percent) || 0;
      await DiceReward.findOneAndUpdate(
        { diceNumber },
        { percent },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ message: "Reward Percentage Updated Successfully ✅" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Update Failed ❌" }, { status: 500 });
  }
}
