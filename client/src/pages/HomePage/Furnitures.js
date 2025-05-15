import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/cart.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";

import banner from "../../assets/Ideas for Every Taste in an Earthy Modern Living Room.jpeg";
import toast from "react-hot-toast";
import { Skeleton } from "@mui/material";
import i18n from "../../i18n/index.js";
import { ProductCard1 } from "../../components/Product/ProductCard1.jsx";

const Furnitures = () => {
  const [cart, setCart] = useCart([]);
  const [units, setUnits] = useState(1);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  //translation
  const translateText = async (text, targetLanguage) => {
    const { data } = await axios.post("/api/v1/translate", {
      text,
      targetLanguage,
    });
    return data.translatedText;
  };

  // Get all products from the server
  const getFurnitures = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/furnitures");
      if (data.products.length > 0) {
        const translatedProducts = await Promise.all(
          data.products.map(async (product) => {
            const translatedName = await translateText(
              product.name,
              i18n.language
            );
            const translatedDescription = await translateText(
              product.description,
              i18n.language
            );

            const updatedImages = product?.image.map((img) => ({
              ...img,
              filePath: `http://localhost:8085/uploads/${img.filePath}`,
            }));

            return {
              ...product,
              name: translatedName,
              description: translatedDescription,
              image: updatedImages,
            };
          })
        );
        setProducts((prevProducts) => [...prevProducts, ...translatedProducts]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("CART")) || [];
    const updatedCart = [...existingCart, ...item];
    setCart(updatedCart);
    localStorage.setItem("CART", JSON.stringify(updatedCart));
    toast.success("Item Added to cart");
  };
  useEffect(() => {
    getFurnitures();
  }, []);

  return (
    <div>
      <div className="lg:xl:px-32 w-full  flex xl:lg:md:flex-row justify-center items-center  h-95 gap-14 sm:flex-col overflow-hidden md:px-0">
        <div className="bg-no-repeat shadow-xl overflow-clip col-span-4 sm:col-start-2 sm:row-start-2 md:col-start 6 lg:col-start-9 xl:col-start-8 w-2/3 md:sm:w-4/5 h-auto sm:w-[20.4375rem] ">
          <img
            className="lg:xl:w-screen sm:w-[20.4375rem] md:w-[62.5rem] object-cover sm:h-96 bg-slate-400 "
            src={banner}
            alt="furnitures"
          />
        </div>
        <div className="h-96  col-span-7 row-start-1 sm:col-start-5 sm:row-start-1 sm:col-span 7 md:col-start-5 md:row-start-1 md:col-span-6 lg:col-start-3 lg:row-start-1 sm:w-4/5">
          <h2 className=" lg:text-sm font-bold text-gray-800 mb-5 flex gap-2 items-center text-sm ">
            <div className="bg-black  h-[0.1rem] sm:w-12 xl:lg:w-20"></div>
            {t("home.FURNITURES")}
          </h2>
          <h1 className="lg:text-3xl font-semibold leading-tight tracking-tight md:w-[37.25rem] dark:text-black sm:text-xl text-pretty">
            {t(
              "home.The Right Furniture can make any space feel like a vacation"
            )}
          </h1>
          <p className="text-xs text-gray-700 dark:text-gray-400 my-5 w-96 text-pretty sm:w-4/5">
            {t(
              "home.We offer a wide range of furniture for your home, from sofas and chairs to dining tables and desks. Our furniture is made with the highest quality materials and designed by experienced craftsmen who are passionate about creating pieces that will last for years to come. Whether you're looking for something classic or trendy and modern, we have everything you need to create the perfect living room, bedroom, office or outdoor space. Browse our collection below to find the perfect piece for your home today!"
            )}
          </p>
          <Link to={"/category/furnitures"}>
            <button className="bg-black hover:bg-gray-800 focus:ring ring-black rounded-sm shadow-sm  lg:p-3 text-white sm:p-[.27rem] lg:text-sm sm:text-xs">
              {t("home.Shop Furniture's")}
            </button>
          </Link>
        </div>
      </div>
      <div>
        <div className="mx-3 mt-5 justify-center align-middle grid gap-3 lg:grid-cols-7 md:grid-cols-4 sm:grid-cols-2 sm:mx-8">
          {products?.map((p) => (
            <div
              className=" flex lg:flex-col sm:flex-row 
                lg:aspect-[2/3] "
              key={p._id}
            >
              <ProductCard1 products={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Furnitures;
