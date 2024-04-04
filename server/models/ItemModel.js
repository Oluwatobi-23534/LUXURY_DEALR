import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // Add any other fields you need for your items here
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);

export default Item;
