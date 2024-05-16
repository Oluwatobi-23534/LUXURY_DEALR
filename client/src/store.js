import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import bucketListReducer, {
  saveShippingAddress,
  savePaymentmethod,
  loadState, // Import loadState instead of setBucketItems
} from "./slices/bucketListSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    bucketList: bucketListReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// Load shipping address and bucket items from local storage
const savedShippingAddress = localStorage.getItem("shippingAddress");
const savedBucketItems = localStorage.getItem("bucketItems"); // Load bucket items
const savedPaymentMethod = localStorage.getItem("paymentMethod"); // Load payment method

// Parse and dispatch if exists
if (savedShippingAddress) {
  const parsedAddress = JSON.parse(savedShippingAddress);
  store.dispatch(saveShippingAddress(parsedAddress));
}

if (savedBucketItems || savedPaymentMethod) {
  store.dispatch(loadState()); // Dispatch loadState action
}

export default store;
