import dotenv from "dotenv";
import Order from "./models/OrderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const updateOrders = async () => {
  const orders = await Order.find({});

  const updates = orders.map((order) => {
    return Order.updateOne(
      { _id: order._id },
      { $set: { isPaid: false, paidAt: null } }
    );
  });

  return Promise.all(updates);
};

updateOrders()
  .then(() => {
    console.log("Orders updated successfully");
    process.exit();
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
    process.exit(1);
  });
