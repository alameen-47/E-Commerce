import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import delivery from "../../../assets/icons/Delivery Scooter.png";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";
import { useTranslation } from "react-i18next";
const translateText = async (text, targetLanguage) => {
  const { data } = await axios.post("/api/v1/translate", {
    text,
    targetLanguage,
  });
  return data.translatedText;
};
export const CartCard = ({ products }) => {
  const [qty, setQty] = useState(1);
  const increment = () => setQty(qty + 1);
  const decrement = () => setQty(qty > 1 ? qty - 1 : 1);
  const [isChecked, setIsChecked] = useState(false);
  const [liked, setLiked] = useState(false);
  const { i18n } = useTranslation();

  const [translatedProduct, setTranslatedProduct] = useState(products);
  // Function to translate all string fields and update image paths
  const getProduct = async (products) => {
    if (!products) {
      console.error("Products object is undefined or null");
      return;
    }
    const updatedProduct = { ...products };
    const fieldsToTranslate = ["name", "description"];
    const fieldValues = [];

    // Collect the values of fields to translate
    for (let key of fieldsToTranslate) {
      if (typeof products[key] === "string") {
        fieldValues.push(products[key]);
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
  useEffect(() => {
    getProduct(products);
  }, [products]);
  console.log(translatedProduct, "TRANSLATED PRODUCT VALUES");

  return (
    <div>
      {Object.values(translatedProduct).map((product) => (
        <div
          key={product._id}
          className="PRODUCT-CARD-CONTAINER  bg-[#E3E2E2]  w-[100%] md:h-[20%] sm:h-[9rem] rounded-lg flex flex-row  justify-between sm:px-1 "
        >
          <div className="CARD-CONTENT rounded-lg bg-[#E3E2E2] w-auto p-2 flex flex-row  gap-2">
            {/* <Checkbox className="border border-gray-300 p-2 rounded" /> */}
            <div className="absolute">
              <label className=" relative flex ">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className=" appearance-none h-5 w-5 bg-[#E3E2E2] rounded-tl-md rounded-br-md border border-[#808080] checked:bg-gray-400/40"
                />
                {isChecked && (
                  <span className="absolute inset-0 flex top-1 justify-center text-black text-xs">
                    <FaCheck />
                  </span>
                )}
              </label>
            </div>

            <div className=" flex flex-col gap-1">
              <div className="IMAGE skeleton h-24 w-24 sm:h-[90%] sm:w-[100%] md:h-32 md:w-36 lg:h-40 lg:w-44 xl:h-48 xl:w-52"></div>
              <div className=" SUB-DETAILS md:hidden  bg-[#E3E2E2] md:h-[30%]  sm:flex md:flex-row sm:flex-col sm:items-center sm:align-middle md:gap-5 ">
                <div className=" bg-[#E3E2E2] justify-center align-middle items-center  left-0 flex md:gap-4 sm:gap-1 sm:h-[1.2rem]">
                  <div className="QUANTITY  bg-white h-full md:w-[62%] sm:w-[90%] rounded-badge  flex flex-row justify-center items-center align-middle md:gap-3 md:px-1.5 ">
                    <FaMinus
                      className="md:text-[1.5rem] sm:text-[.8rem] transform active:scale-95 active:shadow-lg transition duration-150"
                      onClick={() => decrement()}
                    />
                    <input
                      defaultValue={1}
                      value={qty}
                      className="w-[50%] text-center sm:h-[100%] "
                      onChange={(e) =>
                        setQty(parseInt(e.target.value, 10) || 1)
                      } // Optional: keep value in sync if user types
                    />
                    <FaPlus
                      className="md:text-[1.5rem] sm:text-[.8rem] transform active:scale-95 active:shadow-lg transition duration-150 "
                      onClick={() => increment()}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="DETAILS bg-[#E3E2E2] w-full h-auto sm:w-[100%]  md:w-[70%] md:h-[70%] lg:w-[40%] lg:h-[80%] flex flex-col  justify-between items-stretch sm:gap-2 md:gap-1.5 sm:gap- ">
              <span className="NAME font-bold md:text-xl sm:text-xs">
                {product.name}
              </span>
              <span className="DESCRIPTION md:flex sm:hidden text-[#746E6E] font-medium text-md">
                {/* {(() => {
                const description = translatedProduct.description;
                return description.length > 20
                  ? description.slice(0, 20) + "..."
                  : description;
              })()} */}
                {(() => {
                  const description = product.description;
                  return description.length > 20
                    ? description.slice(0, 100) + "..."
                    : description;
                })()}
              </span>
              <div className=" SUB-DETAILS bg-[#E3E2E2] md:h-[30%] sm:-[20%] md:flex-row sm:flex-col md:items-center md:align-middle md:gap-5  flex justify-between">
                <div className="flex md:gap-3 md:flex-row sm:flex-col bg-[#E3E2E2]">
                  <span className="COLOR  text-[#746E6E] sm:text-[10px] leading-0 md:text-[14px]  font-medium ">
                    Color:
                    <span className="font-semibold ml-1 text-black">Black</span>
                  </span>
                  <span className="SIZE text-[#746E6E] sm:text-[10px] leading-0 md:text-[14px]   ">
                    Size:
                    <span className="font-semibold ml-1 text-black">45</span>
                  </span>
                </div>
                <div className="bg-[#E3E2E2]   left-0 flex md:gap-4 sm:gap-1 sm:left-0">
                  <div className="QUANTITY sm:hidden md:flex  bg-white h-full md:w-[52%] sm:w-[70%] rounded-badge  flex flex-row justify-center items-center align-middle md:gap-3 md:px-1.5 sm:px-1.5">
                    <FaMinus
                      className="md:text-[1.5rem] transform active:scale-95 active:shadow-lg transition duration-150"
                      onClick={() => decrement()}
                    />
                    <input
                      defaultValue={1}
                      value={qty}
                      className="w-[50%] text-center h-[1.8rem]"
                      onChange={(e) =>
                        setQty(parseInt(e.target.value, 10) || 1)
                      } // Optional: keep value in sync if user types
                    />
                    <FaPlus
                      className="md:text-[1.5rem] transform active:scale-95 active:shadow-lg transition duration-150 "
                      onClick={() => increment()}
                    />
                  </div>
                  <div className="flex md:mt-0 sm:mt-2 sm:gap-2 ">
                    <div className="DELETE bg-white drop-shadow-lg  shadow-md rounded-md md:p-1.5 sm:p-[.2rem] justify-center align-middle m-auto  items-center transform active:scale-95 active:shadow-lg transition duration-150">
                      <RiDeleteBin6Line className=" md:text-[1rem] sm:text-[.8rem]" />
                    </div>
                    <div
                      className="LIKE bg-white drop-shadow-lg shadow-md rounded-full md:p-1.5 sm:p-[.2rem] justify-center align-middle  items-center transform active:scale-75 active:shadow-lg transition duration-150"
                      onClick={() => setLiked(!liked)}
                    >
                      <FaHeart
                        className={`md:text-[1rem] sm:text-[.8rem] ${
                          liked ? "text-[#992D2D]" : "text-gray-600"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="PRICE-SECTION bg-[#E3E2E2] h-full md:p-4 flex flex-col justify-center m-auto align-middle items-center">
            <div className="OFFER flex gap-1 justify-center align-bottom sm:items-center md:items-end">
              <strike className="text-[#746E6E]  font-medium sm:text-sm md:text-lg ">
                SR:930/-
              </strike>
              <span className="font-bold   md:text-xl text-[#D00000] ">
                55%
              </span>
            </div>
            <div
              className="font-bold md:text-2xl
           
          "
            >
              SR:450/-
            </div>

            <img
              src={delivery}
              alt=""
              className="md:w-[4rem] md:h-[2.rem] sm:w-[3.5rem] sm:h-[1.8rem]"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
