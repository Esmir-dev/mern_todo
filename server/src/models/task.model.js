import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Task Name is required",
  },
  status: {
    type: String,
    trim: true,
    required: "Task Status is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  categoryID: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
});

export default mongoose.model("Task", TaskSchema);
