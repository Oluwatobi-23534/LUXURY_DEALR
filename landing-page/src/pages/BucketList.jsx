import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromBucket } from "../slices/bucketListSlice";
import { Link, useNavigate } from "react-router-dom";

const BucketList = () => {
  const dispatch = useDispatch();
  const { bucketItems, totalPrice } = useSelector((state) => state.bucketList);
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleProceedToShipping = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      localStorage.setItem("redirectPath", "/shipping"); // Store the intended destination
      navigate("/sign-in");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-slate-700 p-4 overflow-x-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-24 mb-4 text-center text-slate-100">
        🛒 Bucket List 🛒
      </h1>

      {bucketItems.length > 0 ? (
        <div className="w-full max-w-2xl overflow-x-auto">
          <table className="table-auto w-full mb-8 border-collapse border-2 border-gray-600 text-slate-100">
            <thead>
              <tr className="">
                <th className="px-2 sm:px-4 py-2 border-2 border-gray-200 text-center">
                  Item
                </th>
                <th className="px-2 sm:px-4 py-2 border-2 border-gray-200 text-center">
                  Image
                </th>
                <th className="px-1 sm:px-2 py-2 border-2 border-gray-200 text-center">
                  Price
                </th>
                <th className="px-1 sm:px-2 py-2 border-2 border-gray-200 text-center">
                  Quantity
                </th>
                <th className="px-1 sm:px-2 py-2 border-2 border-gray-200 text-center">
                  Total
                </th>
                <th className="px-2 sm:px-4 py-2 border-2 border-gray-200 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {bucketItems.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-2 border-gray-200"
                >
                  <td className="px-2 sm:px-4 py-2 border-2 border-gray-200 text-center">
                    {item.name}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border-2 border-gray-200 text-center">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      style={{ width: "30px", height: "30px" }}
                    />
                  </td>
                  <td className="px-1 sm:px-2 py-2 border-2 border-gray-200 text-center">
                    ₦{item.itemPrice.toFixed(2)}
                  </td>
                  <td className="px-1 sm:px-2 py-2 border-2 border-gray-200 text-center">
                    {item.qty}
                  </td>
                  <td className="px-1 sm:px-2 py-2 border-2 border-gray-200 text-center">
                    ₦{item.totalItemPrice.toFixed(2)}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border-2 border-gray-200 text-center">
                    <button
                      onClick={() => dispatch(removeFromBucket(item._id))}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <Link
              to="/products#products-top"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add More Products
            </Link>
            <button
              onClick={handleProceedToShipping}
              className="bg-green-500 text-white p-2 rounded"
            >
              Proceed to Shipping
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8">
          <p className="text-xl font-bold mb-4 text-slate-100">
            Your bucket list is currently empty.
          </p>
          <p className="mb-4 text-slate-100">
            Discover amazing products and add them to your bucket list!
          </p>
          <Link
            to="/products#products-top"
            className="bg-blue-100 text-blue-500 hover:text-blue-800 p-2 rounded"
          >
            Explore Products
          </Link>
        </div>
      )}
      <p className="text-xl sm:text-2xl font-bold mt-4 text-center text-green-500 border-t-2 border-green-500 pt-4">
        💎 Grand Total: ₦{totalPrice.toFixed(2)} 💎
      </p>
    </div>
  );

};

export default BucketList;
