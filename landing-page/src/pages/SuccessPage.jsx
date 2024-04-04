import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/products");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="p-6 m-4 bg-white rounded shadow-md w-80 sm:w-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Payment Successful!
        </h1>
        <p className="text-blue-600">
          Thank you for your purchase. Your payment has been successfully
          processed.
        </p>
        <button
          onClick={handleContinueShopping}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
