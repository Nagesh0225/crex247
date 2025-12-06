import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import DiceReward from "@/app/models/DiceReward";

export async function POST(req: Request) {
  try {
    await connectDB();
    // Ensure indexes are in sync (apply compound unique index and remove stale ones)
    await DiceReward.syncIndexes();
    const body = await req.json();
    const { version, rewards } = body;
    if (!version) return NextResponse.json({ message: "version required" }, { status: 400 });
    if (!Array.isArray(rewards)) return NextResponse.json({ message: "rewards array required" }, { status: 400 });
    // Use single DiceReward model scoped by version

    for (const item of rewards) {
      const diceNumber = item.diceNumber;
      const percent = Number(item.percent) || 0;
      await DiceReward.findOneAndUpdate(
        { diceNumber, version },
        { percent, version },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ message: "Reward Percentage Updated Successfully ✅" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Update Failed ❌" }, { status: 500 });
  }
}
