import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForgotPasswordMutation } from "../slices/userApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [forgotPassword] = useForgotPasswordMutation();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) alert("Please enter your email address");
    else {
      setIsLoading(true);
      try {
        const res = await forgotPassword({ email }).unwrap();
        toast.success(res.message);
        // Navigate to the reset password page with the reset token from the response
        navigate(`/reset-password/${res.resetToken}`);
      } catch (error) {
        toast.error(error?.data.message || error.error);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-300">
      <form
        onSubmit={handleForgotPassword}
        className="w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden p-8 space-y-6 mx-4 sm:mx-0"
      >
        <h1 className="text-3xl font-bold text-blue-500 text-center">
          Forgot Password
        </h1>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          onClick={handleForgotPassword}
          disabled={isLoading}
        >
          Let's Get You Back In!
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

export default ForgotPassword;
