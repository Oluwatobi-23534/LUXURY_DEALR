import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { email, linkedin, facebook, instagram } from "../assets";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <footer className="bg-blue-800 text-white p-6 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between">
          <div>
            <h3 className="text-lg font-bold">
              <HashLink to="/#top">LUXURY DEALR</HashLink>
            </h3>
            <p>08117597093, 08127011644</p>
            <p>luxurydealr@gmail.com</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul>
              <li>
                <HashLink smooth to="/#about" className="font-medium">
                  About
                </HashLink>
              </li>
              <li>
                <HashLink to="/products#products-top">Products</HashLink>
              </li>
              <li>
                <button onClick={() => setShowModal(true)}>Order</button>
              </li>
              <li>
                <HashLink smooth to="/#delivery">
                  Delivery
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#meeting">
                  Contact Us
                </HashLink>
              </li>
            </ul>
          </div>
          <div>
            <a
              href="https://www.facebook.com/TheLuxuryDealr?mibextid=LQQJ4d"
              target="_blank"
              rel="noreferrer"
            >
              <img src={facebook} alt="Facebook" width="24" height="24" />
            </a>
            <a
              href="https://www.linkedin.com/company/the-luxury-dealr/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" width="24" height="24" />
            </a>
            <a
              href="https://instagram.com/__dealr?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagram} alt="Instagram" width="24" height="24" />
            </a>
            <a
              href="mailto:luxurydealr@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src={email} alt="Email" width="24" height="24" />
            </a>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <p>
              © {new Date().getFullYear()} LUXURY DEALR. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {showModal && (
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
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
