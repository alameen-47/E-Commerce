import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.js";
import { toast } from "react-hot-toast";
import { t } from "i18next";
import { Image, Modal, Collapse, InputNumber, Form, Select } from "antd";
import badgeImage from "../assets/icons/BADGE 1.png";
import { useSearch } from "../context/search.js";
import { useTranslation } from "react-i18next";
import { ProductHistory } from "../components/ProductHistory.jsx";
import { ProductCarousel } from "../components/Product/ProductCarousel.jsx";

// Translation function
const translateText = async (text, targetLanguage) => {
  const { data } = await axios.post("/api/v1/translate", {
    text,
    targetLanguage,
  });
  return data.translatedText;
};

const ProductDetails = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [values, setValues] = useSearch([]);
  const params = useParams();
  const [cart, setCart] = useCart();
  const [units, setUnits] = useState(1);
  const [products, setProducts] = useState([]);
  const [sameCategoryProducts, setSameCategoryProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [keyWord, setKeyWord] = useState();
  const navigate = useNavigate();
  // Initialize the mainImage state to null initially
  const [mainImage, setMainImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [slug, setSlug] = useState();
  const initialColor = images.length > 0 ? images[0].color : "";
  const [selectedColor, setSelectedColor] = useState(initialColor); // Tracks selected color
  const [colorsArray, setColorsArray] = useState(images[0]?.color || "");
  const [filteredImages, setFilteredImages] = useState([]);
  const { i18n } = useTranslation();
  const [translatedProduct, setTranslatedProduct] = useState(products);
  const [sizes, setSizes] = useState();

  const translateProductFields = async (product) => {
    const translatedProduct = { ...product };
    // Loop through each key in the product
    const fieldsToTranslate = ["name", "description"]; // Add the specific keys you want
    const fieldValues = [];

    // Collect the values of fields to translate
    for (let key of fieldsToTranslate) {
      if (typeof product[key] === "string") {
        fieldValues.push(product[key]);
      }
    }

    // Join the collected values into a single string with a unique delimiter (e.g., "||")
    const combinedValues = fieldValues.join("#DELIM#");

    // Send the combined string for translation
    const translatedCombined = await translateText(
      combinedValues,
      i18n.language
    );
    // Split the translated response back into individual translated values
    const translatedArray = translatedCombined.split("#DELIM#");
    // Map the translated values back to their respective fields
    fieldsToTranslate.forEach((key, index) => {
      if (translatedArray[index]) {
        translatedProduct[key] = translatedArray[index].trim();
      }
    });
    for (let key in product) {
      // If the key is 'categoryDetails' (an object), translate both keys and values
      if (key === "categoryDetails" && typeof product[key] === "object") {
        const translatedCategoryDetails = {};
        const translations = [];

        // Check if the key is 'size' to extract sizes as an array
        if (product[key].hasOwnProperty("size")) {
          let sizeArray = product[key]["size"].split(","); // Assuming sizes are comma-separated
          console.log(sizeArray, "SIZES ARRAY");
          // Convert sizes into the desired options format for Ant Design
          const sizeOptions = sizeArray.map((size, index) => ({
            value: size.trim(), // Use size as the value
            // label: `${size.trim()} (${index})`, // Label can include the size and a dynamic number
          }));
          setSizes(sizeOptions);
          console.log(sizes, "SIZE OPTIONS");
        }

        // Prepare combined strings for keys and values
        for (let [categoryKey, categoryValue] of Object.entries(product[key])) {
          // Exclude the 'size' key from being pushed for translation
          if (categoryKey !== "size") {
            translations.push(`${categoryKey}: ${categoryValue}`);
          }
        }
        // Send a single request to translate all key-value pairs at once
        const translatedPairs = await translateText(
          translations.join("; "),
          i18n.language
        );

        // Split the response back into keys and values
        const translatedArray = translatedPairs.split(/;\s*|؛\s*/);

        // Populate translatedCategoryDetails with translated key-value pairs
        for (let i = 0; i < translatedArray.length; i++) {
          const [translatedKey, translatedValue] = translatedArray[i]
            .split(": ")
            .map((part) => part.trim());
          // Populate translatedCategoryDetails without the 'size' key
          if (translatedKey !== "size") {
            translatedCategoryDetails[translatedKey] = translatedValue;
          }
        }
        translatedProduct[key] = translatedCategoryDetails;
      }
    }

    return translatedProduct;
  };

  const handleColorClick = (color) => {
    setSelectedColor(color); // Update the selected color
  };
  useEffect(() => {
    if (selectedColor) {
      // Filter images based on the selected color
      const filtered = images.filter((img) => img.color === selectedColor);
      setFilteredImages(filtered);
    } else {
      // If no color is selected, display all images
      setFilteredImages(images);
    }
  }, [selectedColor, images]); // Re-run when selectedColor or images change

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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Re-run the effect when 'images' change
  const addToCart = (item) => {
    const updatedCart = [...cart, ...item];
    setCart(updatedCart);
    localStorage.setItem("CART", JSON.stringify(updatedCart));
    toast.success("Item Added to cart");
  };

  useEffect(() => {
    getSameCategory();
    getSimilarProducts();
  }, [params?.slug, params?._id]);

  //getProduct
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/product/get-product/${params.slug}/${params.pid}`
        );
        console.log(data, "+++++++++++++DATA OF SINGLE PRODUCTS++++++++++++++");

        if (Array.isArray(data?.product?.images)) {
          const newImages = data?.product?.images?.flatMap((imageObj) =>
            imageObj?.imageSet?.map((img) => {
              const transformedImage = {
                ...img,
                color: imageObj.colors, // Assuming each imageObj has a color field
                filePath: `http://localhost:8085/uploads/${img.filePath}`,
              };
              // Log each transformed image object with the color
              // console.log(transformedImage, "TRANSFORMED IMAGE");

              return transformedImage;
            })
          );

          // Extract unique colors
          const uniqueColors = Array.from(
            new Set(newImages.map((img) => img.color))
          );
          console.log(uniqueColors, "UNIQUE COLORS");

          // Set the colors state
          setColorsArray(uniqueColors);

          // If `selectedColor` is not yet set, initialize it with the first unique color
          if (!selectedColor && uniqueColors.length > 0) {
            setSelectedColor(uniqueColors[0]); // Set the initial selected color
          }

          // Filter or sort images by the selected color
          const filteredImages = selectedColor
            ? newImages.filter((img) => img.color === selectedColor) // Filter by selected color
            : newImages; // Show all images if no color is selected
          setImages(filteredImages);
        }
        setProducts(data?.product);

        let searchHistoryProducts =
          JSON.parse(localStorage.getItem("searchHistoryProducts")) || [];
        // Check if the product with the same _id already exists
        const productExists = searchHistoryProducts.some(
          (item) => item._id === data?.product?._id
        );
        // Add the current product to the search history if it's not already there
        if (!productExists) {
          searchHistoryProducts.push(data?.product);
        }

        // Store the updated search history in localStorage
        localStorage.setItem(
          "searchHistoryProducts",
          JSON.stringify(searchHistoryProducts)
        );

        getSameCategory(data?.product._id, data?.product.category._id);
        getSimilarProducts(data?.product?.name, data?.product.category._id);
        setSlug(params.slug);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [params.slug, params.pid]);

  //getSameCategory products
  const getSameCategory = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setSameCategoryProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(getSameCategory, "SAME CATEGORY PRODUCTS");
  //getSameCategory products
  const getSimilarProducts = async (pname, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/similar-product/${pname}/${cid}`
      );
      setSimilarProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(similarProducts, " SIMILAR PRODUCTS");

  // Use useEffect to set the main image once images are available
  useEffect(() => {
    if (filteredImages && filteredImages.length > 0) {
      // Set the first image as the main image
      setMainImage(
        `data:${filteredImages[0].contentType};base64,${filteredImages[0].data}`
      );
    }
  }, [images, filteredImages, selectedColor]);
  // console.log(
  //   translatedProduct?.categoryDetails,
  //   "TRANSLATED CATEGORY DETAILS}}}}}}}}}}}}}}}}}}"
  // );
  return (
    <Layout>
      <div className="md:m-4 sm:mb-3 flex flex-col gap-7">
        <>
          <div className="CONTENT flex md:flex-row sm:flex-col  justify-center align-middle items-center md:gap-16 ">
            <div className="LEFT md:bg-[#D9D9D9] sm:bg-white flex flex-col justify-start md:items-center md:w-[32rem] sm:w-screen md:h-[ sm:h-auto md:rounded-lg rounded-b-lg rounded-t-none drop-shadow-lg md:p-3 sm:mx-3">
              <span className="ml-6  top-1 text-2xl sm:text-2xl md:text-4xl font-extrabold  mb-0 xs:visible  md:hidden">
                {translatedProduct?.name}

                {/* Conditionally render the tags based on respective flags */}
                <span className="flex  flex-row gap-2">
                  {translatedProduct?.newArrivals && (
                    <span className="top-2 left-2 max-w-max text-white bg-gray-900 px-3 py-1 rounded-md text-xs font-bold shadow-lg uppercase tracking-wide flex items-center drop-shadow-xl my-1">
                      🌟 New Arrivals
                    </span>
                  )}
                  {translatedProduct?.seasonalSales !== "None" && (
                    <span className="top-2 left-2 max-w-max text-white bg-gray-900 px-3 py-1 rounded-md text-xs font-bold shadow-lg uppercase tracking-wide flex items-center drop-shadow-xl mb-1">
                      🎉 {translatedProduct?.seasonalSales} Sale
                    </span>
                  )}
                  {translatedProduct?.bestSellers && (
                    <span className="top-2 left-2 max-w-max text-white bg-gray-900 px-3 py-1 rounded-md text-xs font-bold shadow-lg uppercase tracking-wide flex items-center drop-shadow-xl mb-1">
                      ⭐ Best Seller
                    </span>
                  )}
                  {translatedProduct?.limitedTimeDeals && (
                    <span className="top-2 left-2 max-w-max text-white bg-gray-900 px-3 py-1 rounded-md text-xs font-bold shadow-lg uppercase tracking-wide flex items-center drop-shadow-xl mb-1">
                      ⏳ Limited Time Deal!!
                    </span>
                  )}
                  {translatedProduct?.stockClearance && (
                    <span className="top-2 left-2 max-w-max text-white bg-gray-900 px-3 py-1 rounded-md text-xs font-bold shadow-lg uppercase tracking-wide flex items-center drop-shadow-xl mb-1">
                      🔥 Stock Clearance!
                    </span>
                  )}
                </span>
              </span>
              <div className="w-full md:h- h-auto hidden md:flex flex-col rounded-b-lg rounded-t-none">
                <div className="m-4 flex flex-col justify-between gap-3">
                  {/* First image (main image) */}

                  <>
                    {!mainImage && !images.length < 0 ? (
                      <div className="skeleton h-[20rem] max-h-[22rem] max-w-[35rem]"></div>
                    ) : (
                      <Image
                        preview={{
                          mask: null, // Disable overlay mask
                        }}
                        src={mainImage}
                        alt="product"
                        className="bg-white w-full max-h-[24rem] md:max-h-[24rem] sm:max-h-[12rem] min-h-[8rem] object-center rounded-lg object-contain p-2 flex align-middle items-center justify-center"
                      />
                    )}
                  </>

                  {/* Display next two images, and an overlay for the remaining images */}
                  <div className="flex flex-row justify-between gap-2 rounded-lg">
                    {!filteredImages ? (
                      <div className="skeleton w-[6rem] h-[5rem] sm:w-[7rem] sm:h-[6rem] md:w-[9rem] md:h-[8rem]"></div>
                    ) : (
                      filteredImages?.length > 1 &&
                      filteredImages
                        .slice(1, 3)
                        .map((image, index) => (
                          <img
                            key={index}
                            src={`data:${image.contentType};base64,${image.data}`}
                            alt={`product-${index}`}
                            className="w-[6rem] h-[5rem] sm:w-[7rem] sm:h-[6rem] md:w-[9rem] md:h-[8rem] bg-white rounded-lg cursor-pointer object-contain p-1"
                            onClick={() =>
                              setMainImage(
                                `data:${image.contentType};base64,${image.data}`
                              )
                            }
                          />
                        ))
                    )}

                    {/* If there are more than 2 remaining images, show "View All" overlay */}
                    {!filteredImages ? (
                      <div className="skeleton w-[6rem] h-[5rem] sm:w-[7rem] sm:h-[6rem] md:w-[9rem] md:h-[8rem]"></div>
                    ) : (
                      filteredImages?.length > 2 && (
                        <div className="relative w-[6rem] h-[5rem] sm:w-[7rem] sm:h-[6rem] md:w-[9rem] md:h-[8rem] bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
                          <img
                            alt=""
                            src={`data:${images[2]?.contentType};base64,${images[3]?.data}`}
                            className="absolute w-[6rem] h-[5rem] sm:w-[7rem] sm:h-[6rem] md:w-[9rem] md:h-[8rem] bg-white rounded-lg cursor-pointer object-contain p-1"
                          />
                          <span
                            onClick={showModal}
                            className="absolute z-10 text-white text-lg bg-black bg-opacity-40 w-full h-full flex justify-center items-center rounded-lg font-semibold"
                          >
                            {t("productDetails.View All")}
                          </span>
                          <Modal
                            className="flex flex-col"
                            title={t("productDetails.All Images")}
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null} // Remove default OK and Cancel buttons
                          >
                            <div className="flex flex-col justify-center gap-1">
                              <div className="flex flex-row items-center align-middle justify-center rounded-lg">
                                {filteredImages?.map((image, index) => (
                                  <div className="flex flex- w-[15rem] h-[15rem]">
                                    <Image
                                      preview={{ mask: null }}
                                      key={index}
                                      src={`data:${image.contentType};base64,${image.data}`}
                                      alt={`product-${index}`}
                                      className=" rounded-lg cursor-pointer  p-1 flex justify-center items-center align-middle max-h-[10rem] h-[9rem]"
                                      onClick={
                                        () =>
                                          setMainImage(
                                            `data:${image.contentType};base64,${image.data}`
                                          ) // Update the main image on click
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                              <span className="mb-0 font-semibold">
                                {t("productDetails.Colors")} :
                              </span>
                              {colorsArray.length > 1 && (
                                <div className="flex flex-row gap-3">
                                  {/* Render Color Options */}
                                  {Array.from(colorsArray)?.map((color) => (
                                    <button
                                      onClick={() => handleColorClick(color)}
                                      key={color}
                                      src={""}
                                      alt=""
                                      className={`drop-shadow-md w-[1.5rem] h-[1.5rem] sm:w-[2rem] sm:h-[2rem] md:w-[2rem] md:h-[2rem] rounded-lg cursor-pointer
                            ${
                              selectedColor === color
                                ? "ring-1 ring-offset-1 ring-gray-500 drop-shadow-xl"
                                : ""
                            }`} // Add an outline for the selected color
                                      style={{ backgroundColor: color }} // Use inline style to apply the background color
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </Modal>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="IMAGE CAROUSEL FOR SMALL SCREEN bg-white !important text-white carousel  md:hidden  sm:max-h-[20rem]  group m-auto   ">
                {filteredImages.length &&
                  filteredImages.map((image, index) => (
                    <div
                      key={index}
                      className={` carousel-item  relative   h-[20rem] ${
                        index === currentSlide ? "flex !important" : "hidden"
                      } object-contain`}
                      style={{ height: "20rem" }} // Explicit height for the container
                    >
                      <Image
                        preview={{
                          mask: null, // Disable overlay mask
                        }}
                        src={`data:${image.contentType};base64,${image.data}`}
                        className="w-fit h-full inline-block object-cover p-12 " // Ensure image scales without overflowing
                        alt=""
                      />
                    </div>
                  ))}
                {/* Navigation buttons */}
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between   transition-opacity duration-300 bg-opacity-50">
                  <button
                    onClick={() =>
                      setCurrentSlide(
                        currentSlide === 0
                          ? filteredImages.length - 1
                          : currentSlide - 1
                      )
                    }
                    className="btn btn-xs rounded-full drop-shadow-xl shadow-2xl"
                    style={{ opacity: currentSlide === 0 ? 0 : 1 }}
                  >
                    ❮
                  </button>
                  {filteredImages.length > 1 && (
                    <button
                      onClick={() => {
                        setCurrentSlide(
                          currentSlide === filteredImages.length - 1
                            ? 0
                            : currentSlide + 1
                        );
                      }}
                      className="btn btn-xs rounded-full drop-shadow-xl   shadow-2xl"
                    >
                      ❯
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="RIGHT w-[20rem] h-auto sm:w-[25rem] sm:h-auto md:w-[32rem] md:h-auto">
              {!translatedProduct?.name ? (
                <>
                  {/* {SKeleton} */}
                  <div className="flex flex-col justify-between gap-3 p-4 sm:gap-2 md:gap-7">
                    <div className="skeleton sm:h-5 md:h-10 w-full sm:w-[50%] md:w-[40%]"></div>
                    <div className="skeleton sm:h-5 md:h-10 w-full"></div>
                    <div className="skeleton sm:h-5 md:h-10 w-full"></div>
                    <div className="skeleton sm:h-5 md:h-10 w-full sm:w-[80%] md:w-[70%]"></div>
                    <div className="skeleton sm:h-5 md:h-10 w-full sm:w-[80%] md:w-[70%]"></div>
                    <div className="skeleton sm:h-5 md:h-10 w-full sm:w-[20%] md:w-[30%]"></div>
                    <div className="skeleton sm:h-2 md:h-5 w-full sm:w-[40%] md:w-[50%]"></div>
                    <div className="skeleton sm:h-2 md:h-5 w-full sm:w-[40%] md:w-[50%]"></div>
                    <div className="skeleton sm:h-2 md:h-5 w-full sm:w-[40%] md:w-[50%]"></div>
                    <div className="skeleton sm:h-2 md:h-5 w-full sm:w-[40%] md:w-[50%]"></div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-between gap-3 p-4 sm:gap-2 md:gap-3">
                  <span className="  top-1 text-2xl sm:text-2xl md:text-4xl font-extrabold w-full xs:hidden  md:block sm:hidden">
                    {translatedProduct?.name}
                    <span className="flex  flex-row gap-2">
                      {translatedProduct?.newArrivals && (
                        <span className="top-2 left-2 max-w-max text-white bg-gray-900 px-3 py-1 rounded-md text-xs font-bold shadow-lg uppercase tracking-wide flex items-center drop-shadow-xl my-1">
                          🌟 New Arrivals
                        </span>
                      )}
                      {translatedProduct?.seasonalSales !== "None" && (
                        <span className="top-2 left-2 max-w-max text-white bg-gray-900 px-3 py-1 rounded-md text-xs font-bold shadow-lg uppercase tracking-wide flex items-center drop-shadow-xl my-1">
                          🎉 {translatedProduct?.seasonalSales} Sale
                        </span>
                      )}
                      {translatedProduct?.bestSellers && (
                        <span className="top-2 left-2 max-w-max text-white bg-gray-900 px-3 py-1 rounded-md text-xs font-bold shadow-lg uppercase tracking-wide flex items-center drop-shadow-xl my-1">
                          ⭐ Best Seller
                        </span>
                      )}
                      {translatedProduct?.limitedTimeDeals && (
                        <span className="top-2 left-2 max-w-max text-white bg-gray-900 px-3 py-1 rounded-md text-xs font-bold shadow-lg uppercase tracking-wide flex items-center drop-shadow-xl my-1">
                          ⏳ Limited Time Deal!!
                        </span>
                      )}
                      {translatedProduct?.stockClearance && (
                        <span className="top-2 left-2 max-w-max text-white bg-gray-900 px-3 py-1 rounded-md text-xs font-bold shadow-lg uppercase tracking-wide flex items-center drop-shadow-xl my-1">
                          🔥 Stock Clearance!
                        </span>
                      )}
                    </span>
                  </span>
                  <span className="text-[#A9A9A9] font-bold">
                    {translatedProduct?.description}
                  </span>
                  {colorsArray.length > 1 && (
                    <div className="flex flex-row gap-2 sm:gap-3">
                      {/* Render Color Options */}
                      {Array.from(
                        new Set(colorsArray.map((color) => color))
                      ).map((color) => (
                        <button
                          onClick={() => handleColorClick(color)}
                          key={color}
                          src={""}
                          alt=""
                          className={`drop-shadow-md w-[1.5rem] h-[1.5rem] sm:w-[2rem] sm:h-[2rem] md:w-[2rem] md:h-[2rem] rounded-lg cursor-pointer
                            ${
                              selectedColor === color
                                ? "ring-1 ring-offset-1 ring-gray-500 drop-shadow-xl"
                                : ""
                            }`} // Add an outline for the selected color
                          style={{ backgroundColor: color }} // Use inline style to apply the background color
                        />
                      ))}
                    </div>
                  )}
                  <div className="flex justify-start items-center md:gap-3 sm:gap-2 ">
                    <strike className="font-bold md:text-lg sm:text-md text-[#808080]">
                      {t("productDetails.SR")}:
                      {Math.floor(
                        translatedProduct.price *
                          (1 + translatedProduct.offer / 100)
                      ) || ""}
                      /-
                    </strike>
                    <span className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#088E18]">
                      {translatedProduct.offer}% {t("productDetails.OFF")}
                    </span>
                    {/* Badge */}
                    {translatedProduct?.verified && (
                      <div className="relative max-w-sm sm:max-w-md inline-flex items-center justify-center">
                        <div className="relative w-[4rem] h-[4rem] sm:w-[4rem] sm:h-[4rem] md:w-[6rem] md:h-[6rem] overflow-hidden rounded-full">
                          <img
                            src={badgeImage} // Replace with your badge's source
                            alt="badge"
                            className="relative z-1 w-full h-full object-contain drop-shadow-xl"
                          />
                          <div
                            className="absolute inset-0 bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.6)_50%,transparent_75%,transparent_100%)] bg-[length:200%_200%] bg-no-repeat bg-[position:-100%_0] transition-[background-position_1s_ease] hover:bg-[position:100%_0] hover:duration-[1.5s]"
                            style={{
                              transform: "skewX(-30deg)",
                              animationFillMode: "forwards", // This ensures the effect stays after the hover
                              transition:
                                "background-position 1.5s ease-in-out",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-xs sm:text-xl md:text-4xl font-bold">
                    {t("cart.SAR")}: {translatedProduct.price}
                  </span>
                  <div className="flex flex-col gap-2">
                    <div className=" flex gap-2">
                      <label className="flex gap-2 font-medium ">
                        Quantity:
                        <InputNumber
                          min={1}
                          max={translatedProduct?.quantity}
                          defaultValue={1}
                          className="w-16 border-1 border-solid "
                        />
                      </label>
                      {translatedProduct?.categoryDetails?.size && (
                        <label className="flex gap-2 font-medium ">
                          Size:
                          <Select
                            labelInValue
                            defaultValue={"Select"}
                            className=" border-1 border-solid "
                            style={{ border: "#0000" }}
                            onChange={""}
                            options={sizes}
                          />
                        </label>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the parent onClick from firing

                        addToCart([{ ...products, units }]);
                      }}
                      className="bg-black text-white p-2 font-bold text-lg sm:text-xl rounded-lg w-full sm:w-2/4 md:w-2/4 drop-shadow-xl "
                    >
                      {t("common.ADD TO CART")}
                    </button>
                  </div>

                  {translatedProduct?.categoryDetails && ( // Filter out empty values
                    <>
                      <div className="md:hidden sm:block">
                        <span className="md:font-bold md:text-xl sm:font-semibold sm:text-lg uppercase">
                          Product Details :
                        </span>
                        <div className="md:hidden sm:block">
                          <p className=" font-medium">
                            {Object.entries(translatedProduct.categoryDetails)
                              .filter(([key]) => key !== "size") // Exclude the specified key
                              .filter(([, value]) => value) // Exclude empty values (falsy values)
                              .map(([key, value], index) => (
                                <div
                                  key={index}
                                  className="flex flex-row gap-2 items-center"
                                >
                                  <strong className="uppercase">{key}:</strong>
                                  {value}
                                </div>
                              ))}
                          </p>
                        </div>
                      </div>
                      {/* Collapse to display additional details if there are more than 3 non-empty entries */}
                      <div className="sm:hidden md:block font-bold">
                        <Collapse
                          collapsible="header"
                          defaultActiveKey={["0"]}
                          style={{ border: "none", boxShadow: "none" }} // Remove outer collapse border/frame
                          items={[
                            {
                              key: "1",
                              label: "Product Details",
                              children: (
                                <p className=" font-medium">
                                  {Object.entries(
                                    translatedProduct.categoryDetails
                                  )
                                    .filter(([key]) => key !== "size") // Exclude the specified key
                                    .filter(([, value]) => value) // Exclude empty values (falsy values)
                                    .map(([key, value], index) => (
                                      <div
                                        key={index}
                                        className="flex flex-row gap-2 items-center "
                                      >
                                        <strong className="w-1/4 uppercase text-left">
                                          {key}:
                                        </strong>
                                        {value}
                                      </div>
                                    ))}
                                </p>
                              ),
                            },
                          ]}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
        {similarProducts?.length > 0 ? (
          <div className="SIMILAR_PRODUCTS bg-white flex flex-col justify-center text-center items-center align-middle ">
            <div className="px-5  flex flex-col  bg-white justify-center items-center align-middle rounded-b rounded-t-none ">
              <h1 className="text-left self-start pl-3 font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl sm:mb-0">
                {t("productDetails.Similar Products You May Also Like")}
              </h1>

              <ProductCarousel products={similarProducts} />
            </div>
          </div>
        ) : (
          ""
        )}
        {sameCategoryProducts?.length > 0 ? (
          <div className="SAME_CATEGORY_PRODUCTS SameCategoryProducts bg-white flex flex-col justify-center text-center items-center align-middle ">
            <div className="px-5  flex flex-col  bg-white justify-center items-center align-middle rounded-lg ">
              <h1 className="text-left self-start pl-3 font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl sm:mb-0">
                {t("productDetails.More in This Category")}
              </h1>
              <ProductCarousel products={sameCategoryProducts} />
            </div>
          </div>
        ) : (
          ""
        )}

        <ProductHistory />
      </div>
    </Layout>
  );
};

export default ProductDetails;
