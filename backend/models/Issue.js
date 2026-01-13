import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["open", "in-progress", "resolved"],
    default: "open"
  },
  reportedBy: String
});

export default mongoose.model("Issue", issueSchema);
