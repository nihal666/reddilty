import mongoose, { Document, Schema, Model } from "mongoose";

interface ILabel extends Document {
  name: string;
  color: string;
}

interface ISubreddit extends Document {
  title: string;
  subreddit_id: string;
  labels?: mongoose.Types.ObjectId[];
  isStarred?: boolean;
  isFlagged?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const subredditSchema: Schema<ISubreddit> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subreddit_id: { type: String, required: true, unique: true, index: true },
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
    isStarred: { type: Boolean, default: false },
    isFlagged: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SubredditModel: Model<ISubreddit> =
  mongoose.models.Subreddit ||
  mongoose.model<ISubreddit>("Subreddit", subredditSchema);

export default SubredditModel;
