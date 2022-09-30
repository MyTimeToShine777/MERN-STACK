import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Must Provide Text Value"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Goal", goalSchema);
