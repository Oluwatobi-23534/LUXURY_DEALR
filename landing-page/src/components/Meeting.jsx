import React, { useEffect, useState } from "react";
import "../index.css";
const emailjs = require("@emailjs/browser");

const Meeting = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [emailStatus, setEmailStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (emailStatus === "success" || emailStatus === "error") {
      const timer = setTimeout(() => {
        setEmailStatus("");
        setIsLoading(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [emailStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !phone || !message) {
      alert("Please fill in all fields.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    // emailjs IDs
    const serviceId = "service_4azd7ro";
    const templateId = "template_06stohs";
    const publickey = "rVcTrZWBS7ynJXOFE";

    // create template params
    const templateParams = {
      from_name: name,
      from_email: email,
      from_phone: phone,
      to_name: "luxurydealr",
      message: message,
    };

    // send the email using Emailjs
    emailjs
      .send(serviceId, templateId, templateParams, publickey)
      .then((response) => {
        console.log("Email sent successfully!", response);
        setEmailStatus("success");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setEmailStatus("error");
      });
  };

  return (
    <div>
      <div className="flex justify-center items-center h-[500px] bg-blue-100">
        <form
          onSubmit={handleSubmit}
          className="bg-blue-200 lg:w-[500px] h-[400px] shadow-lg rounded px-8 py-8 mb-2"
        >
          <div className="mb-4">
            <h3 className="block text-gray-700 text-sm font-bold mb-2">
              GET IN TOUCH
            </h3>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={name}
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={email}
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              value={phone}
              placeholder="Your Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={message}
              placeholder="How can we help you?"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? emailStatus === "success"
                  ? "Sent"
                  : "Sending..."
                : "Send"}
            </button>
          </div>
        </form>
      </div>

      {emailStatus === "success" && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Email sent successfully!</strong>
          <span className="block sm:inline"> Thanks for reaching out!</span>
        </div>
      )}
      {emailStatus === "error" && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Oh no!</strong>
          <span className="block sm:inline">
            {" "}
            There was an error. Kindly try again.
          </span>
        </div>
      )}
    </div>
  );
};

export default Meeting;
