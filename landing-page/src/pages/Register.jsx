import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/userSlice";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    } else {
      try {
        const res = await register({
          username,
          email,
          password,
          authMethod: "local",
        }).unwrap(); // This should call the register endpoint
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Yay! You're all set up. Welcome aboard!");
      } catch (error) {
        toast.error(error.data.message || error?.error);
      }
    }
  };



  const handleGoogleAuth = () => {
    try {
      window.location.href = `${BACKEND_URL}/auth/google/callback`;
    } catch (error) {
      toast.error(error.data.message || error?.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-300 p-4 sm:p-0">
      <form
        onSubmit={handleRegister}
        className="mt-4 mb-4 md:mt-16 md:mb-0 w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden p-8 space-y-6 mx-4 sm:mx-0"
      >
        <h1 className="text-3xl font-bold text-blue-500 text-center">
          Register
        </h1>
        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          onClick={handleRegister} // This should trigger the handleRegister function
          disabled={isLoading}
        >
          Register
        </button>
        <div className="flex justify-between items-center">
          <span>
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              Sign in here
            </Link>
          </span>
        </div>
        <button
          type="button"
          className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
          onClick={handleGoogleAuth}
        >
          Continue with Google
        </button>
        {isLoading && <Loader />}
      </form>
    </div>
  );
};

export default Register;
