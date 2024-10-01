import { Badge } from "antd";
import React, { useEffect, useState } from "react";
import { ImageCarousel } from "./ImageCarousel";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

export const ProductCard1 = ({ products }) => {
  const [cart, setCart] = useCart();
  const [units, setUnits] = useState(1);
  const navigate = useNavigate();

  
  const addToCart = (item) => {
    const updatedCart = [...cart, ...item];
    setCart(updatedCart);
    localStorage.setItem("CART", JSON.stringify(updatedCart));
    toast.success("Item Added to cart");
  };

  return (
    <div>
      <div
        onClick={() => navigate(`/product/${products.slug}`)}
        className=" text-wrap  group align-middle lg:px-5  bg-gray-300 rounded-lg flex flex-col items-center justify-center  relative after:absolute after:h-full after:bg-[#000000] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all  md:gap-1 p-2"
      >
        <Badge.Ribbon
          text={products.offer ? `${products.offer}% OFF` : ""}
          color={
            products.offer <= 33
              ? "green"
              : products.offer <= 66
              ? "yellow"
              : "red"
          }
        >
          <ImageCarousel images={products} />
        </Badge.Ribbon>
        <p className=" PRODUCT-NAME  md:mb-2 cardtxt font-semibold  text-black tracking-wider group-hover:text-white h-2 md:text-sm lg:text-[16px] sm:text-[13px] ">
          {(() => {
            const words = products.name.split(" ");
            return words.length > 1
              ? words.slice(0, 2).join(" ").toUpperCase()
              : words[0].toUpperCase();
          })()}
          {/* {products.name} */}
        </p>
        <p className="PRODUCT-DESCRIPTON mb-0 blueberry font-semibold text-gray-500  group-hover:text-gray-200  lg:text-xs md:text-sm sm:text-[.625rem] text-center px-2 break-wordsd break-words">
          {(() => {
            const description = products.description;
            return description.length > 20
              ? description.slice(0, 20) + "..."
              : description;
          })()}
        </p>
        {products.offer ? (
          <>
            <div className="flex gap-1 justify-center items-center ">
              <strike className="ordernow-text text-[#616161] font-semibold  group-hover:text-white text-center items-center lg:text-sm  sm:text-xs">
                SR:
                {Math.floor(products.price * (1 + products.offer / 100)) || ""}
                /-
              </strike>
              <span
                className={`font-semibold lg:text-lg sm:text-xs ${
                  products.offer <= 33
                    ? "text-green-500"
                    : products.offer <= 66
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {products.offer ? `${products.offer}% off` : ""}
              </span>
            </div>
            <p className=" mb-0 ordernow-text text-[#000000] font-bold  group-hover:text-white text-center items-center lg:text-lg sm:text-md">
              SR:{products.price || ""}/-
            </p>
          </>
        ) : (
          <p className=" mb-0 ordernow-text text-[#000000] font-semibold  group-hover:text-white text-center items-center lg:text-lg sm:text-xs">
            SR:{products.price || ""}/-
          </p>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent the parent onClick from firing

            addToCart([{ ...products, units }]);
          }}
          className="btun4 text-white lg:inline-flex items-center lg:gap-3 sm:gap-1 group-hover:bg-slate-100 group-hover:text-black bg-[#000] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer lg:py-2 sm:py-1 lg:px-4 sm:px-2 lg:text-sm sm:text-xs font-semibold rounded-full butn"
        >
          {t("common.ADD TO CART")}
        </button>
      </div>
    </div>
  );
};
