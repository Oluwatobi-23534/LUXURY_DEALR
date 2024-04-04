import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      try {
        await resetPassword({ resetToken, password }).unwrap();
        toast.success("Woohoo! Your password has been reset!");
        navigate("/");
      } catch (error) {
        // Handle the error here
        console.error(error);
        toast.error("An error occurred while resetting the password.");
      }
    }
    setIsLoading(false);
  };


  return (
    <div className="flex items-center justify-center h-screen bg-blue-300">
      <form
        onSubmit={handleResetPassword}
        className="w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden p-8 space-y-6 mx-4 sm:mx-0"
      >
        <h1 className="text-3xl font-bold text-blue-500 text-center">
          Reset Password
        </h1>
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          onClick={handleResetPassword}
          disabled={isLoading}
        >
          Let's Get You a New Password!
        </button>
        <div className="flex items-center justify-between lg:whitespace-nowrap text-sm">
          <span>
            Remembered your password?{" "}
            <Link
              to="/sign-in"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              Sign In
            </Link>
          </span>
          <span className="ml-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              Register here
            </Link>
          </span>
        </div>

        {isLoading && <Loader />}
      </form>
    </div>
  );

};

export default ResetPassword;
