import React, { useState } from "react";
import {savePaymentmethod} from '../slices/bucketListSlice'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("your_stripe_public_key");

const Payment = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedPayment, setSelectedPayment] = useState('')

  const handleOrder = () => {
    dispatch(savePaymentmethod(selectedPayment));
    navigate("/place-order")
  }


  return (
    <Elements stripe={stripePromise}>
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4 mt-28">Payment Method</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Stripe or Credit card"
                className="form-radio h-5 w-5 text-blue-600"
                onChange={(e) => setSelectedPayment(e.target.value)}
                checked={selectedPayment === "Stripe or Credit card"}
              />
              <span className="ml-2">Stripe or Credit Card</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleOrder}
            >
              Confirm order
            </button>
          </div>
        </form>
      </div>
    </Elements>
  );
};

export default Payment;
