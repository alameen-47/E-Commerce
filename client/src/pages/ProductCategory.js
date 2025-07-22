import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import { t } from "i18next";
import { API_BASE_URL } from "../utilities/api";

const ProductCategory = () => {
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart([]);
  const [units, setUnits] = useState(1);

  const [total, setTotal] = useState([0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
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
  return (
    <Layout>
      <div className="left-0 right-0 container mt-3 flex flex-col justify-center items-center align-middle m-auto">
        <h1 className="text-center text-xl text-black font-bold">
          {category?.name}
        </h1>
        <h1 className="flex justify-center align-middle items-center m-auto text-center text-xs text-black">
          {products?.length} Results found
        </h1>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3  ">
          {products?.map((p) => (
            <div
              className=" flex lg:flex-col sm:flex-row 
                lg:aspect-[2/3]   "
              key={p._id}
            >
              <div className="text-wrap  group lg:py-4 lg:px-2  bg-slate-300/10 rounded-lg flex flex-col items-center justify-center  relative after:absolute after:h-full after:bg-[#000000] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all  lg:xl:h-96 sm:h-72 ">
                <img
                  onClick={() => navigate(`/product/${p.slug}`)}
                  src={`/api/v1/product/product-image/${p._id}`}
                  style={{
                    transform:
                      "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
                  }}
                  className="lg:md:w-44 md:w-40 sm:w-44  overflow-hidden object-cover aspect-square text-[#000000] group-hover:bg-gray-200 lg:text-5xl sm:text-2xl rounded-s  transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2  mx-auto h-[60%] "
                  alt=""
                />
                <p className="cardtxt font-semibold text-black tracking-wider group-hover:text-white h-2 md:text-sm lg:text-lg">
                  {(() => {
                    const words = p.name.split(" ");
                    return words.length > 1
                      ? words.slice(0, 2).join(" ")
                      : words[0];
                  })()}
                </p>
                <p className="blueberry font-semibold text-gray-500  group-hover:text-gray-200 mb-0 lg:text-xs md:text-sm sm:text-xs text-center">
                  {(() => {
                    const words = p.description.split(" ");
                    return words.length > 1
                      ? words.slice(0, 4).join(" ")
                      : words[0];
                  })()}
                </p>
                {p.offer ? (
                  <>
                    <div className="flex gap-1 justify-center items-center mt-0 ">
                      <strike className="ordernow-text text-[#616161] font-semibold  group-hover:text-white text-center items-center lg:text-sm  sm:text-xs">
                        SR: {Math.floor(p.price * (1 + p.offer / 100))}/-
                      </strike>
                      <span
                        className="text-green-500 font-semibold lg:text-lg sm:text-xs
            "
                      >
                        {p.offer}% off
                      </span>
                    </div>
                    <p className="ordernow-text text-[#000000] font-bold h-2 group-hover:text-white text-center items-center lg:text-lg sm:text-md">
                      SR:{p.price}/-
                    </p>
                  </>
                ) : (
                  <p className="ordernow-text text-[#000000] font-semibold h-2 group-hover:text-white text-center items-center lg:text-lg sm:text-xs">
                    SR:{p.price}/-
                  </p>
                )}
                <button
                  onClick={() => {
                    addToCart([{ ...p, units }]);
                  }}
                  className="btun4 text-white lg:inline-flex items-center lg:gap-3 sm:gap-1 group-hover:bg-slate-300 group-hover:text-black bg-[#000] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer lg:py-2 sm:py-1 lg:px-4 sm:px-2 lg:text-sm sm:text-xs font-semibold rounded-full butn"
                >
                  {t("common.ADD TO CART")}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center  p-3">
          {products && products.length < total && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
              className=" items-center  text-centerjustify-between bg-black  rounded box-border p-4 text-white text-xs font-semibold tracking-widest uppercase overflow-hidden cursor-pointer hover:opacity-80 shadow-lg flex -middle"
            >
              {loading ? t("allProducts.Loading...") : t("common.Loadmore")}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductCategory;
