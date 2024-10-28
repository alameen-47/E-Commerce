import React from "react";
import home from "../assets/icons/Home Page1.png";
import orders from "../assets/icons/Box1.png";
import wishlist from "../assets/icons/Favorite1.png";
import menu from "../assets/icons/Squared Menu1.png";
import profile from "../assets/icons/User1.png";

export const MenuBar = () => {
  return (
    <div className=" fixed bottom-0 left-0 right-0 bg-black text-white flex  justify-around pt-1 md:hidden">
      <button className="flex flex-col items-center">
        <img className="w-7 h-auto m" src={orders} alt="" />
        <span className="text-[.6rem]">Orders</span>
      </button>
      <button className="flex flex-col items-center">
        <img className="w-7 h-auto m" src={profile} alt="" />
        <span className="text-[.6rem]">You</span>
      </button>
      <button className="flex flex-col items-center">
        <img className="w-7 h-auto m" src={home} alt="" />
        <span className="text-[.6rem]">Home</span>
      </button>
      <button className="flex flex-col items-center">
        <img className="w-7 h-auto m" src={wishlist} alt="" />
        <span className="text-[.6rem]">WishList</span>
      </button>
      <button className="flex flex-col items-center">
        <img className="w-7 h-auto m" src={menu} alt="" />
        <span className="text-[.6rem]">Menu</span>
      </button>
    </div>
  );
};
