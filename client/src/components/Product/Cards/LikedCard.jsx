import React, { useEffect, useState } from "react";
import { ImageCarousel } from "../ImageCarousel";
import { useCart } from "../../../context/cart";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import toast from "react-hot-toast";

// Translation function
const translateText = async (text, targetLanguage) => {
  const { data } = await axios.post("/api/v1/translate", {
    text,
    targetLanguage,
  });
  return data.translatedText;
};

export const LikedCard = ({ product, onRemove }) => {
  const [cart, setCart] = useCart();
  const { i18n } = useTranslation();
  const [units, setUnits] = useState(1);
  // const [product, setProduct] = useState();
  const isEnglish = i18n.language === "en"; // Check if the language is English
  const [translatedProduct, setTranslatedProduct] = useState(product);
  // Function to translate all string fields and update image paths

  const getProduct = async (product) => {
    if (!product) {
      console.error("Product object is undefined or null");
      return;
    }
    const updatedProduct = { ...product };
    const fieldsToTranslate = ["name"];
    const fieldValues = [];

    // Collect the values of fields to translate
    for (let key of fieldsToTranslate) {
      if (typeof product[key] === "string") {
        fieldValues.push(product[key]);
      }
    }

    // Join the collected values into a single string with a unique delimiter (e.g., "||")
    const combinedValues = fieldValues.join("||");

    // Send the combined string for translation
    const translatedCombined = await translateText(
      combinedValues,
      i18n.language
    );
    // Split the translated response back into individual translated values
    const translatedArray = translatedCombined.split("||");
    // Map the translated values back to their respective fields
    fieldsToTranslate.forEach((key, index) => {
      if (translatedArray[index]) {
        updatedProduct[key] = translatedArray[index].trim();
      }
    });

    return setTranslatedProduct(updatedProduct);
  };
  console.log(setTranslatedProduct, "TRANSLATED PRODUCT");
  useEffect(() => {
    getProduct(product);
  }, [product]);

  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("CART")) || [];
    const updatedCart = [...existingCart, ...item];
    setCart(updatedCart);
    localStorage.setItem("CART", JSON.stringify(updatedCart));
    toast.success("Item Added to cart");
  };

  return (
    <>
      <div className="md:p-3.5 sm:p-3  h-[20rem]  w-full bg-[#D9D9D9] rounded-lg drop-shadow-md shadow-xl">
        <>
          <div className=" md:h-[60%] sm:h-[] bg-white rounded-lg">
            <ImageCarousel
              product={translatedProduct}
              className="
            flex items-center align-middle m-auto
            "
            />
          </div>
          <div className=" rounded-lg flex flex-col justify-center  ">
            <h1 className="mb-0 md:text-xl  font-bold  text-black">
              {(() => {
                const words = translatedProduct.name.split(" ");
                return words.length > 1
                  ? words.slice(0, 2).join(" ").toUpperCase()
                  : words[0].toUpperCase();
              })()}{" "}
            </h1>
            {translatedProduct.offer ? (
              <div className="mb-0 font-bold text-white flex-col  flex ">
                <div className="flex items-center md:gap-2 sm:gap-1">
                  <strike className="text-xs text-[#888888]">
                    {" "}
                    {Math.floor(
                      translatedProduct.price *
                        (1 + translatedProduct.offer / 100)
                    ) || ""}
                    /-
                  </strike>
                  <span className=" sm:text-md md:text-lg text-[#D00000]">
                    {translatedProduct.offer}%{" "}
                    <span className="text-xs ">OFF</span>
                  </span>
                </div>
                <div className="text-black sm:text-md md:text-lg font-bold">
                  SR: {translatedProduct.price || ""}/-{" "}
                </div>

                <div className="flex  gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart([{ ...translatedProduct, units }]);
                    }}
                    className={`btun4 text-white lg:inline-flex  group-hover:bg-slate-100 group-hover:text-black bg-[#000] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer lg:py-1 sm:py-1 lg:px-4 sm:px-3  font-semibold rounded-lg lg:gap-3 sm:gap-1 butn
          ${
            isEnglish
              ? "md:text-sm lg:text-base sm:text-[0.7rem]"
              : "md:text-xs lg:text-sm sm:text-[0.6rem]"
          }`}
                  >
                    {t("common.ADD TO CART")}
                  </button>
                  <button
                    className="text-xs underline text-gray-600"
                    onClick={() => onRemove(translatedProduct._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <p className=" mb-0 ordernow-text text-[#000000] font-semibold  group-hover:text-white text-center items-center lg:text-lg sm:text-xs ">
                SR{t("cart.SAR")}::{translatedProduct.price || ""}/-
              </p>
            )}
          </div>
        </>
      </div>
    </>
  );
};
