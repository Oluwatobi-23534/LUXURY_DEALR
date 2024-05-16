import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserOrdersQuery } from "../slices/orderApiSlice";
import { useUpdateUserprofileMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/userSlice";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  console.log(userInfo);

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { data: userOrders, isLoading, error } = useGetUserOrdersQuery();
  const [updateUser, { isLoading: isUpdating }] =
    useUpdateUserprofileMutation();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Oops! Passwords aren't matching. Try again?");
      return;
    }

    const res = await updateUser({
      _id: userInfo._id,
      name,
      email,
      password,
    }).unwrap();
    dispatch(setCredentials({ ...res }));
    console.log(res);
    toast.success("Profile updated! Yay!");
  };

  if (error) {
    return toast.error(error.message);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-4 md:p-8 mt-8 mb-8 md:mt-24">
      <div className="md:w-1/4 p-4 bg-blue-100 rounded-md shadow-lg mb-4 md:mb-0 md:mr-8">
        <h1 className="text-2xl font-semibold mb-4 text-blue-900">Profile</h1>
        <form className="mb-6" onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-blue-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border p-2 w-full rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border p-2 w-full rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blue-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border p-2 w-full rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-blue-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="border p-2 w-full rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full mt-4"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </button>
          {isUpdating && <Loader />}
        </form>
      </div>
      <div className="w-full md:w-3/4 p-2 md:p-4 bg-blue-200 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">
          Your Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-full mb-8 border-collapse border-2 border-blue-600 text-blue-900">
            <thead className="bg-black">
              <tr>
                <th className="px-2 sm:px-4 py-2 border border-blue-700 text-center text-white">
                  Order ID
                </th>
                <th className="px-2 sm:px-4 py-2 border border-blue-700 text-center text-white">
                  Date
                </th>
                <th className="px-2 sm:px-4 py-2 border border-blue-700 text-center text-white">
                  Total
                </th>
                <th className="px-2 sm:px-4 py-2 border border-blue-700 text-center text-white">
                  Delivered
                </th>
                <th className="px-2 sm:px-4 py-2 border border-blue-700 text-center text-white">
                  Payment Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {userOrders?.map((order) => (
                <tr key={order._id}>
                  <td className="border border-blue-700 p-2 text-blue-800 text-center">
                    {" "}
                    {order._id}{" "}
                  </td>
                  <td className="border border-blue-700 p-2 text-blue-800 text-center">
                    {" "}
                    {order.createdAt.slice(0, 10)}{" "}
                  </td>
                  <td className="border border-blue-700 p-2 text-blue-800 text-center">
                    {" "}
                    ₦{order.totalPrice}{" "}
                  </td>
                  <td className="border border-blue-700 p-2 text-blue-800 text-center">
                    {" "}
                    {order.isDelivered ? "Yes" : "No"}{" "}
                  </td>
                  <td className="border border-blue-700 p-2 text-blue-800 text-center sm:flex-row items-center justify-center">
                    {order.isPaid ? (
                      "Yup, Paid!"
                    ) : (
                      <div className="flex flex-col sm:flex-row items-center justify-center">
                        <span>Nope, Not Yet</span>
                        <button
                          onClick={() =>
                            (window.location.href = `/order/${order._id}`)
                          }
                          className="mt-2 sm:mt-0 sm:ml-2 py-1 px-2 bg-blue-500 text-white rounded flex items-center"
                        >
                          Let's Settle
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="ml-2"
                          />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {userOrders.length === 0 && (
          <p className="text-red-600 text-xl text-center mt-5">No Orders</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
