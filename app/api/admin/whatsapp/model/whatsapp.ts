import mongoose, { Schema, Document } from "mongoose";

export interface IWhatsapp extends Document {
  newCustomer: string;
  deposit: string;
  withdrawal: string;
  support: string;
}

const whatsappSchema = new Schema<IWhatsapp>({
  newCustomer: { type: String, required: true },
  deposit: { type: String, required: true },
  withdrawal: { type: String, required: true },
  support: { type: String, required: true },
});

export default mongoose.model<IWhatsapp>("Whatsapp", whatsappSchema);
