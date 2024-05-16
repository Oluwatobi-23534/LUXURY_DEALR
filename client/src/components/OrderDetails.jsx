import { useState } from "react";
import { useNavigate } from 'react-router-dom';;

const emailjs = require("@emailjs/browser");

const OrderDetails = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    products: [{ product: "", quantity: 1 }],
    otherInformation: "",
  });

  const [meetingDetails, setMeetingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    platform: "",
    videoCallDateTime: "",
    deliveryDate: "",
    noMeeting: false,
  });

  const handleInputChange = (event) => {
    setOrder({ ...order, [event.target.name]: event.target.value });
  };

  const handleChange = (index, event) => {
    setOrder((prevOrder) => {
      const updatedProducts = prevOrder.products.map((product, i) =>
        i === index
          ? { ...product, [event.target.name]: event.target.value }
          : product
      );
      return { ...prevOrder, products: updatedProducts };
    });
  };

  const handleAddProduct = () => {
    setOrder({
      ...order,
      products: [...order.products, { product: "", quantity: "" }],
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  emailjs.init("rVcTrZWBS7ynJXOFE");

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    console.log(order);

    const serviceId = "service_wjsopli";
    const templateId = "template_06stohs";
    const publicKey = "rVcTrZWBS7ynJXOFE";

    const templateParams = {
      from_name: order.name,
      from_email: order.email,
      to_name: "luxurydealr",
      message: JSON.stringify(order),
    };

    // Here you would typically send the order data to your server or email service
    emailjs.send(serviceId, templateId, templateParams, publicKey).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);

        // Show the alert message
        alert(
          "Thank you for placing your order! Your voucher will be sent to your email shortly."
        );

        // Reset the form to initial state
        setOrder({
          name: "",
          email: "",
          address: "",
          phone: "",
          products: [{ product: "", quantity: 1 }],
          otherInformation: "",
        });

        // Proceed to the next step
        setStep(2);
      },
      (error) => {
        console.log("FAILED...", error);
        alert("Failed to send order. Please try again.");
      }
    );

    setIsLoading(false);
  };

  const handleMeetingInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setMeetingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: checked,
    }));
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMeetingFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const serviceId = "service_wjsopli";
    const templateId = "template_06stohs";
    const publicKey = "rVcTrZWBS7ynJXOFE";

    const templateParams = {
      from_name: meetingDetails.name,
      from_email: meetingDetails.email,
      to_name: "luxurydealr",
      message: JSON.stringify(meetingDetails),
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert(
          "Your meeting details have been successfully submitted! We'll send you a confirmation email shortly. Looking forward to our meeting!"
        );

        // Redirect to the homepage
        navigate("/#top");

        // Reset the meeting form to initial state
        setMeetingDetails({
          name: "",
          email: "",
          phone: "",
          platform: "",
          videoCallDateTime: "",
          deliveryDate: "",
          noMeeting: false,
        });
      },
      (error) => {
        console.error("FAILED...", error);
        alert("Failed to submit form. Please try again.");
      }
    );

    setIsLoading(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000); // Reset the state after 3 seconds
  };

  return (
    <form
      id="order-top"
      onSubmit={step === 1 ? handleSubmit : handleMeetingFormSubmit}
      className="lg:p-40 p-6 w-full h-full flex flex-col justify-center items-center bg-blue-200 text-blue-500"
    >
      <h2 className="text-blue-700 text-2xl lg:text-3xl font-bold ">
        {step === 1 ? "Order Details" : "Meeting Setup"}
      </h2>
      {step === 1 && (
        <div className="container mt-4 bg-white text-blue-500 my-2 rounded shadow-lg p-6 lg:w-1/2">
          <label className="mb-2 block text-2xl font-medium text-blue-500">
            How should we address you?
            <input
              type="text"
              name="name"
              value={order.name}
              onChange={handleInputChange}
              required
              className="rounded border border-solid border-slate-100 shadow-lg block px-5 py-2 w-full"
              placeholder="Enter your name here..."
            />
          </label>
          <label className="mb-2 block text-2xl font-medium text-blue-500">
            How can we contact you?
            <input
              type="email"
              name="email"
              value={order.email}
              onChange={handleInputChange}
              required
              className="rounded border border-solid border-slate-100 shadow-lg block px-5 py-2 w-full"
              placeholder="Enter your email address here..."
            />
          </label>
          <label className="mb-2 block text-2xl font-medium text-blue-500">
            What's your phone number?
            <input
              type="tel"
              name="phone"
              value={order.phone}
              onChange={handleInputChange}
              required
              className="rounded border border-solid border-slate-100 shadow-lg block px-5 py-2 w-full"
              placeholder="Enter your phone number here..."
            />
          </label>

          <label className="mb-2 block text-2xl font-medium text-blue-500">
            What is your delivery address?
            <input
              type="text"
              name="address"
              value={order.address}
              onChange={handleInputChange}
              required
              className="rounded border border-solid border-slate-100 shadow-lg block px-5 py-2 w-full"
              placeholder="Enter address of where you want to receive your order...
              "
            />
          </label>

          <div>
            <label className="mb-2 block text-2xl font-semibold text-blue-500">
              Product:
              <input
                type="text"
                name="product"
                value={order.products[order.products.length - 1].product}
                onChange={(event) =>
                  handleChange(order.products.length - 1, event)
                }
                required
                className="rounded border border-solid border-slate-100 shadow-lg block px-5 py-2 w-full"
                placeholder="Enter product here..."
              />
            </label>
            <label className="mb-2 block text-2xl font-semibold text-blue-500">
              Quantity:
              <input
                type="number"
                name="quantity"
                value={order.products[order.products.length - 1].quantity}
                onChange={(event) =>
                  handleChange(order.products.length - 1, event)
                }
                required
                className="rounded border border-solid border-slate-100 shadow-lg block px-5 py-2 w-full"
                placeholder="Enter quantity here..."
              />
            </label>
          </div>

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddProduct}
          >
            Add another product
          </button>

          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{product.product}</td>
                    <td className="border px-4 py-2">{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <label className="mb-2 block text-2xl font-medium text-blue-500">
            Do you have any other information?
            <input
              type="text"
              name="otherInformation"
              value={order.otherInformation}
              onChange={handleInputChange}
              className="rounded border border-solid border-slate-100 shadow-lg block px-5 py-2 w-full"
              placeholder="Enter any other information here..."
            />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="container mt-4 bg-white text-blue-500 my-2 rounded shadow-lg p-6 lg:w-1/2">
          <label className="block text-blue-700 text-lg lg:text-xl font-medium mb-2">
            Your Name:
            <input
              type="text"
              name="name"
              value={meetingDetails.name}
              onChange={handleMeetingInputChange}
              className="mt-2 mb-4 block w-full p-2 rounded border-blue-300 shadow-lg text-blue-500"
              required
            />
          </label>
          <label className="block text-blue-700 text-lg lg:text-xl font-medium mb-2">
            Your Email:
            <input
              type="email"
              name="email"
              value={meetingDetails.email}
              onChange={handleMeetingInputChange}
              className="mt-2 mb-4 block w-full p-2 rounded border-blue-300 shadow-lg text-blue-500"
              required
            />
          </label>
          <label className="block text-blue-700 text-lg lg:text-xl font-medium mb-2">
            Your Phone Number:
            <input
              type="tel"
              name="phone"
              value={meetingDetails.phone}
              onChange={handleMeetingInputChange}
              className="mt-2 mb-4 block w-full p-2 rounded border-blue-300 shadow-lg text-blue-500"
              required
            />
          </label>
          <label className="block text-blue-700 text-lg lg:text-xl font-medium mb-2">
            Choose a platform:
            <select
              name="platform"
              value={meetingDetails.platform}
              onChange={handleMeetingInputChange}
              className="mt-2 mb-4 block w-full p-2 rounded border-blue-300 shadow-lg text-blue-500"
            >
              <option value="" disabled selected>
                Select your platform
              </option>
              <option value="zoom">Zoom</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="jitsimeet">Jitsi Meet</option>
            </select>
          </label>

          <label className="block text-blue-700 text-lg lg:text-xl font-medium mb-2">
            Choose a date and time for the video call:
            <input
              type="datetime-local"
              name="videoCallDateTime"
              value={meetingDetails.videoCallDateTime}
              onChange={handleMeetingInputChange}
              className="mt-2 mb-4 block w-full p-2 rounded border-blue-300 shadow-lg text-blue-500"
            />
          </label>
          <label className="block text-blue-700 text-lg lg:text-xl font-medium mb-2">
            Choose a delivery date:
            <input
              type="date"
              name="deliveryDate"
              value={meetingDetails.deliveryDate}
              onChange={handleMeetingInputChange}
              className="mt-2 mb-4 block w-full p-2 rounded border-blue-300 shadow-lg text-blue-500"
            />
          </label>
          <div className="mb-4">
            <label className="block text-blue-700 text-lg lg:text-xl font-medium mb-2">
              <input
                type="checkbox"
                name="noMeeting"
                checked={meetingDetails.noMeeting}
                onChange={handleCheckboxChange}
                className="mr-2 leading-tight form-checkbox text-blue-500"
              />
              <span className="text-sm lg:text-base">
                I do not want to book a meeting
              </span>
            </label>
          </div>
        </div>
      )}
      <button
        type="submit"
        className="mt-4 bg-blue-700 text-white text-2xl font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
        disabled={isLoading}
      >
        {isLoading
          ? "Loading..."
          : isSubmitted
          ? "Submitted"
          : step === 1
          ? "Next"
          : "Submit"}
      </button>
    </form>
  );
};

export default OrderDetails;
