import mongoose, { Schema } from "mongoose";

const RollSchemaV1 = new Schema({
  number: { type: Number, required: true },
  reward: { type: Number, required: true },
  code: { type: String, required: true },
  instantId: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  claimed: { type: Boolean, default: false },
}, { timestamps: true });

const RollSchemaV2 = new Schema({
  number: { type: Number, required: true },
  reward: { type: Number, required: true },
  code: { type: String, required: true },
  instantId: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  claimed: { type: Boolean, default: false },
}, { timestamps: true });

const RollSchemaV3 = new Schema({
  number: { type: Number, required: true },
  reward: { type: Number, required: true },
  code: { type: String, required: true },
  instantId: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  claimed: { type: Boolean, default: false },
}, { timestamps: true });

const RollSchemaV4 = new Schema({
  number: { type: Number, required: true },
  reward: { type: Number, required: true },
  code: { type: String, required: true },
  instantId: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  claimed: { type: Boolean, default: false },
}, { timestamps: true });

export const RollV1 = mongoose.models.RollV1 || mongoose.model("RollV1", RollSchemaV1);
export const RollV2 = mongoose.models.RollV2 || mongoose.model("RollV2", RollSchemaV2);
export const RollV3 = mongoose.models.RollV3 || mongoose.model("RollV3", RollSchemaV3);
export const RollV4 = mongoose.models.RollV4 || mongoose.model("RollV4", RollSchemaV4);
