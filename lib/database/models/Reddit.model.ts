import mongoose from "mongoose";

const redditSchema = new mongoose.Schema(
  {
    userName: String,
    redditorId: String,
    iconImage: String,
    refreshToken: String,
    owner: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const RedditModel = mongoose.models.Reddit || mongoose.model("Reddit", redditSchema);

export default RedditModel;
