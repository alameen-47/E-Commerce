import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  const [page, setPage] = useState(1);
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
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-3">
        <h1 className="text-center text-xl font-bold">{category?.name}</h1>
        <h1 className="text-center text-xs">
          {products?.length} Results found
        </h1>
        <div className="flex flex-wrap my-3 ">
          {products?.map((p) => (
            <div>
              <div className="m-2 group p-8  bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#000000] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all max-w-xs h-96 ">
                <img
                  onClick={() => navigate(`/product/${p.slug}`)}
                  src={`/api/v1/product/product-image/${p._id}`}
                  style={{
                    transform:
                      "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
                  }}
                  className="w-44 card1img aspect-auto text-[#000000] group-hover:bg-gray-200 text-5xl rounded-s p-2 transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2  mx-auto"
                  alt=""
                ></img>
                <p className="cardtxt font-semibold text-black tracking-wider group-hover:text-white text-xl">
                  {p.name.substring(0, 15)}
                </p>
                <p className="blueberry font-semibold text-gray-600  group-hover:text-gray-200 text-xs">
                  {p.description.substring(0, 30)}
                </p>
                <div className="ordernow flex flex-row justify-between items-center w-full">
                  <p className="ordernow-text text-[#000000] font-semibold group-hover:text-white">
                    SR:{p.price}/-
                  </p>
                  <p className="btun4 text-white lg:inline-flex items-center gap-3 group-hover:bg-white group-hover:text-black bg-[#000] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer py-2 px-4 text-sm font-semibold rounded-full butn">
                    ADD TO CART
                  </p>
                </div>
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
              className=" items-center  justify-between bg-black  rounded box-border p-4 text-white text-xs font-semibold tracking-widest uppercase overflow-hidden cursor-pointer hover:opacity-80 shadow-lg "
            >
              {loading ? "Loading..." : "Loadmore"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductCategory;
