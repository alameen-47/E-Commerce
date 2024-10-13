import { Badge } from "antd";
import React, { useEffect, useState } from "react";
import { ImageCarousel } from "./ImageCarousel";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
// Translation function
const translateText = async (text, targetLanguage) => {
  const { data } = await axios.post("/api/v1/translate", {
    text,
    targetLanguage,
  });
  return data.translatedText;
};
export const ProductCard1 = ({ products }) => {
  const [cart, setCart] = useCart();
  const [units, setUnits] = useState(1);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === "en"; // Check if the language is English
  const [translatedProduct, setTranslatedProduct] = useState(products);
  const fieldsToTranslate = ["name", "description", "price", "offer"]; // Add the specific keys you want
  // Function to translate all string fields and update image paths
  const translateProductFields = async (product) => {
    const translatedProduct = { ...product };
    // Loop through each key in the product
    for (let key in product) {
      if (fieldsToTranslate.includes(key)) {
        translatedProduct[key] = await translateText(
          product[key],
          i18n.language
        );
      }
    }
    // // Update the image paths
    // translatedProduct.image = product?.image.map((img) => ({
    //   ...img,
    //   filePath: `http://localhost:8085/uploads/${img.filePath}`,
    // }));

    return translatedProduct;
  };

  // Effect to handle translation on product change
  useEffect(() => {
    const translateProduct = async () => {
      try {
        const translated = await translateProductFields(products);
        setTranslatedProduct(translated); // Update state with translated product
      } catch (error) {
        console.error("Error translating product", error);
      }
    };

    translateProduct(); // Call the function when product changes
  }, [products, i18n.language]); // Re-run if the product or language changes

  const addToCart = (item) => {
    const updatedCart = [...cart, ...item];
    setCart(updatedCart);
    localStorage.setItem("CART", JSON.stringify(updatedCart));
    toast.success("Item Added to cart");
  };

  return (
    <div>
      <div
        onClick={() => navigate(`/product/${products.slug}/${products._id}`)}
        className=" text-wrap  group align-middle lg:px-5  bg-gray-300 rounded-lg flex flex-col items-center justify-center  relative after:absolute after:h-full after:bg-[#000000] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all  md:gap-1 p-2 max-w-[13rem] "
      >
        <Badge.Ribbon
          text={
            translatedProduct.offer
              ? `${translatedProduct.offer}% ${t("productDetails.OFF")}`
              : ""
          }
          color={
            translatedProduct.offer <= 33
              ? "green"
              : translatedProduct.offer <= 66
              ? "yellow"
              : "red"
          }
        >
          <ImageCarousel product={translatedProduct} />
        </Badge.Ribbon>
        <p
          className={`PRODUCT-NAME md:mb-2 sm:mb-0 cardtxt font-semibold text-black tracking-wider group-hover:text-white  break-words overflow-hidden text-ellipsis ${
            isEnglish
              ? "md:text-sm lg:text-base sm:text-xs"
              : "md:text-xs lg:text-sm sm:text-[0.6rem]"
          }`}
        >
          {(() => {
            const words = translatedProduct.name.split(" ");
            return words.length > 1
              ? words.slice(0, 2).join(" ").toUpperCase()
              : words[0].toUpperCase();
          })()}
        </p>
        <p
          className={`PRODUCT-DESCRIPTON mb-0 blueberry font-semibold text-gray-500 group-hover:text-gray-200 text-center md:px-2 break-words truncate ${
            isEnglish
              ? "lg:text-xs md:text-sm sm:text-[.625rem]"
              : "lg:text-[.75rem] md:text-[.625rem] sm:text-[.5rem]"
          }`}
        >
          {(() => {
            const description = translatedProduct.description;
            return description.length > 20
              ? description.slice(0, 20) + "..."
              : description;
          })()}
        </p>
        {translatedProduct.offer ? (
          <>
            <div className="flex gap-1 justify-center items-center ">
              <strike className="ordernow-text text-[#616161] font-semibold  group-hover:text-white text-center items-center lg:text-sm  sm:text-xs">
                {t("productDetails.SR")}:
                {Math.floor(
                  translatedProduct.price * (1 + translatedProduct.offer / 100)
                ) || ""}
                /-
              </strike>
              <span
                className={`font-semibold lg:text-lg sm:text-xs ${
                  translatedProduct.offer <= 33
                    ? "text-green-500"
                    : translatedProduct.offer <= 66
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {translatedProduct.offer
                  ? `${translatedProduct.offer}% ${t("productDetails.off")}`
                  : ""}
              </span>
            </div>
            <p className=" mb-0 ordernow-text text-[#000000] font-bold  group-hover:text-white text-center items-center lg:text-lg sm:text-md">
              {t("productDetails.SR")}:{translatedProduct.price || ""}/-
            </p>
          </>
        ) : (
          <p className=" mb-0 ordernow-text text-[#000000] font-semibold  group-hover:text-white text-center items-center lg:text-lg sm:text-xs ">
            {t("cart.SAR")}::{translatedProduct.price || ""}/-
          </p>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent the parent onClick from firing

            addToCart([{ ...translatedProduct, units }]);
          }}
          className={`btun4 text-white lg:inline-flex items-center group-hover:bg-slate-100 group-hover:text-black bg-[#000] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer lg:py-2 sm:py-1 lg:px-4 sm:px-3  font-semibold rounded-lg lg:gap-3 sm:gap-1 butn
          ${
            isEnglish
              ? "md:text-sm lg:text-base sm:text-xs"
              : "md:text-xs lg:text-sm sm:text-[0.6rem]"
          }`}
        >
          {t("common.ADD TO CART")}
        </button>
      </div>
    </div>
  );
};
