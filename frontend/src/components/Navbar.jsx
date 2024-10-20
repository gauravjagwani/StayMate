import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { LuMenu } from "react-icons/lu";
import { FaUser } from "react-icons/fa";

const notloggedinMenuItems = [
  {
    menu: "Log In",
    link: "/login",
    isloggedin: false,
  },
  {
    menu: "Register",
    link: "/register",
    isloggedin: false,
  },
];

const loggedinMenuItems = [
  {
    menu: "Trip List",
    link: "/triplist",
    isloggedin: true,
  },
  {
    menu: "Wish List",
    link: "/wishlist",
    isloggedin: true,
  },
  {
    menu: "Property List",
    link: "/properties",
    isloggedin: true,
  },
  {
    menu: "Reservation List",
    link: "/reservations",
    isloggedin: true,
  },
  {
    menu: "Staymate your home",
    link: "/create-listing",
    isloggedin: true,
  },
  {
    menu: "Logout",
    link: "/create-listing",
    isloggedin: true,
  },
];

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [dropdown, setDropdown] = useState(false);
  console.log(user);
  return (
    <div className="py-[10px] px-[60px] sm:py-[10px] sm:px-5 flex justify-between items-center relative max-w-6xl mx-auto">
      <Link to={"/"}>
        <h1 className="text-3xl">Logo</h1>
      </Link>
      <div className="hidden lg:flex lg:w-[340px] lg: justify-between border-[2px] border-black-[2] shadow-lg rounded-[30px] h-[50px] px-5 gap-10 items-center">
        <input
          type="text"
          className="outline-none"
          placeholder="Search your stay"
        />
        <div className="bg-primary p-[6.5px] rounded-full">
          <CiSearch size={25} className="text-white " />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <Link
            to={"/create-listing"}
            className="no-underline text-black text-[14px] font-medium hover:bg-gray-100 hover:rounded-[30px] p-3 cursor-pointer"
          >
            Staymate your home
          </Link>
        ) : (
          <Link
            to={"/login"}
            className="no-underline text-black text-[14px] font-medium hover:bg-gray-100 hover:rounded-[30px] p-3 cursor-pointer"
          >
            Staymate your home
          </Link>
        )}
        <button
          className="cursor-pointer h-[48px] flex items-center px-2 gap-2 border-[2px] border-black-[2] shadow-lg rounded-[30px]"
          onClick={() => setDropdown(!dropdown)}
        >
          <LuMenu size={18} />
          {user ? (
            <img
              src={`http://localhost:4000/${user?.user?.profileImage.replace(
                "public",
                ""
              )}`}
              alt="profile-photo"
              className="w-8 h-8 object-cover rounded-full"
            />
          ) : (
            <FaUser size={18} />
          )}
        </button>
        {dropdown && !user && (
          <div className="absolute bg-white right-15 sm:right-5 top-20 ">
            {notloggedinMenuItems.map((item, index) => {
              return (
                <Link key={index} to={item?.link}>
                  {item.menu}
                </Link>
              );
            })}
          </div>
        )}
        {dropdown && user && (
          <div className="absolute bg-white right-15 sm:right-5 top-20 flex flex-col gap-3 border border-black-3 p-2.5 shadow-lg rounded-md">
            {loggedinMenuItems.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={`/${user.user._id}${item?.link}`}
                  className="hover:bg-gray-100 p-2 rounded-md"
                >
                  {item.menu}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
