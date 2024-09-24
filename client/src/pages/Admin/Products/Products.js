import React, { useState, useEffect } from "react";
import "./Products.css";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ImageCarousel } from "../../../components/Product/ImageCarousel";

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
          <div className="lg:w-screen sm:left-0 sm:w-screen h-screen overflow-scroll sm:overflow-y-scroll !important">
            <div className="bg-slate-200">
              <h2 className="lg:text-3xl lg:font-extrabold sm:text-xl sm:font-bold">
                All Products List
              </h2>
              <div className=" mx-auto  max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 ">
                  {products?.map((p) => (
                    <Link
                      key={p._id}
                      to={`/dashboard/admin/product/${p.slug}`}
                      className="group shadow-xl hover:shadow-2xl rounded-xl transition duration-300 p-2 pt-5"
                    >
                      <div className="aspect-h-1 aspect-w-2 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7  ">
                        <ImageCarousel image={p.image} />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-900">{p.name}</h3>
                      <p className="mt-1 text-xs font-medium text-gray-500">
                        {p.description}
                      </p>
                      <p className="mt-1 text-xs font-medium">
                        <p className="mt-1 text-xs font-medium text-gray-600">
                          <strike className="font-semibold text-gray-400">
                            {Math.floor(p.price * (1 + p.offer / 100))}/-
                          </strike>
                          <span className="text-green-500 font-semibold">
                            {p.offer}% off
                          </span>
                        </p>

                        <span className="font-semibold text-lg">
                          {Math.floor(
                            p.price * (1 + p.offer / 100) * (1 - p.offer / 100)
                          )}
                          /-
                        </span>
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Products;
