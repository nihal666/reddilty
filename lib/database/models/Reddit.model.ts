import mongoose, { Document, Schema, Model } from "mongoose";

interface IReddit extends Document {
  userName: string;
  redditorId: string;
  iconImage?: string;
  refreshToken: string;
  owner: mongoose.Types.ObjectId;
}

const redditSchema: Schema<IReddit> = new mongoose.Schema(
  {
    userName: { type: String, required: true, index: true },
    redditorId: { type: String, required: true, unique: true, index: true },
    iconImage: { type: String },
    refreshToken: { type: String, required: true, select: false },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const RedditModel: Model<IReddit> =
  mongoose.models.Reddit || mongoose.model<IReddit>("Reddit", redditSchema);

export default RedditModel;
