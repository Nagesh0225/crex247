import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { DiceRewardV1, DiceRewardV2, DiceRewardV3, DiceRewardV4 } from "@/app/models/DiceReward";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { version, rewards } = body;
    if (!version) return NextResponse.json({ message: "version required" }, { status: 400 });
    if (!Array.isArray(rewards)) return NextResponse.json({ message: "rewards array required" }, { status: 400 });
    let Model;
    if (version === "v1") Model = DiceRewardV1;
    else if (version === "v2") Model = DiceRewardV2;
    else if (version === "v3") Model = DiceRewardV3;
    else if (version === "v4") Model = DiceRewardV4;
    else return NextResponse.json({ message: "version invalid" }, { status: 400 });

    for (const item of rewards) {
      const diceNumber = item.diceNumber;
      const percent = Number(item.percent) || 0;
      await Model.findOneAndUpdate(
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
