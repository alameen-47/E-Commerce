import React from "react";
import home from "../assets/icons/Home Page1.png";
import orders from "../assets/icons/Box1.png";
import wishlist from "../assets/icons/Favorite1.png";
import menu from "../assets/icons/Squared Menu1.png";
import profile from "../assets/icons/User1.png";
import { Link, NavLink } from "react-router-dom";
import { Button, Dropdown, Space } from "antd";
import { t } from "i18next";
import { FaAddressCard, FaUser } from "react-icons/fa";

export const MenuBar = () => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-black text-white flex justify-around pt-[0.1rem] md:hidden h-[3rem]"
      style={{ zIndex: 9999 }}
    >
      <Link to="/dashboard/user/orders">
        <button className="flex flex-col items-center focus:bg-[#D9D9D9]/20 px-2 rounded-lg">
          <img className="w-7 h-auto m" src={orders} alt="" />
          <span className="text-[.6rem]">Orders</span>
        </button>
      </Link>
      <Dropdown
        overlay={
          <div className="bg-black rounded-md py-1 px-3  flex flex-col justify-start align-middle items-start  text-white  focus:bg-[#D9D9D9]/20  ">
            <Link to="/dashboard/user/edit-profile">
              <div className="flex items-center hover:text-gray-400 leading-0 font-semibold mb-0 text-center">
                <FaUser className="mr-2" />
                <p className="mb-0 py-1 ">View Profile</p>
              </div>
            </Link>
            <Link to="/dashboard/user/edit-address">
              <div className="flex items-center hover:text-gray-400 leading-0 font-semibold mb-0 text-center">
                <FaAddressCard className="mr-2" />
                <p className="mb-0 py-1">Edit Address</p>
              </div>
            </Link>
          </div>
        }
        placement="top"
        arrow
        trigger={["click"]}
        overlayClassName="custom-dropdown" // Custom class for styling arrow and content
      >
        <button className="flex flex-col items-center  focus:bg-[#D9D9D9]/20  px-2 rounded-lg">
          <img className="w-7 h-auto m" src={profile} alt="" />
          <span className="text-[.6rem] ">You</span>
        </button>
      </Dropdown>
      <NavLink to={"/"}>
        <button className="flex flex-col items-center  focus:bg-[#D9D9D9]/20  px-2 rounded-lg">
          <img className="w-7 h-auto m" src={home} alt="" />
          <span className="text-[.6rem]">Home</span>
        </button>
      </NavLink>
      <button className="flex flex-col items-center  focus:bg-[#D9D9D9]/20  px-2 rounded-lg">
        <img className="w-7 h-auto m" src={wishlist} alt="" />
        <span className="text-[.6rem]">WishList</span>
      </button>

      <Dropdown
        overlay={
          <div className="bg-black rounded-md py-1 px-3  flex flex-col justify-start align-middle items-start  text-white  focus:bg-[#D9D9D9]/20 ">
            <Link to="/">
              <p className="mb-0 py-1 hover:text-gray-400  leading-0 font-semibold">
                {t("header.Home")}
              </p>
            </Link>
            <Link to="/allproducts">
              <p className="mb-0 py-1 hover:text-gray-400  leading-0 font-semibold">
                {t("header.Products")}
              </p>
            </Link>
            <Link to={`/categories`}>
              <p className="mb-0 py-1 hover:text-gray-400  leading-0 font-semibold">
                {t("header.Categories")}
              </p>
            </Link>
            <Link to="/about">
              <p className="mb-0 py-1 hover:text-gray-400  leading-0 font-semibold">
                {t("header.About Us")}
              </p>
            </Link>
            <Link to="/contact">
              <p className="mb-0 py-1 hover:text-gray-400  leading-0 font-semibold">
                {t("header.Contact Us")}
              </p>
            </Link>
          </div>
        }
        placement="bottomRight"
        arrow
        trigger={["click"]}
      >
        <button className="flex flex-col items-center  focus:bg-[#D9D9D9]/20  px-2 rounded-lg">
          <img className="w-7 h-auto m" src={menu} alt="" />
          <span className="text-[.6rem]">Menu</span>
        </button>
      </Dropdown>
      {/* </NavLink> */}
    </div>
  );
};
