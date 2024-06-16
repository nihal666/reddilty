import mongoose, { Document, Schema, Model } from "mongoose";

interface IScheduledPost extends Document {
  post: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  subreddit: mongoose.Types.ObjectId;
  scheduleTime: Date;
  status: "pending" | "posted" | "canceled";
}

const scheduledPostSchema: Schema<IScheduledPost> = new mongoose.Schema(
  {
    post: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Submission",
      required: true,
      index: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    subreddit: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Subreddit",
      required: true,
      index: true,
    },
    scheduleTime: { type: Date, required: true, index: true },
    status: {
      type: String,
      enum: ["pending", "posted", "canceled"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

const ScheduledPostModel: Model<IScheduledPost> =
  mongoose.models.ScheduledPost ||
  mongoose.model<IScheduledPost>("ScheduledPost", scheduledPostSchema);

export default ScheduledPostModel;
