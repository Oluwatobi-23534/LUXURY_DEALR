import { apiSlice } from "./apiSlice";
import { BACKEND_URL, ORDERS_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),

    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/user-orders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    payWithStripe: builder.mutation({
      query: (orderItems) => ({
        url: `${BACKEND_URL}/create-checkout-session`,
        method: "POST",
        body: orderItems,
      }),
    }),

    payWithPaystack: builder.mutation({
      query: (orderItems) => ({
        url: `${BACKEND_URL}/create-paystack-payment`,
        method: "POST",
        body: orderItems,
      }),
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/deliver/${orderId}`,
        method: "PATCH",
      }),
    }),
    updateOrderToPaid: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/pay/${orderId}`,
        method: "PATCH",
      }),
    }),
    getOrderById: builder.query({
      query: (id) => `${ORDERS_URL}/${id}`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetUserOrdersQuery,
  usePayWithStripeMutation,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useUpdateOrderToPaidMutation,
  useGetOrderByIdQuery,
  usePayWithPaystackMutation,
} = orderApiSlice;
