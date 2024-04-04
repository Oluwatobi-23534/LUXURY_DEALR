import mongoose from "mongoose";

const bucketItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  // Add any other properties you need for each bucket item...
});

const bucketSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [bucketItemSchema],
  // Add any other properties you need for the bucket...
});

const Bucket = mongoose.model("Bucket", bucketSchema);

export default Bucket;
