import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    image: {
      type: String // image URL (future use)
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open"
    },
    reportedBy: {
      type: String
    }
  },
  { timestamps: true } // ✅ enables createdAt & updatedAt
);

export default mongoose.model("Issue", issueSchema);
