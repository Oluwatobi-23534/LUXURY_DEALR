import React, { useEffect, useState } from "react";
import {
  useDeliverOrderMutation,
  useGetOrderByIdQuery,
  useGetOrderDetailsQuery,
  usePayWithStripeMutation,
  useUpdateOrderToPaidMutation,
} from "../slices/orderApiSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();

  const { userInfo } = useSelector((state) => state.user);

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderByIdQuery(orderId); // Use useGetOrderByIdQuery here

  const [payWithStripe, { isLoading: loadingStripe }] =
    usePayWithStripeMutation();
  const [isPaid, setIsPaid] = useState(false);
  const [updateOrderToPaid] = useUpdateOrderToPaidMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  useEffect(() => {
    if (order) {
      setIsPaid(order.isPaid);
    }
  }, [order]);

  if (error) {
    return toast.error(error.message);
  }

  if (isLoading) {
    console.log("Loading...");
    return <Loader />;
  }

  const { shippingAddress, user, isDelivered, orderItems } = order;

  const calculateTotal = (orderItems) => {
    return orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const handleStripePayment = async (orderItems) => {
    try {
      const res = await payWithStripe(orderItems).unwrap();
      window.location.href = res.url;

      // Call the mutation to update the order status in the database
      await updateOrderToPaid(orderId); // replace orderId with the actual ID of the order

      setIsPaid(true);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleMarkAsDelivered = async (orderId) => {
    await deliverOrder(orderId);
    refetch()
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-start p-4 md:p-8 mt-8 mb-8 md:mt-24">
      <div className="md:w-2/3 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">
          Order Details
        </h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">
            Order Number:
          </h3>
          <p className="text-blue-600">{orderId}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">
            Shipping Details:
          </h3>
          <p className="text-blue-600">Name: {user.username}</p>
          <p className="text-blue-600">Email: {user.email}</p>
          <p className="text-blue-600">Address: {shippingAddress.address}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">
            Order Status:
          </h3>
          <p
            className={
              isDelivered
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {isDelivered
              ? "Yay! It's been delivered!"
              : "Hang tight! It's not delivered yet."}
          </p>
        </div>
      </div>

      <div className="md:w-1/3 bg-blue-100 p-4 md:p-8 rounded-md shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-blue-900">
          Order Summary
        </h3>
        <table className="table-auto w-full mb-8 border-collapse border-2 border-gray-600 text-slate-100">
          <thead>
            <tr>
              <th className="px-2 sm:px-4 py-2 border-2 border-gray-200 text-center text-blue-700">
                Product
              </th>
              <th className="px-1 sm:px-2 py-2 border-2 border-gray-200 text-center text-blue-700">
                Quantity
              </th>
              <th className="px-1 sm:px-2 py-2 border-2 border-gray-200 text-center text-blue-700">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {orderItems?.map((item) => (
              <tr key={item._id} className="border-t border-2 border-gray-200">
                <td className="px-2 sm:px-4 py-2 border-2 border-gray-200 text-center text-blue-600">
                  {item.name}
                </td>
                <td className="px-1 sm:px-2 py-2 border-2 border-gray-200 text-center text-blue-600">
                  {item.quantity}
                </td>
                <td className="px-1 sm:px-2 py-2 border-2 border-gray-200 text-center text-blue-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <p className="text-right font-semibold text-blue-800">
            Total: ${calculateTotal(orderItems).toFixed(2)}
          </p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full mt-4"
          onClick={() => handleStripePayment(orderItems)}
        >
          {isPaid
            ? "Paid with Stripe"
            : userInfo.isAdmin
            ? "Payment Pending"
            : "Pay with Stripe"}
        </button>

        {userInfo.isAdmin && !order.isDelivered && (
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded w-full mt-4"
            onClick={() => handleMarkAsDelivered(orderId)}
          >
            Mark as Delivered
          </button>
        )}
        {loadingStripe && <Loader />}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
