import React from "react";
import { PaystackButton } from "react-paystack";
import { useSelector } from "react-redux";
import { useUpdateOrderToPaidMutation } from "../slices/orderApiSlice";

const Paystack = ({ orderItems }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [updateOrderToPaid] = useUpdateOrderToPaidMutation();

  const calculateTotal = (orderItems) => {
    return orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const config = {
    reference: new Date().getTime(),
    email: userInfo.email,
    amount: calculateTotal(orderItems) * 100,
    publicKey: process.env.PAYSTACK_PUBLIC_KEY,
  };

    const handleSuccess = async (reference) => {
      console.log("Transaction successful", reference);
      await updateOrderToPaid(orderId);
    };

  const handleClose = () => {
    console.log("Payment closed");
  };

  return (
    <PaystackButton
      className="paystack-button"
      callback={handleSuccess}
      close={handleClose}
      disabled={false}
      embed={false}
      reference={config.reference}
      email={config.email}
      amount={config.amount}
      paystackkey={config.publicKey}
      tag="button"
    />
  );
};

export default Paystack;
