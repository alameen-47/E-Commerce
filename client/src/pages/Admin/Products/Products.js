import React, { useState, useEffect } from "react";
import "./Products.css";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  //get all prdoducts
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
        <div className="admin-products-container">
          <div className="admin-products-container-content">
            <div className="row">
              <div className="col-1">
                <AdminMenu />
              </div>
              <div className="col-2">
                <div className="bg-white">
                  <h2 className=" text-3xl mt-8 text-center color-black b-4 font-black">
                    All Products List
                  </h2>
                  <div className="group mx-auto  max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
                      {products?.map((p) => (
                        <Link
                          key={p._id}
                          to={`/dashboard/admin/product/${p.slug}`}
                          className="group shadow-xl hover:shadow-2xl rounded-xl transition duration-300 p-2 pt-5"
                        >
                          <div className="aspect-h-1 aspect-w-2 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7  ">
                            <img
                              src={`/api/v1/product/product-image/${p._id}`}
                              alt={p.name}
                              className="object-scale-down h-48 w-96 transition duration-300 group-hover:scale-105"
                            />
                          </div>
                          <h3 className="mt-4 text-sm text-gray-900">
                            {p.name}
                          </h3>
                          <p className="mt-1 text-xs font-medium text-gray-500">
                            {p.description}
                          </p>
                          <p className="mt-1 text-xs font-medium text-gray-600">
                            SR:
                            <span
                              className="text-sm	"
                              style={{ color: "black" }}
                            >
                              {p.price}/-
                            </span>
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
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
