import mongoose from "mongoose";

const RollSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    code: { type: String, required: true },
    claimed: { type: Boolean, default: true },
    reward: { type: Number, required: true },
    claimedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Roll = mongoose.models.Roll || mongoose.model("Roll", RollSchema);

export default Roll;
