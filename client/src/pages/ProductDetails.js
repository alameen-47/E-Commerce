import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.js";
import { toast } from "react-hot-toast";
import { t } from "i18next";
import { ImageCarousel } from "../components/Product/ImageCarousel.js";
import { Image, Modal } from "antd";
import { ProductCard1 } from "../components/Product/ProductCard1.jsx";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [units, setUnits] = useState(1);
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  // Initialize the mainImage state to null initially
  const [mainImage, setMainImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relatedImages, setRelatedImages] = useState([]);
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
    getSimilarProduct();
  }, []);
  

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      const updatedImages = data?.product?.image?.map((img) => ({
        ...img,
        filePath: `http://localhost:8085/uploads/${img.filePath}`,
      }));
      setImages(updatedImages);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);

      console.log();
    } catch (error) {
      console.log(error);
    }
  };
  //get related products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="mb-7 flex flex-col gap-5">
        <>
          <div className="CONTENT flex flex-row justify-center align-middle items-center gap-16">
            <div className="LEFT bg-[#D9D9D9] flex flex-col justify-start items-center w-[32rem] h-[35rem] rounded-lg drop-shadow-lg">
              <div className=" w-full h-[23rem] flex flex-col rounded-lg">
                <div className="m-4 flex flex-col justify-between gap-3">
                  {/* First image (main image) */}
                  <Image
                    preview={{ mask: null }}
                    src={mainImage}
                    alt="product"
                    className="bg-white w-auto max-h-[24rem]  object-center rounded-lg object-contain p-2 min-h-[24rem]"
                  />

                  {/* Display next two images, and an overlay for the remaining images */}
                  <div className="flex flex-row justify-between gap-2 rounded-lg">
                    {images.slice(0, 2).map((image, index) => (
                      <img
                        key={index}
                        src={`data:${image.contentType};base64,${image.data}`}
                        alt={`product-${index}`}
                        className="w-[9rem] h-[8rem] bg-white rounded-lg cursor-pointer object-contain p-1"
                        onClick={() =>
                          setMainImage(
                            `data:${image.contentType};base64,${image.data}`
                          )
                        }
                      />
                    ))}

                    {/* If there are more than 2 remaining images, show "View All" overlay */}
                    {images.length > 1 && (
                      <div className="relative w-[9rem] h-[8rem] bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
                        <img
                          alt=""
                          src={`data:${images[2]?.contentType};base64,${images[2]?.data}`}
                          className="absolute w-[9rem] inset-0   h-[8rem] bg-white rounded-lg cursor-pointer object-contain p-1"
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
                            <span className="mb-0 font-semibold">Colors :</span>
                            <div className="flex flex-row gap-3">
                              {Object.entries(colorPalette).map(
                                ([color, hexValue]) => (
                                  <button
                                    key={color}
                                    src={""}
                                    alt=""
                                    className="drop-shadow-lg w-[2rem] h-[2rem] rounded-lg"
                                    style={{ backgroundColor: hexValue }} // Use inline style to apply the background color
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </Modal>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="RIGHT  w-[32rem] h-[38rem]">
              <div className="flex flex-col justify-between gap-3 p-4">
                <h1 className="text-3xl font-extrabold w-full mb-0">
                  {product?.name}
                </h1>
                <span className="text-[#A9A9A9] font-bold">
                  {product?.description} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Enim reprehenderit deleniti harum quo
                  deserunt tempore a laboriosam neque nemo illum, optio qui
                </span>
                <div className=" PRICE OFFER flex justify-start items-center align-middle gap-4">
                  <strike className="font-bold text-xl text-[#808080]">
                    SR:
                    {Math.floor(product.price * (1 + product.offer / 100)) ||
                      ""}
                    /-
                  </strike>
                  <span className="text-4xl  font-bold text-[#FF0000]">
                    {product.offer}%
                  </span>
                </div>
                <span className="text-3xl font-bold">
                  SAR: {product.price}/-
                </span>
                <div className="flex flex-row gap-3">
                  {Object.entries(colorPalette).map(([color, hexValue]) => (
                    <button
                      key={color}
                      src={""}
                      alt=""
                      className="drop-shadow-lg w-[2rem] h-[2rem] rounded-lg"
                      style={{ backgroundColor: hexValue }} // Use inline style to apply the background color
                    />
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the parent onClick from firing

                    addToCart([{ ...product, units }]);
                  }}
                  className="bg-black text-white p-2 font-bold text-xl rounded-lg w-2/4"
                >
                  Add to Cart
                </button>
                {product?.categoryDetails &&
                  typeof product.categoryDetails === "object" &&
                  Object.entries(product.categoryDetails).map(
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
        <div className="SIMILAR PRODUCTS bg-white flex flex-col justify-center text-center items-center align-middle ">
          <div className="p-5  flex flex-col   justify-center bg-green-   items-center align-middle rounded-lg  shadow-lg drop-shadow-xl">
            <h1 className="text-left self-start w-full font-semibold text-xl">
              Similar Products You May Also Like
            </h1>
            {relatedProducts.length < 1 && <p>No Related Products Found</p>}
            <div className="grid lg:grid-cols-5 w-full gap-3 sm:grid-cols-2  ">
              {relatedProducts?.map((p) => (
                <div className="flex-col">
                  <ProductCard1 products={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="BOUGHT TOGETHER PRODUCTS bg-white flex flex-col justify-center text-center items-center align-middle ">
          <div className="p-5  flex flex-col   justify-center bg-green-   items-center align-middle rounded-lg  shadow-lg drop-shadow-xl">
            <h1 className="text-left self-start w-full font-semibold text-xl">
              Similar Products that you may like
            </h1>
            {relatedProducts.length < 1 && <p>No Related Products Found</p>}
            <div className="grid lg:grid-cols-5 w-full gap-3 sm:grid-cols-2  ">
              {relatedProducts?.map((p) => (
                <div className="flex-col">
                  <ProductCard1 products={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
