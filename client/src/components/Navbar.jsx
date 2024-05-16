import { HashLink } from "react-router-hash-link";
import { useState, useRef, useEffect } from "react";
import "../index.css";

import { menu, close } from "../assets";
import { Link, useNavigate, useParams } from "react-router-dom";
import { list } from "../assets";
import { useSelector, useDispatch } from "react-redux";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
  FaArrowRight,
  FaCaretUp,
  FaCaretDown,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/userSlice";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {keyword: urlKeyword} = useParams();

  const [logoutApi] = useLogoutMutation();
  const [toggle, setToggle] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const timerRef = useRef(null);
  const handleClick = () => setToggle(!toggle);

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const { bucketItems } = useSelector((state) => state.bucketList);
  const { userInfo } = useSelector((state) => state.user);

  const handleIconClick = () => {
    setIsClicked(!isClicked);
  };

  const handleOptionClick = async (action) => {
    setIsClicked(false);

    if (action === "logout") {
      try {
        await logoutApi().unwrap(); // Dispatch the logout mutation
        dispatch(logout()); // Clear the user data from the Redux store

        // Clear only the authentication-related data
        localStorage.removeItem("jwt");
        localStorage.removeItem("sessionID");

        // Remove specific cookies
        document.cookie =
          "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        navigate("/sign-in"); // Redirect the user to the login page
        toast.success("You're all logged out! Catch you later!");
        // Display a success notification
      } catch (error) {
        console.error("Failed to log out:", error);
        toast.error("Failed to log out"); // Display an error notification
      }
    } else if (action === "profile") {
      navigate("/profile"); // Redirect the user to the profile page
    }
  };

  useEffect(() => {
    if (isClicked) {
      timerRef.current = setTimeout(() => {
        setIsClicked(false);
      }, 60000); // Close after 60 seconds
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [isClicked]);

  const renderProfileButton = () => {
    return (
      <>
        <div className="mx-4 flex items-center justify-center relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleIconClick}
          >
            <FaUserCircle
              className="text-blue-500 hover:text-blue-700 transition-all duration-200 shadow-sm shadow-slate-500"
              size={38}
            />
            {isClicked ? (
              <FaCaretUp className="ml-1 text-blue-500" />
            ) : (
              <FaCaretDown className="ml-1 text-blue-500" />
            )}
          </div>
          {isClicked && (
            <div className="absolute top-full left-0 mt-4 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                  role="menuitem"
                  onClick={() => handleOptionClick("profile")}
                >
                  <div className="flex">
                    <div>
                      <FaUser className="inline-block mr-2" />
                    </div>
                    <div>{userInfo.name}</div>
                  </div>
                </Link>

                <Link
                  to="/logout"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                  role="menuitem"
                  onClick={() => handleOptionClick("logout")}
                >
                  <FaSignOutAlt className="inline-block mr-2" /> Log out
                </Link>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderAdminButton = () => {
    return (
      <>
        <div className="mx-4 flex items-center justify-center relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleIconClick}
          >
            <FaUserCircle
              className="text-blue-500 hover:text-blue-700 transition-all duration-200 shadow-sm shadow-slate-500"
              size={38}
            />
            {isClicked ? (
              <FaCaretUp className="ml-1 text-blue-500" />
            ) : (
              <FaCaretDown className="ml-1 text-blue-500" />
            )}
          </div>
          {isClicked && (
            <div className="absolute top-full left-0 mt-4 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                  role="menuitem"
                  onClick={() => handleOptionClick("profile")}
                >
                  <div className="flex">
                    <div>
                      <FaUser className="inline-block mr-2" />
                    </div>
                    <div>Admin</div>
                  </div>
                </Link>
                <Link
                  to="/admin/users"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                >
                  Users
                </Link>

                <Link
                  to="/admin/categories"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                >
                  Categories
                </Link>
                <Link
                  to="/admin/products"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                >
                  Products
                </Link>
                <Link
                  to="/admin/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                >
                  Orders
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                  role="menuitem"
                  onClick={() => handleOptionClick("logout")}
                >
                  <FaSignOutAlt className="inline-block mr-2" /> Log out
                </Link>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderSignInButton = () => (
    <Link
      to="/sign-in"
      className="flex items-center justify-center"
      onClick={() => {
        if (toggle) handleClick();
      }}
    >
      <button className="ml-0 lg:ml-2 relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
        Login
        <FaArrowRight className="ml-2" />
      </button>
    </Link>
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("")
    } else {
      navigate("/")
    }
  }

  return (
    <header className="w-full lg:fixed h-auto lg:h-16 bg-white border-b z-50 py-6 lg:py-0">
      <div className="lg:max-w-[1480px] max-w-[600px] m-auto w-full h-full flex justify-between items-center">
        <h1 className="text-blue-500 font-semibold text-3xl h-[25px] lg:ml-0 ml-4">
          <HashLink to="/#top">LUXURY DEALR</HashLink>
        </h1>

        <nav
          className={`${
            toggle
              ? "absolute top-8 right-0 mt-12 bg-white p-2 px-8 py-0 rounded z-10 border-t-2 border-gray-200 shadow-md"
              : "hidden"
          } lg:flex items-center justify-center w-full lg:w-auto`}
        >
          <ul
            className={`${
              toggle ? "flex flex-col gap-y-0.5 py-2" : "hidden"
            } lg:flex lg:space-y-0 gap-10 pt-8 lg:pt-0`}
          >
            <div className="lg:py-6 py-4 text-center mr-0 lg:mr-16">
              <div className="relative flex-grow lg:flex-grow-0 lg:mr-4 w-full lg:w-auto">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Find your next luxury item..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="lg:ml-4 p-2 rounded-md bg-blue-200 text-white sm:block w-full lg:w-80 px-2"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <FaSearch className="text-gray-500" />
                  </button>
                </form>
              </div>
            </div>

            <li className="lg:py-6 py-4 text-center ">
              <div className="bg-slate-300 px-4 py-2 rounded lg:bg-transparent lg:p-0 lg:mt-[8px]">
                <HashLink
                  className="sm:text-xl sm:rounded lg:rounded-none lg:text-base text-blue-500 hover:text-blue-700 font-bold transition-all duration-200 lg:hover:underline sm:p-2 lg:bg-transparent"
                  to="/products#products-top"
                  onClick={() => {
                    if (toggle) handleClick();
                  }}
                >
                  Products
                </HashLink>
              </div>
            </li>

            <li className="lg:py-6 py-4 text-center lg:mt-8">
              <div className="bg-slate-300 px-4 py-2 rounded lg:bg-transparent lg:p-0 lg:mt-[8px]">
                <HashLink
                  className="sm:text-xl sm:rounded lg:rounded-none lg:text-base text-blue-500 hover:text-blue-700 font-bold transition-all duration-200 lg:hover:underline sm:p-2 lg:bg-transparent"
                  to="/order#order-top"
                  onClick={() => {
                    if (toggle) handleClick();
                  }}
                >
                  Order
                </HashLink>
              </div>
            </li>

            <li className="lg:py-6 py-4 text-center lg:mt-8">
              <div className="bg-slate-300 px-4 py-2 rounded lg:bg-transparent lg:p-0 lg:mt-[8px]">
                <HashLink
                  className="sm:text-xl sm:rounded lg:rounded-none lg:text-base text-blue-500 hover:text-blue-700 font-bold transition-all duration-200 lg:hover:underline sm:p-2 lg:bg-transparent"
                  smooth
                  to="/#delivery"
                  onClick={() => {
                    if (toggle) handleClick();
                  }}
                >
                  Delivery
                </HashLink>
              </div>
            </li>

            <li className="lg:py-6 py-4 text-center lg:mt-8">
              <div className="bg-slate-300 px-4 py-2 rounded lg:bg-transparent lg:p-0 lg:mt-[8px]">
                <HashLink
                  className="sm:text-xl sm:rounded lg:rounded-none lg:text-base text-blue-500 hover:text-blue-700 font-bold transition-all duration-200 lg:hover:underline sm:p-2 lg:bg-transparent"
                  smooth
                  to="/#meeting"
                  onClick={() => {
                    if (toggle) handleClick();
                  }}
                >
                  Contact Us
                </HashLink>
              </div>
            </li>

            <li className="py-4 sm:flex sm:items-center sm:justify-center relative lg:ml-20">
              <div className="flex items-center justify-between sm:justify-end w-full">
                <div className=" flex items-center  justify-end">
                  <Link
                    to="/bucketlist"
                    className="relative flex items-center justify-center h-14 w-14"
                    onClick={() => {
                      if (toggle) handleClick();
                    }}
                  >
                    <div className="absolute top-0 right-0 z-20 flex items-center justify-center cursor-pointer">
                      <div
                        className={`bg-${
                          bucketItems.length > 0 ? "green" : "red"
                        }-500 text-white rounded-full h-4 w-4 flex items-center justify-center`}
                        style={{
                          backgroundColor:
                            bucketItems.length > 0 ? "#34D399" : "#EF4444",
                        }}
                      >
                        {bucketItems.length}
                      </div>
                    </div>
                    <img src={list} alt="" className="cursor-pointer" />
                  </Link>
                </div>

                {userInfo && !userInfo.isAdmin && (
                  <div className="flex-grow flex items-center justify-end">
                    {renderProfileButton()}
                  </div>
                )}
                {userInfo?.isAdmin && (
                  <div className="flex-grow flex items-center justify-end">
                    {renderAdminButton()}
                  </div>
                )}

                <div className="flex-grow flex items-center justify-center">
                  {!userInfo && renderSignInButton()}
                </div>
              </div>
            </li>
          </ul>
        </nav>
        <div className="lg:hidden" onClick={handleClick}>
          <img
            src={toggle ? close : menu}
            alt="menu"
            className={`h-8 w-auto px-4 mt-2 transition-transform duration-500 ease-in-out ${
              toggle ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
