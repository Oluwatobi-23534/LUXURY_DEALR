import React, { useEffect, useState } from "react";
import {
  useDeliverOrderMutation,
  useGetOrderByIdQuery,
  useUpdateOrderToPaidMutation,
} from "../slices/orderApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { PaystackButton } from "react-paystack";

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderByIdQuery(orderId);
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [updateOrderToPaid] = useUpdateOrderToPaidMutation();
  const [isPaid, setIsPaid] = useState(false);

  const calculateTotal = (orderItems) => {
    return orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const publicKey = "pk_test_3e5d96895f4d5046ed8a208eaa6958a624b1bd31"; // replace with your actual public key
  const email = userInfo.email; // replace with the actual email of the user
  const amount =
    order && order.orderItems ? calculateTotal(order.orderItems) * 100 : 0;
  // convert to kobo

  const componentProps = {
    email,
    amount,
    metadata: {
      name: userInfo.name || "N/A",
      phone: userInfo.phoneNumber || "N/A",
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      console.log("Payment successful!");
      updateOrderToPaid(orderId)
        .then(() => {
          setIsPaid(true);
          toast.success("Your purchase was successful!");
          navigate("/success-page");
        })
        .catch((error) => {
          console.error("Error updating order to paid:", error);
        });
    },
    onClose: () => {
      console.log("Payment dialog closed!");
      toast.error("Wait! You need to complete your payment!");
    },
  };


  // Log the componentProps to the console
  console.log("componentProps:", componentProps);

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

  const handleMarkAsDelivered = async (orderId) => {
    await deliverOrder(orderId);
    refetch();
  };

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
                  ₦{(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <p className="text-right font-semibold text-blue-800">
            Total: ₦{calculateTotal(orderItems).toFixed(2)}
          </p>
        </div>

        <PaystackButton
          className={`cursor-pointer text-center text-xs tracking-wider uppercase font-bold text-blue-200 border-none rounded-full w-full h-12 mt-10 ${
            isPaid ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          {...componentProps}
          text={isPaid ? "Paid with Paystack" : "Pay with Paystack"}
          disabled={isPaid}
        />

        {userInfo.isAdmin && !order.isDelivered && (
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded w-full mt-4"
            onClick={() => handleMarkAsDelivered(orderId)}
          >
            Mark as Delivered
          </button>
        )}
        {loadingDeliver && <Loader />}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
