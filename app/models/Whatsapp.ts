import mongoose, { Schema, Document } from "mongoose";

export interface IWhatsapp extends Document {
  newCustomer: string;
  deposit: string;
  withdrawal: string;
  support: string;
  number: string;   // MAIN number (required)
}

const schema = new Schema<IWhatsapp>({
  newCustomer: String,
  deposit: String,
  withdrawal: String,
  support: String,
  number: { type: String, required: true },
}, { timestamps: true });

// 4 alag collections for 4 admins
export const WhatsappV1 =
  mongoose.models.WhatsappV1 || mongoose.model<IWhatsapp>("WhatsappV1", schema);

export const WhatsappV2 =
  mongoose.models.WhatsappV2 || mongoose.model<IWhatsapp>("WhatsappV2", schema);

export const WhatsappV3 =
  mongoose.models.WhatsappV3 || mongoose.model<IWhatsapp>("WhatsappV3", schema);

export const WhatsappV4 =
  mongoose.models.WhatsappV4 || mongoose.model<IWhatsapp>("WhatsappV4", schema);
