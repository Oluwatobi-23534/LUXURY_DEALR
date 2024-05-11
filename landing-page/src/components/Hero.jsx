import React, { useState, useEffect } from "react";
import "../index.css";
import About from "./About";
import { heroImg } from "../assets";
import DeliveryDetails from "./DeliveryDetails";
import Meeting from "./Meeting";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { toast } from "react-toastify";
import { setCredentials, setWelcomeMessage } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


const Hero = () => {
  
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const welcomeMessage = useSelector((state) => state.user.welcomeMessage);
  const [showBanner, setShowBanner] = useState(true);

 const getUser = async () => {
   if (!userInfo) {
     try {
       const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
         withCredentials: true,
       });
       if (res.data.user && res.data.message !== "Not Authorized") {
         dispatch(
           setCredentials({
             ...res.data.user._json,
             _id: res.data._id,
             iAdmin: res.data.user.isAdmin,
           })
         );
       } else {
         dispatch(
           setWelcomeMessage(
             "Welcome! Sign in to explore our range of luxury wholesale products."
           )
         );
       }
     } catch (error) {
       console.error("Failed to get user:", error);
       if (error.response) {
         toast.error(error.response.data.message || "An error occurred");
       } else if (error.request) {
         toast.error("No response received from server");
       } else {
         toast.error("An error occurred");
       }
     }
   }
 };




  useEffect(() => {
    getUser();
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 7000);
    return () => clearTimeout(timer); // Use "timer" instead of "Timer"
  }, []);



  return (
    <div id="top" className="w-full bg-white p-6 py-24 flex-1 relative">
      {showBanner && welcomeMessage && (
        <div
          className={`absolute top-24 right-0 w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 text-white text-center py-2 md:py-3 lg:py-4 mr-4 rounded-lg shadow-lg ${
            showBanner ? "banner-enter" : "banner-exit"
          }`}
          style={{
            background:
              "linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.4))",
          }}
        >
          <h2 className="text-2xl font-bold">Welcome!</h2>
          <p className="text-xl">
            Sign in to <span className="underline">explore</span>
          </p>
          <p>our range of luxury wholesale products.</p>
        </div>
      )}

      <div className="lg:max-w-[1480px] m-auto grid lg:grid-cols-2 max-w-[600px]">
        <div className="flex flex-col justify-start gap-4">
          <p className="py-2 text-3xl text-[#3b82f6] font-medium">
            Creating Opportunities for Affordable Luxury.
          </p>
          <h1 className="lg:leading-[72px] py-2 text-start lg:text-4xl text-2xl font-semibold">
            The <span className="text-[#3b82f6]">Luxury Dealr</span> is your
            gateway to affordable luxury, offering a diverse range of{" "}
            <span className="text-[#3b82f6]">high-end products</span>, from tech
            gadgets to high-performance vehicles. Experience the finer things in
            life without breaking the bank with us.
          </h1>
          <p className="py-2 text-lg text-gray-600">
            Join The Luxury Dealr for a wider selection of quality electronics,
            expert marketing, and opportunities for increased sales and growth.
          </p>
        </div>
        <img
          src={heroImg}
          alt="hero-pic"
          className="lg:order-last order-first h-80 w-auto shadow-lg lg:mt-0 lg:ml-16 mt-8 rounded-lg"
        />
      </div>

      <section id="about" className="pt-20">
        <About />
      </section>
      <section id="delivery" className="pt-20">
        <DeliveryDetails />
      </section>
      <section id="meeting" className="pt-20">
        <Meeting />
      </section>
    </div>
  );


};

export default Hero;
