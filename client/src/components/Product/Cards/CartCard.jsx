import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import delivery from "../../../assets/icons/Delivery Scooter.png";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ImageCarousel } from "../ImageCarousel";
import { ColorPicker } from "antd";
import { Skeleton } from "antd";

const translateText = async (text, targetLanguage) => {
  const { data } = await axios.post("/api/v1/translate", {
    text,
    targetLanguage,
  });
  return data.translatedText;
};

export const CartCard = ({
  isChecked,
  onCheck,
  product,
  onDelete,
  handleQuantityChange,
  onToggle,
}) => {
  const [sizes, setSizes] = useState(null);
  // const [isChecked, setIsChecked] = useState(false);
  const [liked, setLiked] = useState(false);
  const { i18n } = useTranslation();
  const [translatedProduct, setTranslatedProduct] = useState(product);

  console.log(product, " ^^^^^^ PRDUCT INSIDE CARD");

  // Function to translate all string fields and update image paths
  // const getProduct = async (products) => {
  //   if (!products) {
  //     console.error("Products object is undefined or null");
  //     return;
  //   }
  //   const updatedProduct = { ...products };
  //   const fieldsToTranslate = ["name", "description"];
  //   const fieldValues = [];

  //   // Collect the values of fields to translate
  //   for (let key of fieldsToTranslate) {
  //     if (typeof products[key] === "string") {
  //       fieldValues.push(products[key]);
  //     }
  //   }

  //   // Join the collected values into a single string with a unique delimiter (e.g., "||")
  //   const combinedValues = fieldValues.join("||");

  //   // Send the combined string for translation
  //   const translatedCombined = await translateText(
  //     combinedValues,
  //     i18n.language
  //   );
  //   // Split the translated response back into individual translated values
  //   const translatedArray = translatedCombined.split("||");
  //   // Map the translated values back to their respective fields
  //   fieldsToTranslate.forEach((key, index) => {
  //     if (translatedArray[index]) {
  //       updatedProduct[key] = translatedArray[index].trim();
  //     }
  //   });

  //   return setTranslatedProduct(updatedProduct);
  // };
  // const fetchImage = (products) => {
  //   if (!Array.isArray(products)) {
  //     console.error("Invalid products array");
  //     return;
  //   }
  //   const image = products.map((product) => product.images).filter(Boolean);

  //   const newImages = products.flatMap((product) => {
  //     // Ensure product.images is available and is an array
  //     if (product.images && Array.isArray(product.images)) {
  //       return product.images.flatMap((imageObj) =>
  //         Array.isArray(imageObj?.imageSet)
  //           ? imageObj.imageSet.map((img) => ({
  //               ...img,
  //               src: img.data
  //                 ? `data:${img.contentType};base64,${img.data}`
  //                 : null, // Create base64 image source
  //             }))
  //           : []
  //       );
  //     }
  //     return [];
  //   });

  //   console.log(newImages, "NEW IMAGES");
  //   setUpdatedImages(newImages);
  // };

  // useEffect(() => {
  //   if (products && Array.isArray(products)) {
  //     fetchImage(products);
  //   }
  //   getProduct(products);
  // }, [products]);
  // console.log(translatedProduct, "TRANSLATED PRODUCT VALUES");

  return (
    <div>
      <div className="PRODUCT-CARD-CONTAINER  bg-[#E3E2E2]  w-[100%] md:h-[20%] sm:h-[9rem] rounded-lg flex flex-row  justify-between sm:px-1 my-2">
        <div className="CARD-CONTENT rounded-lg bg-[#E3E2E2] w-auto p-2 flex flex-row  gap-2">
          {/* <Checkbox className="border border-gray-300 p-2 rounded" /> */}
          <div className="absolute">
            <label className=" relative flex ">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={onToggle}
                className=" appearance-none h-5 w-5 bg-[white] rounded-tl-md rounded-br-md border border-[#808080] checked:bg-white"
              />
              {isChecked && (
                <span className="absolute inset-0 flex top-1 justify-center text-black text-xs ">
                  <FaCheck />
                </span>
              )}
            </label>
          </div>

          <div className=" flex flex-col gap-1">
            <div>
              {!product?.images || product.images.length === 0 ? (
                <div className="IMAGE skeleton md:px-2 object-contain transition-transform flex justify-center align-middle items-center duration-300 ease-in-out md:w-[17rem] md:h-[12rem]  sm:h-[5rem] sm:w-[6rem] bg-black/10"></div>
              ) : (
                product.images
                  ?.flatMap((imageObj) =>
                    imageObj.imageSet.map((img) => ({
                      ...img,
                      src: img.data
                        ? `data:${img.contentType};base64,${img.data}`
                        : null, // Create base64 image source
                    }))
                  )
                  .filter((image) => image.src) // Keep only images with a valid `src`
                  .slice(0, 1) // Take the first valid image
                  .map((image, index) => (
                    <div key={index} className="rounded-lg p-3 bg-white">
                      <img
                        src={image.src}
                        className="md:px-2 object-contain transition-transform flex justify-center align-middle items-center duration-300 ease-in-out md:w-[15rem] md:h-[10rem]  sm:h-[5rem] sm:w-[6rem]"
                        loading="lazy"
                        alt="Product"
                      />
                    </div>
                  ))
              )}
            </div>

            <div className=" QUANTITY FOR SMALL SCREEN md:hidden  bg-[#E3E2E2] md:h-[30%]  sm:flex md:flex-row sm:flex-col sm:items-center sm:align-middle md:gap-5 ">
              <div className=" bg-[#E3E2E2] justify-center align-middle items-center  left-0 flex md:gap-4 sm:gap-1 sm:h-[1.2rem]">
                <div className="QUANTITY  bg-white h-full md:w-[62%] sm:w-[90%] rounded-badge  flex flex-row justify-center items-center align-middle md:gap-3 md:px-1.5 ">
                  {product._id && (
                    <FaMinus
                      className="md:text-[1.5rem] sm:text-[.8rem] transform active:scale-95 active:shadow-lg transition duration-150"
                      onClick={() => handleQuantityChange(product._id, -1)}
                    />
                  )}
                  <input
                    defaultValue={1}
                    value={product.units}
                    className="w-[50%] text-center sm:h-[100%] "

                    // Optional: keep value in sync if user types
                  />
                  <FaPlus
                    className="md:text-[1.5rem] sm:text-[.8rem] transform active:scale-95 active:shadow-lg transition duration-150 "
                    onClick={() => handleQuantityChange(product._id, +1)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="DETAILS bg-[#E3E2E2] w-full h-auto sm:w-[100%]  md:w-[70%] md:h-[70%] lg:w-[40%] lg:h-[80%] flex flex-col  justify-between items-stretch sm:gap-2 md:gap-1.5 sm:gap- ">
            <span className="NAME font-bold md:text-xl sm:text-xs">
              {product.name}
            </span>
            <span className="DESCRIPTION md:flex sm:h-[2rem]  text-[#746E6E] font-medium md:text-md sm:text-xs ">
              {product?.description &&
              product.description.length > (window.innerWidth < 768 ? 50 : 100)
                ? product.description.slice(
                    0,
                    window.innerWidth < 768 ? 50 : 100
                  ) + "..."
                : product.description}
            </span>
            <span>{}</span>
            <div className=" SUB-DETAILS bg-[#E3E2E2] md:h-[30%] sm:-[20%] md:flex-row sm:flex-col md:items-center md:align-middle md:gap-5  flex justify-between">
              <div className="flex md:gap-3 md:flex-row sm:flex-col bg-[#E3E2E2]">
                {product.color && (
                  <span className="COLOR  text-[#746E6E] sm:text-[10px] leading-0 md:text-[14px]  font-medium ">
                    Color:
                    <span className="font-semibold ml-1 text-black">
                      <ColorPicker defaultValue={product.color} disabled />
                    </span>
                  </span>
                )}
              </div>
              <div className="bg-[#E3E2E2]   left-0 flex md:gap-4 sm:gap-1 sm:left-0">
                <div className=" LIKE AND DELETE FOR SMALL SCREEN sm:hidden md:flex  bg-white h-full md:w-[52%] sm:w-[70%] rounded-badge  flex flex-row justify-center items-center align-middle md:gap-3 md:px-1.5 sm:px-1.5 border-2 border-black/25">
                  {product._id && (
                    <FaMinus
                      className="md:text-[1.5rem] sm:text-[.8rem] transform active:scale-95 active:shadow-lg transition duration-150"
                      onClick={() => handleQuantityChange(product._id, -1)}
                    />
                  )}
                  <input
                    defaultValue={1}
                    value={product.units}
                    className="w-[50%] text-center h-[1.8rem]"
                  />
                  <FaPlus
                    className="md:text-[1.5rem] transform active:scale-95 active:shadow-lg transition duration-150 "
                    onClick={() => handleQuantityChange(product._id, +1)}
                  />
                </div>
                <div className="flex md:mt-0 sm:mt-2 sm:gap-2 ">
                  <div
                    className="DELETE bg-white drop-shadow-lg  shadow-md rounded-md md:p-1.5 sm:p-[.2rem] justify-center align-middle m-auto  items-center transform active:scale-95 active:shadow-lg transition duration-150 "
                    onClick={() => onDelete(product._id)}
                  >
                    <RiDeleteBin6Line className=" md:text-[1rem] sm:text-[.8rem]" />
                  </div>
                  <div
                    className="LIKE bg-white drop-shadow-lg shadow-md rounded-full md:p-1.5 sm:p-[.2rem] justify-center align-middle  items-center transform active:scale-75 active:shadow-lg transition duration-150"
                    onClick={() => setLiked(!liked)}
                  >
                    <FaHeart
                      className={`md:text-[1rem] sm:text-[.8rem] bottom-0 ${
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
              SR:
              {Math.round(
                product.price + (product.price * product.offer) / 100
              )}
              /-
            </strike>
            <span className="font-bold   md:text-xl text-[#D00000] ">55%</span>
          </div>
          <div
            className="font-bold md:text-2xl
          "
          >
            SR: {product.price * product.units}/-
          </div>

          <img
            src={delivery}
            alt=""
            className="md:w-[4rem] md:h-[2.rem] sm:w-[3.5rem] sm:h-[1.8rem]"
          />
        </div>
      </div>
    </div>
  );
};
