import React from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const UsersListPage = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const deleteUserHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await deleteUser(id);
        toast.success(res.message)
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  if (isLoading) {
    <Loader />;
  }

  if (error) {
    toast.error(error.messsage);
  }

  return (
    <div className="mx-auto py-28 px-8 bg-white text-blue-900">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-blue-300">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                ID
              </th>
              <th className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                Username
              </th>
              <th className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                Email
              </th>
              <th className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                isAdmin
              </th>
              <th className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                  {user._id}
                </td>
                <td className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                  {user.username}
                </td>
                <td className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                  {user.email}
                </td>
                <td className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8">
                  {user.isAdmin ? "Yes" : "No"}
                </td>
                {!user.isAdmin && (
                  <td className="border border-blue-300 py-2 px-4 sm:px-6 md:px-8 whitespace-nowrap">
                    <button
                      className="mr-2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
                      onClick={() => navigate(`/admin/users/${user._id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white p-2 rounded"
                      onClick={() => deleteUserHandler(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersListPage;
