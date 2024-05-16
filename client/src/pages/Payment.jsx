import React, { useState } from "react";
import { savePaymentMethod } from "../slices/bucketListSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("");

  const handleOrder = () => {
    dispatch(savePaymentMethod(selectedPayment));
    navigate("/place-order");
  };

  return (
    
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4 mt-28">Payment Method</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
              type="radio"
              value="Paystack"
              className="form-radio h-5 w-5 text-blue-600"
              onChange={(e) => setSelectedPayment(e.target.value)}
              checked={selectedPayment === "Paystack"}
            />
            <span className="ml-2">Paystack</span>
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
    
  );
};

export default Payment;


// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { savePaymentMethod } from "../slices/bucketListSlice";

// const Payment = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [selectedPayment, setSelectedPayment] = useState("");

//   const handleOrder = () => {
//     // Save the payment method to the database
//     dispatch(savePaymentMethod(selectedPayment));
//          navigate("/place-order")
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-semibold mb-4 mt-28">Payment Method</h2>
//       <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <div className="mb-4">
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               value="Google Pay"
//               className="form-radio h-5 w-5 text-blue-600"
//               onChange={(e) => setSelectedPayment(e.target.value)}
//               checked={selectedPayment === "Google Pay"}
//             />
//             <span className="ml-2">Google Pay</span>
//           </label>
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             type="button"
//             onClick={handleOrder}
//           >
//             Confirm order
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Payment;
