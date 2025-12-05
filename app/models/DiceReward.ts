import mongoose, { Schema, Document } from "mongoose";

export interface IDiceReward extends Document {
  diceNumber: 1 | 2 | 3 | 4 | 5 | 6;
  percent: number;
}


const DiceRewardSchemaV1: Schema = new Schema({
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
}, { timestamps: true });

const DiceRewardSchemaV2: Schema = new Schema({
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
}, { timestamps: true });

const DiceRewardSchemaV3: Schema = new Schema({
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
}, { timestamps: true });

const DiceRewardSchemaV4: Schema = new Schema({
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
}, { timestamps: true });

export const DiceRewardV1 = mongoose.models.DiceRewardV1 || mongoose.model<IDiceReward>("DiceRewardV1", DiceRewardSchemaV1);
export const DiceRewardV2 = mongoose.models.DiceRewardV2 || mongoose.model<IDiceReward>("DiceRewardV2", DiceRewardSchemaV2);
export const DiceRewardV3 = mongoose.models.DiceRewardV3 || mongoose.model<IDiceReward>("DiceRewardV3", DiceRewardSchemaV3);
export const DiceRewardV4 = mongoose.models.DiceRewardV4 || mongoose.model<IDiceReward>("DiceRewardV4", DiceRewardSchemaV4);
