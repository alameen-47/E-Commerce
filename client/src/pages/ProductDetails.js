import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.js";
import { toast } from "react-hot-toast";
import { t } from "i18next";
import { Image, Modal } from "antd";
import { ProductCard1 } from "../components/Product/ProductCard1.jsx";
import badgeImage from "../assets/icons/BADGE 1.png";
import { useSearch } from "../context/search.js";
import { useTranslation } from "react-i18next";
import { ProductHistory } from "../components/ProductHistory.jsx";

// Translation function
const translateText = async (text, targetLanguage) => {
  const { data } = await axios.post("/api/v1/translate", {
    text,
    targetLanguage,
  });
  return data.translatedText;
};

const ProductDetails = () => {
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

  const { i18n } = useTranslation();

  const [translatedProduct, setTranslatedProduct] = useState(products);

  // Function to translate all string fields and update image paths
  const translateProductFields = async (product) => {
    const translatedProduct = { ...product };
    // Loop through each key in the product
    for (let key in product) {
      // Check if the field is a string and translate it
      if (typeof product[key] === "string") {
        translatedProduct[key] = await translateText(
          product[key],
          i18n.language
        );
      }
      // If the key is 'categoryDetails' (an object), translate both keys and values
      if (key === "categoryDetails" && typeof product[key] === "object") {
        const translatedCategoryDetails = {};

        // Translate each category key and value
        for (let [categoryKey, categoryValue] of Object.entries(product[key])) {
          const translatedKey = await translateText(categoryKey, i18n.language);
          const translatedValue =
            typeof categoryValue === "string"
              ? await translateText(categoryValue, i18n.language)
              : categoryValue; // Handle if value is an object or array
          translatedCategoryDetails[translatedKey] = translatedValue;
        }
        translatedProduct[key] = translatedCategoryDetails;
      }
    }

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

  const colorPalette = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF",
    yellow: "#FFFF00",
    purple: "#800080",
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Use useEffect to set the main image once images are available
  useEffect(() => {
    if (images && images.length > 0) {
      // Set the first image as the main image
      setMainImage(`data:${images[0].contentType};base64,${images[0].data}`);
    }
  }, [images]); // Re-run the effect when 'images' change
  const addToCart = (item) => {
    const updatedCart = [...cart, ...item];
    setCart(updatedCart);
    localStorage.setItem("CART", JSON.stringify(updatedCart));
    toast.success("Item Added to cart");
  };

  useEffect(() => {
    getProduct();
    getSameCategory();
    getSimilarProducts();
  }, [params?.slug, params?._id]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}/${params.pid}`
      );
      const updatedImages = data?.product?.image?.map((img) => ({
        ...img,
        filePath: `http://localhost:8085/uploads/${img.filePath}`,
      }));
      setImages(updatedImages);
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

  return (
    <Layout>
      <div className="md:mb-7 flex flex-col gap-5">
        <>
          <div className="CONTENT flex md:flex-row sm:flex-col  justify-center align-middle items-center md:gap-16 ">
            <div className="LEFT bg-[#D9D9D9] flex flex-col justify-start items-center md:w-[32rem] md:h-[38rem]  rounded-lg drop-shadow-lg md:p-3">
              <div className=" w-full md:h-[23rem] flex flex-col rounded-lg">
                <div className="m-4 flex flex-col justify-between gap-3">
                  {/* First image (main image) */}
                  {/* Image */}
                  <Image
                    preview={{ mask: null }}
                    src={mainImage}
                    alt="product"
                    className=" bg-white  max-h-[24rem] object-center rounded-lg object-contain p-2 md:min-h-[24rem]"
                  />

                  {/* Display next two images, and an overlay for the remaining images */}
                  <div className="flex flex-row justify-between gap-2 rounded-lg">
                    {images.slice(0, 2).map((image, index) => (
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
                    ))}

                    {/* If there are more than 2 remaining images, show "View All" overlay */}
                    {images ? (
                      images.length > 1 && (
                        <div className="relative w-[6rem] h-[5rem] sm:w-[7rem] sm:h-[6rem] md:w-[9rem] md:h-[8rem] bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
                          <img
                            alt=""
                            src={`data:${images[2]?.contentType};base64,${images[2]?.data}`}
                            className="absolute w-[6rem] h-[5rem] sm:w-[7rem] sm:h-[6rem] md:w-[9rem] md:h-[8rem] bg-white rounded-lg cursor-pointer object-contain p-1"
                          />
                          <span
                            onClick={showModal}
                            className="absolute z-10 text-white text-lg bg-black bg-opacity-40 w-full h-full flex justify-center items-center rounded-lg font-semibold"
                          >
                            View All
                          </span>
                          <Modal
                            className="flex flex-col"
                            title="All Images :"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null} // Remove default OK and Cancel buttons
                          >
                            <div className="flex flex-col justify-center gap-1">
                              <div className="flex flex-row items-center align-middle justify-center rounded-lg">
                                {images.map((image, index) => (
                                  <div className="flex flex- w-[15rem] h-[10rem]">
                                    <Image
                                      preview={{ mask: null }}
                                      key={index}
                                      src={`data:${image.contentType};base64,${image.data}`}
                                      alt={`product-${index}`}
                                      className=" rounded-lg cursor-pointer object-contain p-1 flex justify-center items-center align-middle max-h-[10rem]"
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
                                Colors :
                              </span>
                              <div className="flex flex-row gap-3">
                                {Object.entries(colorPalette).map(
                                  ([color, hexValue]) => (
                                    <button
                                      key={color}
                                      src={""}
                                      alt=""
                                      className="w-[1rem] h-[1rem] sm:w-[2rem] sm:h-[2rem] md:w-[3rem] md:h-[3rem] drop-shadow-lg rounded-lg"
                                      style={{ backgroundColor: hexValue }} // Use inline style to apply the background color
                                    />
                                  )
                                )}
                              </div>
                            </div>
                          </Modal>
                        </div>
                      )
                    ) : (
                      // Display skeleton when there's no image
                      <div className="relative w-[9rem] h-[8rem] bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
                        <div className="skeleton w-[9rem] h-[8rem] bg-gray-300 rounded-lg" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="RIGHT w-[20rem] h-[25rem] sm:w-[25rem] sm:h-[30rem] md:w-[32rem] md:h-[38rem]">
              <div className="flex flex-col justify-between gap-3 p-4 sm:gap-4 md:gap-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold w-full mb-0">
                  {translatedProduct?.name}
                </h1>
                <span className="text-[#A9A9A9] font-bold">
                  {translatedProduct?.description}
                </span>
                <div className="flex justify-start items-center gap-3 sm:gap-4">
                  <strike className="font-bold text-lg sm:text-xl text-[#808080]">
                    SR:
                    {Math.floor(
                      translatedProduct.price *
                        (1 + translatedProduct.offer / 100)
                    ) || ""}
                    /-
                  </strike>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#088E18]">
                    {translatedProduct.offer}%
                  </span>
                  {/* Badge */}
                  <div className="relative max-w-sm sm:max-w-md inline-flex items-center justify-center">
                    <div className="relative w-[4rem] h-[4rem] sm:w-[5rem] sm:h-[5rem] md:w-[6rem] md:h-[6rem] overflow-hidden rounded-full">
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
                          transition: "background-position 1.5s ease-in-out",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {t("cart.SAR")}: {translatedProduct.price}
                </span>
                <div className="flex flex-row gap-2 sm:gap-3">
                  {Object.entries(colorPalette).map(([color, hexValue]) => (
                    <button
                      key={color}
                      src={""}
                      alt=""
                      className="drop-shadow-lg w-[1.5rem] h-[1.5rem] sm:w-[2rem] sm:h-[2rem] md:w-[2.5rem] md:h-[2.5rem] rounded-lg cursor-pointer"
                      style={{ backgroundColor: hexValue }} // Use inline style to apply the background color
                    />
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the parent onClick from firing

                    addToCart([{ ...products, units }]);
                  }}
                  className="bg-black text-white p-2 font-bold text-lg sm:text-xl rounded-lg w-full sm:w-3/4 md:w-2/4"
                >
                  {t("common.ADD TO CART")}
                </button>
                {translatedProduct?.categoryDetails &&
                  typeof translatedProduct.categoryDetails === "object" &&
                  Object.entries(translatedProduct.categoryDetails).map(
                    ([key, value], index) => (
                      <div
                        key={index}
                        className="flex flex-row gap-2 items-center"
                      >
                        <span className="first-letter:uppercase lowercase font-bold ">
                          {key}:
                        </span>
                        <span className="uppercase  text-[#858383] font-semibold">
                          {/* Handle nested objects by stringifying them or rendering the value */}
                          {typeof value === "object" && value !== null
                            ? JSON.stringify(value) // Convert object to string
                            : value}
                        </span>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </>
        {/* {similarProducts?.length > 0 ? (
          <div className="SIMILAR PRODUCTS bg-white flex flex-col justify-center text-center items-center align-middle ">
            <div className="p-5  flex flex-col   justify-center bg-green-   items-center align-middle rounded-lg  shadow-lg drop-shadow-xl">
              <h1 className="text-left self-start w-full font-semibold text-xl">
                Similar Products You May Also Like
              </h1>

              <div className="grid lg:grid-cols-5 w-full gap-3 sm:grid-cols-2  ">
                {similarProducts &&
                  similarProducts?.map((p) => (
                    <div className="flex-col">
                      <ProductCard1 products={p} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {sameCategoryProducts?.length > 0 ? (
          <div className="BOUGHT TOGETHER PRODUCTS bg-white flex flex-col justify-center text-center items-center align-middle ">
            <div className="p-5  flex flex-col   justify-center bg-green-   items-center align-middle rounded-lg  shadow-lg drop-shadow-xl">
              <h1 className="text-left self-start w-full font-semibold text-xl">
                More in This Category
              </h1>

              <div className="grid lg:grid-cols-5 w-full gap-3 sm:grid-cols-2  ">
                {sameCategoryProducts?.map((p) => (
                  <div className="flex-col">
                    <ProductCard1 products={p} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )} */}
        <ProductHistory />
      </div>
    </Layout>
  );
};

export default ProductDetails;
