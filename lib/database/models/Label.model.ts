import mongoose, { Document, Schema, Model } from "mongoose";

interface ILabel extends Document {
  name: string;
  color: string;
}

const labelSchema: Schema<ILabel> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

const LabelModel: Model<ILabel> =
  mongoose.models.Label || mongoose.model<ILabel>("Label", labelSchema);

export default LabelModel;
