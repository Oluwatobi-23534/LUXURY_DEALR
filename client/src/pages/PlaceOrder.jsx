import React from "react";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { clearBucketItems } from "../slices/bucketListSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bucketList = useSelector((state) => state.bucketList);

  const {
    bucketItems,
    shippingAddress: { address, city, postalCode, country },
    paymentMethod,
    itemsPrice,
    totalPrice,
  } = bucketList;

  const [createOrder, { isLoading }] = useCreateOrderMutation();

 const handlePlaceOrder = async () => {
   try {
     const userInfo = JSON.parse(localStorage.getItem("userInfo"));

     // Log the bucketItems to the console
     console.log("bucketItems:", bucketItems);

     const orderData = {
       orderItems: bucketItems.map((item) => ({
         ...item,
         qty: item.qty, // Include the quantity
         totalItemPrice: item.price * item.qty, // Calculate and include the total item price
         image: item.images[0],
       })),
       shippingAddress: { address, city, postalCode, country },
       paymentMethod,
       itemsPrice,
       totalPrice,
       token: userInfo.token, // Include the token in the order object
     };

     // Log the orderItems to the console
     console.log("orderItems:", orderData.orderItems);

     const res = await createOrder(orderData).unwrap();
     dispatch(clearBucketItems());
     // Display a success toast message
     toast.success("Order placed successfully!");
     navigate(`/order/${res._id}`);
   } catch (error) {
     // Display an error toast message
     toast.error(error.data.message || error?.error);
   }
 };





  return (
    <div className="flex flex-col md:flex-row justify-center items-start p-4 md:p-8 mt-8 mb-8 md:mt-24">
      <div className="md:w-2/3 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">
          Place Order
        </h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">
            Shipping Address:
          </h3>
          <p className="text-blue-600">
            {address}, {city}, {postalCode}, {country}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">
            Payment Method:
          </h3>
          <p className="text-blue-600">{paymentMethod}</p>
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
              <th className="px-2 sm:px-4 py-2 border-2 border-gray-200 text-center text-blue-700">
                Image
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
            {bucketItems.map((item) => (
              <tr key={item._id} className="border-t border-2 border-gray-200">
                <td className="px-2 sm:px-4 py-2 border-2 border-gray-200 text-center text-blue-600">
                  {item.name}
                </td>
                <td className="px-2 sm:px-4 py-2 border-2 border-gray-200 text-center text-blue-600">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    style={{ width: "30px", height: "30px" }}
                  />
                </td>
                <td className="px-1 sm:px-2 py-2 border-2 border-gray-200 text-center text-blue-600">
                  {item.qty}
                </td>
                <td className="px-1 sm:px-2 py-2 border-2 border-gray-200 text-center text-blue-600">
                  ₦{(item.price * item.qty).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <p className="text-right font-semibold text-blue-800">
            Total: ₦{totalPrice}
          </p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full mt-4"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
        {isLoading && <Loader />}
      </div>
    </div>
  );


};

export default PlaceOrder;




