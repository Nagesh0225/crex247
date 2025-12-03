import mongoose, { Schema, Document } from "mongoose";

export interface IDiceReward extends Document {
  diceNumber: 1 | 2 | 3 | 4 | 5 | 6;
  percent: number;
}

const DiceRewardSchema: Schema = new Schema({
  diceNumber: {
    type: Number,
    required: true,
    unique: true,
    enum: [1, 2, 3, 4, 5, 6],
  },
  percent: {
    type: Number,
    required: true,
    default: 0,
  },
});

const DiceReward = (mongoose.models.DiceReward as mongoose.Model<IDiceReward>) || mongoose.model<IDiceReward>("DiceReward", DiceRewardSchema);

export default DiceReward;
