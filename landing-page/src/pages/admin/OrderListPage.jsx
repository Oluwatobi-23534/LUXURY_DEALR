import React from "react";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) {
    <Loader />;
  }

  if (error) {
    toast.error(error.messsage);
  }

  return (
    <div className="bg-blue-100 min-h-screen flex items-start justify-center">
      <div className="mx-auto px-4 py-8 max-w-full sm:w-auto">
        <h2 className="text-2xl font-bold mb-4 mt-20">Orders List</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full border-collapse border border-blue-300">
            <thead className="bg-gray-50">
              <tr className="bg-blue-400">
                <th className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                  ID
                </th>
                <th className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                  User
                </th>
                <th className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                  Date
                </th>
                <th className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                  Total
                </th>
                <th className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                  Delivered
                </th>
                <th className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders?.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                    {order._id}
                  </td>
                  <td className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8 whitespace-nowrap">
                    {order.user?.username}
                  </td>
                  <td className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8 whitespace-nowrap">
                    {order.createdAt.slice(0, 10)}
                  </td>
                  <td className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                    ${order.totalPrice}
                  </td>
                  <td className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                    {order.isDelivered ? "Yes" : "No"}
                  </td>
                  <td className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

};

export default OrderListPage;
