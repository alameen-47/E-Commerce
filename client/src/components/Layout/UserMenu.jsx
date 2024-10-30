import React from "react";

import account from "../../assets/icons/User Menu Male.png";
import user from "../../assets/icons/User.png";
import address from "../../assets/icons/Address.png";
import coupon from "../../assets/icons/Gift Card.png";
import logout from "../../assets/icons/Logout.png";
import orders from "../../assets/icons/Box.png";
import liked from "../../assets/icons/Favorite1.png";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

export const UserMenu = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Signed Out Successfully");
  };
  return (
    <>
      <div
        class=" md:block sm:hidden top-0 left-0 px-4 bg-black text-white transition-all z-50
            sm:w-48  xl:w-72 transform -translate-x-full sm:translate-x-0 rounded-l-lg flex flex-col   text-center py-5 drop-shadow-2xl shadow-xl"
      >
        <div className="flex gap-3  text-center justify-start  align-middle items-start">
          <img src={account} alt="" className="w-10 h-10" />
          <h1 className="uppercase font-bold  text-[20px] text-center flex py-1">
            My account
          </h1>
        </div>
        <div className="w-full border-b border-gray-300 "></div> {/* Divider */}
        <NavLink to="/dashboard/user/edit-profile">
          <div className="flex   text-center justify-start  align-middle  mt-4  rounded-lg hover:bg-gray-300/30  transition gap-3 duration-200 items-center ">
            <img src={user} alt="" className="w-8 h-10" />
            <h1 className="uppercase font-bold flex justify-center items-center align-middle my-auto ">
              Profile Details
            </h1>
          </div>
        </NavLink>
        <NavLink to="/dashboard/user/edit-address">
          <div className="flex   text-center justify-start  align-middle  mt-4  rounded-lg hover:bg-gray-300/30  transition gap-3 duration-200 items-center ">
            <img src={address} alt="" className="w-8 h-10" />
            <h1 className="uppercase font-bold flex justify-center items-center align-middle my-auto ">
              Edit address
            </h1>
          </div>
        </NavLink>
        <div className="w-full border-b border-gray-300 py-2"></div>{" "}
        {/* Divider */}
        <NavLink to="/dashboard/user/orders">
          <div className="flex   text-center justify-start  align-middle  mt-4  rounded-lg hover:bg-gray-300/30  transition gap-3 duration-200 items-center py-1">
            <img src={orders} alt="" className="w-8 h-8" />
            <h1 className="uppercase font-bold flex justify-center items-center align-middle my-auto ">
              My orders
            </h1>
          </div>
        </NavLink>
        <NavLink to="/dashboard/user/coupons">
          <div className="flex   text-center justify-start  align-middle  mt-4  rounded-lg hover:bg-gray-300/30  transition gap-3 duration-200 items-center ">
            <img src={coupon} alt="" className="w-8 h-10" />
            <h1 className="uppercase font-bold flex justify-center items-center align-middle my-auto ">
              My Coupons
            </h1>
          </div>
        </NavLink>
        <NavLink to="/dashboard/user/liked-products">
          <div className="flex   text-center justify-start  align-middle  mt-4  rounded-lg hover:bg-gray-300/30  transition gap-3 duration-200 items-center ">
            <img src={liked} alt="" className="w-8 h-9" />
            <h1 className="uppercase font-bold flex justify-center items-center align-middle my-auto ">
              My Wishlist
            </h1>
          </div>
        </NavLink>
        <div className="w-full border-b border-gray-300 py-2"></div>{" "}
        {/* Divider */}
        <NavLink to="/signin">
          <div
            onClick={handleLogout}
            className="flex   text-center justify-start  align-middle  mt-4  rounded-lg hover:bg-gray-300/30  transition gap-3 duration-200 items-center "
          >
            <img src={logout} alt="" className="w-8 h-10" />
            <h1 className="uppercase font-bold flex justify-center items-center align-middle my-auto ">
              logout
            </h1>
          </div>
        </NavLink>
      </div>
    </>
  );
};
