import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { t } from "i18next";
import { useCart } from "../context/cart";
import { ProductCard1 } from "../components/Product/ProductCard1";

const Search = () => {
  const [values, setValues] = useSearch([]);
  const [cart, setCart] = useCart([]);
  const navigate = useNavigate();
  const [units, setUnits] = useState(1);
  console.log(values, "LOCAL STORAGE VALUES");
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

export default Search;
