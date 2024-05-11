import { createSlice } from "@reduxjs/toolkit";
import { updateBucket } from "../utils/bucketUtils";

// Initial state
const initialState = {
  bucketItems: [],
  totalPrice: 0,
  shippingAddress: {},
  paymentMethod: "",
};

// Create slice
const bucketListSlice = createSlice({
  name: "bucketList",
  initialState,
  reducers: {
    addToBucket: (state, action) => {
      const item = action.payload;

      // Update the bucket
      const updatedBucket = updateBucket(state.bucketItems, item);

      // Ensure totalPrice is a number
      const totalPrice =
        typeof updatedBucket.totalPrice === "number"
          ? updatedBucket.totalPrice
          : 0;

      // Update state
      state.bucketItems = updatedBucket.bucketItems;
      state.totalPrice = totalPrice;

      // Save bucket items and total price to localStorage
      localStorage.setItem("bucketItems", JSON.stringify(state.bucketItems));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    removeFromBucket: (state, action) => {
      const id = action.payload;

      // Remove item from the bucket
      state.bucketItems = state.bucketItems.filter((item) => item._id !== id);

      // Recalculate total price
      state.totalPrice = state.bucketItems.reduce(
        (acc, item) => acc + (Number(item.price) * Number(item.qty) || 0),
        0
      );

      // Save bucket items and total price to localStorage
      localStorage.setItem("bucketItems", JSON.stringify(state.bucketItems));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(state.shippingAddress));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(state.paymentMethod));
    },
    loadState: (state) => {
      // Load state from localStorage
      const savedBucketItems = localStorage.getItem("bucketItems");
      const savedTotalPrice = localStorage.getItem("totalPrice");
      const savedShippingAddress = localStorage.getItem("shippingAddress");
      const savedPaymentMethod = localStorage.getItem("paymentMethod");

      if (savedBucketItems) {
        state.bucketItems = JSON.parse(savedBucketItems);
      }
      if (savedTotalPrice) {
        state.totalPrice = JSON.parse(savedTotalPrice);
      }
      if (savedShippingAddress) {
        state.shippingAddress = JSON.parse(savedShippingAddress);
      }
      if (savedPaymentMethod) {
        state.paymentMethod = JSON.parse(savedPaymentMethod);
      }
    },
    clearBucketItems: (state) => {
      // Clear the bucketItems array and reset the total price
      state.bucketItems = [];
      state.totalPrice = 0;

      // Update localStorage
      localStorage.setItem("bucketItems", JSON.stringify(state.bucketItems));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
  },
});

// Export actions and reducer
export const {
  addToBucket,
  removeFromBucket,
  saveShippingAddress,
  savePaymentMethod,
  loadState, // Add loadState action
  clearBucketItems, // Add clearBuckettItems action
} = bucketListSlice.actions;
export default bucketListSlice.reducer;


