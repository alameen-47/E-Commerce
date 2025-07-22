import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart.js";
import { toast } from "react-hot-toast";
import axios from "axios";
import { t } from "i18next";
import Skeleton from "react-loading-skeleton";
import { ProductCard1 } from "../../components/Product/ProductCard1.jsx";
import { API_BASE_URL } from "../../utilities/api.js";

const ProductsList = ({ start, end }) => {
  const [cart, setCart] = useCart([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState([0]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [c, setC] = useState([]);
  const navigate = useNavigate();
  const [units, setUnits] = useState(1);
  useEffect(() => {
    getAllCategory();
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/category/all-category`
      );
      if (data?.success) {
        setCategories(data?.categories);
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
  const getProductController = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/product/get-product`
      );
      setLoading(false);
      // Limit the products to the specified range
      setProducts(data.products.slice(start, end));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getProductController();
  }, [start, end]);

  if (loading) {
    return (
      <div className="flex justify-center items-center align-middle p-2">
        {t("allProducts.Loading...")}
      </div>
    );
  }

  return (
    <>
      <div className="sm:mx-8 mx-3 mt-5 grid gap-3 lg:grid-cols-7 md:grid-cols-4 sm:grid-cols-2 ">
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
      {/* <div className="flex justify-center  p-3">
        {products && products.length < total && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
            className=" items-center  justify-between  rounded box-border p-4 hover:bg-gray-700-200 hover:scale-15 hover:text-white bg-[#000]  hover:shadow-4xl  text-white text-xs font-semibold tracking-widest uppercase overflow-hidden cursor-pointer hover:opacity-80 hover:shadow-lg  peer-focus-visible:border"
          >
            {loading ? t("allProducts.Loading...") : t("allProducts.Loadmore")}
          </button>
        )}
      </div> */}
    </>
  );
};

export default ProductsList;
