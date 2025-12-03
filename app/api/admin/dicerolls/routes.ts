import { Router, Request, Response } from "express";
import DiceReward, { IDiceReward } from "./dicemodel";

const router = Router();


router.get("/", async (_req: Request, res: Response) => {
  try {
    const rewards: IDiceReward[] = await DiceReward.find().sort({ diceNumber: 1 });
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* POST save/update dice rewards */
router.post("/save", async (req: Request, res: Response) => {
  try {
    const rewards: { diceNumber: 1 | 2 | 3 | 4 | 5 | 6; percent: number }[] = req.body;

    for (const item of rewards) {
      await DiceReward.findOneAndUpdate(
        { diceNumber: item.diceNumber },
        { percent: item.percent },
        { upsert: true, new: true }
      );
    }

    res.json({ message: "Reward Percentage Updated Successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: "Update Failed ❌" });
  }
});

export default router;
