import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Category Name is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Category", CategorySchema);