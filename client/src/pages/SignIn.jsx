// SignIn.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/userSlice";


import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log("Response from login:", res);
      dispatch(setCredentials({ ...res }));
      console.log("Dispatched setCredentials action");
      const redirectPath = localStorage.getItem("redirectPath") || "/"; // Get the stored destination or default to home page
      localStorage.removeItem("redirectPath"); // Clear the stored destination
      navigate(redirectPath);
      toast.success("Yay! You're in!");
    } catch (error) {
      toast.error(error.data.message || error?.error);
    }
  };


  // This function initiates the Google authentication process
  const handleGoogleAuth = () => {
  try {
    window.location.href = `${BACKEND_URL}/auth/google/callback`; 
  } catch (error) {
    toast.error(error.data.message || error?.error);
  }
};

// `${BACKEND_URL}/auth/google/callback`;

  return (
    <div className="flex items-center justify-center h-screen bg-blue-300">
      <form
        onSubmit={handleSignin}
        className="w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden p-8 space-y-6 mx-4 sm:mx-0"
      >
        <h1 className="text-3xl font-bold text-blue-500 text-center">
          Sign In
        </h1>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          onClick={handleSignin}
          disabled={isLoading}
        >
          Sign In
        </button>
        <div className="flex justify-between items-center">
          <span>
            Forgot password?{" "}
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              Click here
            </Link>
          </span>
          <span>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              Register here
            </Link>
          </span>
        </div>
        <button
          type="button"
          className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
          onClick={handleGoogleAuth}
        >
          Sign In with Google
        </button>
        {isLoading && <Loader />}
      </form>
    </div>
  );
};

export default SignIn;
