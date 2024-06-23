import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { t } from "i18next";
import { useCart } from "../context/cart";

const Search = () => {
  const [values, setValues] = useSearch([]);
  const [cart, setCart] = useCart([]);
  const navigate = useNavigate();
  const [units, setUnits] = useState(1);

  const addToCart = (item) => {
    const updatedCart = [...cart, ...item];
    setCart(updatedCart);
    localStorage.setItem("CART", JSON.stringify(updatedCart));
    toast.success("Item Added to cart");
  };
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1 className="text-center mt-5">Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? t("No Products Found")
              : `Found ${values?.results.length}`}
          </h6>
          <div className="flex flex-wrap my-3">
            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3  ">
              {values?.results.map((p) => (
                <div
                  className=" flex lg:flex-col sm:flex-row 
                lg:aspect-[2/3]   "
                  key={p._id}
                >
                  <div className="text-wrap  group lg:py-4 lg:px-2  bg-slate-200/10 rounded-lg flex flex-col items-center justify-center  relative after:absolute after:h-full after:bg-[#000000] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all  lg:xl:h-96 sm:h-72 ">
                    <img
                      onClick={() => navigate(`/product/${p.slug}`)}
                      src={`/api/v1/product/product-image/${p._id}`}
                      style={{
                        transform:
                          "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
                      }}
                      className="lg:md:w-44 md:w-40 sm:w-44  overflow-hidden object-contain aspect-square text-[#000000] group-hover:bg-gray-200 lg:text-5xl sm:text-2xl rounded-s  transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2  mx-auto h-[60%]"
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
                      className="btun4 text-white lg:inline-flex items-center lg:gap-3 sm:gap-1 group-hover:bg-slate-200 group-hover:text-black bg-[#000] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer lg:py-2 sm:py-1 lg:px-4 sm:px-2 lg:text-sm sm:text-xs font-semibold rounded-full butn"
                    >
                      {t("common.ADD TO CART")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
