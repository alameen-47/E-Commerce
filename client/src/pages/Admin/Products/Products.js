import React, { useState, useEffect } from "react";
import "./Products.css";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ImageCarousel } from "../../../components/Product/ImageCarousel";
import { ProductCard2 } from "../../../components/Product/ProductCard2";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  //lifiecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <>
        <div className="container flex lg:flex-row sm:flex-col lg:gap-10 sm:gap-0 ">
          <div className="relative !important">
            <AdminMenu />
          </div>
          <div className="lg:w-screen sm:left-0 sm:w-screen h-screen overflow-scroll sm:overflow-y-scroll !important custom-scrollbar">
            <h2 className="lg:text-3xl lg:font-extrabold sm:text-xl sm:font-bold">
              All Products List
            </h2>
            <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-2 ">
              {products && products.length > 0
                ? products.map((p) => (
                    <div
                      className="flex w-auto lg:flex-col sm:flex-row justify-center align-middle items-center bg-gray-200 drop-shadow-lg rounded-lg sm:p-0"
                      key={p._id}
                    >
                      <ProductCard2 product={p} />
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Products;
