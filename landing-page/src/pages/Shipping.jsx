import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/bucketListSlice";

const Shipping = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   // Load shipping address from local storage
   const savedShippingAddress =
     JSON.parse(localStorage.getItem("shippingAddress")) || {};

   const [name, setName] = useState(savedShippingAddress.name || "");
   const [address, setAddress] = useState(savedShippingAddress.address || "");
   const [city, setCity] = useState(savedShippingAddress.city || "");
   const [postalCode, setPostalCode] = useState(
     savedShippingAddress.postalCode || ""
   );
   const [country, setCountry] = useState(savedShippingAddress.country || "");
   const [phoneNumber, setPhoneNumber] = useState(
     savedShippingAddress.phoneNumber || ""
   );

   const submitHandler = (e) => {
     e.preventDefault();
     const shippingAddress = {
       name,
       address,
       city,
       postalCode,
       country,
       phoneNumber,
     };
     dispatch(saveShippingAddress(shippingAddress));

     // Save to local storage
     localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));

      navigate("/payment");
   };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4 sm:p-6 md:p-8">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md mt-16 bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl"
      >
        <div className="md:flex">
          <div className="w-full p-3 px-6 py-10">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                <FontAwesomeIcon
                  icon={faShippingFast}
                  className="text-blue-500"
                />{" "}
                Shipping
              </h1>

              <p className="text-blue-500">
                Please enter your shipping details:
              </p>
            </div>
            <div className="mt-5">
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="mt-5">
              <label className="text-sm text-gray-600">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="mt-5">
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="mt-5">
              <label className="text-sm text-gray-600">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="mt-5">
              <label className="text-sm text-gray-600">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="mt-5">
              <label className="text-sm text-gray-600">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={submitHandler}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
