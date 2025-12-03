import mongoose, { Schema, Document, model } from "mongoose";

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

export default model<IDiceReward>("DiceReward", DiceRewardSchema);
