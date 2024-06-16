import mongoose, { Document, Schema, Model } from "mongoose";

interface ISubmission extends Document {
  title: string;
  type: "text" | "video" | "image" | "link" | "poll";
  body: string;
  link: string;
  image: string[];
  video: string;
  poll: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  subreddit: mongoose.Types.ObjectId;
  status: "draft" | "submitted";
  scheduledPost?: mongoose.Types.ObjectId;
  isScheduled?: boolean; // This will be a virtual property
  createdAt: Date;
  updatedAt: Date;
}

const submissionSchema: Schema<ISubmission> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["text", "video", "image", "link", "poll"],
      required: true,
    },
    body: {
      type: String,
      default: "",
      validate: {
        validator: function (this: ISubmission, value: string) {
          return (
            this.type !== "text" ||
            (this.type === "text" && value.trim().length > 0)
          );
        },
        message: "Body is required for text submissions",
      },
    },
    link: { type: String, default: "" },
    image: [{ type: String, default: "" }],
    video: { type: String, default: "" },
    poll: { type: mongoose.SchemaTypes.ObjectId, ref: "Poll" },
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
    status: {
      type: String,
      enum: ["draft", "submitted"],
      default: "draft",
      index: true,
    },
    scheduledPost: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "ScheduledPost",
    },
  },
  { timestamps: true }
);

submissionSchema.virtual("isScheduled").get(function (this: ISubmission) {
  return !!this.scheduledPost;
});

const SubmissionModel: Model<ISubmission> =
  mongoose.models.Submission ||
  mongoose.model<ISubmission>("Submission", submissionSchema);

export default SubmissionModel;
