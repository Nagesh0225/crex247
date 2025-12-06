import mongoose, { Schema, Document } from "mongoose";

export interface IWhatsapp extends Document {
  newCustomer: string;
  deposit: string;
  withdrawal: string;
  support: string;
  version: string;
}

const whatsappSchema = new Schema<IWhatsapp>({
  newCustomer: { type: String, required: true },
  deposit: { type: String, required: true },
  withdrawal: { type: String, required: true },
  support: { type: String, required: true },
  version: { type: String, required: true, unique: true },
}, { timestamps: true });

export const Whatsapp =
  (mongoose.models.Whatsapp as mongoose.Model<IWhatsapp>) ||
  mongoose.model<IWhatsapp>("Whatsapp", whatsappSchema);

export const WhatsappV1 =
  mongoose.models.WhatsappV1 || mongoose.model<IWhatsapp>("WhatsappV1", whatsappSchema);

export const WhatsappV2 =
  mongoose.models.WhatsappV2 || mongoose.model<IWhatsapp>("WhatsappV2", whatsappSchema);

export const WhatsappV3 =
  mongoose.models.WhatsappV3 || mongoose.model<IWhatsapp>("WhatsappV3", whatsappSchema);

export const WhatsappV4 =
  mongoose.models.WhatsappV4 || mongoose.model<IWhatsapp>("WhatsappV4", whatsappSchema);
