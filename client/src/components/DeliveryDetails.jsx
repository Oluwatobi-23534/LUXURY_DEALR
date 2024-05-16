import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";

const DeliveryDetails = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-blue-50 p-10">
      <h1 className="text-blue-900 text-4xl font-bold mb-6">
        Welcome to Our Ordering Process
      </h1>
      <ol className="list-decimal list-inside text-blue-700 mb-6">
        <li className="mb-4">
          Begin by providing your information and selecting the goods and
          quantities you desire. Once you click 'submit,' a voucher with
          detailed pricing will be sent to your email for confirmation.
        </li>
        <li className="mb-4">
          Following submission, you will be prompted to select two important
          dates. The first is for a video call to address any questions, discuss
          your order, and confirm the authenticity of the products that will be
          delivered to you. The second selection is for the delivery date of
          your ordered products. These dates will also be included in your
          voucher, ensuring seamless coordination.
        </li>
        <li>
          We understand the value of your time and the importance of a smooth
          ordering process. Feel free to reach out if you have any questions or
          need assistance at any stage.
        </li>
      </ol>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800 transition-colors duration-300"
      >
        Place your order now
      </button>
      {/* {showModal && (
        <div className="fixed top-0 right-0 mt-4 mr-4 z-50">
          <div className="bg-blue-200 p-4 rounded shadow-lg">
            <p className="text-blue-900">
              You must be signed in to place an order.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="text-red-500 hover:text-red-700"
            >
              ✕ {/* This is a "close" icon (a multiplication sign) */}
            {/* </button>
          </div>
        </div>
      )} */} 
    </div>
  );
};

export default DeliveryDetails;
