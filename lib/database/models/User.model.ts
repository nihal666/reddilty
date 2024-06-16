import mongoose, { Document, Schema, Model } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  reddits: mongoose.Types.ObjectId[];
  submissions?: mongoose.Types.ObjectId[];
  subreddits?: mongoose.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    reddits: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Reddit" }],
    submissions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Submission" }],
    subreddits: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Subreddit" }],
  },
  { timestamps: true }
);

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
