import mongoose, { Schema, models } from "mongoose";

const RollSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    reward: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    instantId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Roll = models.Roll || mongoose.model("Roll", RollSchema);

export default Roll;
