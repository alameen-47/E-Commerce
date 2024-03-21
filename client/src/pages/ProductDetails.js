import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="flex flex-wrap my-16 container mx-auto sm:px-4">
        <div className="w-1/2  flex lg:h-96 sm:h-auto bg-slate-100 rounded-sm align-middle justify-center">
          <img
            src={`/api/v1/product/product-image/${product._id}`}
            alt={product.name}
            className=" justify-center md:sm:h-auto w-auto object-scale-down h-auto w-94  transition duration-300 group-hover:scale-105"
          />
        </div>
        <div className="md:w-1/2 pr-4 pl-12 py-5 flex flex-col  gap-6">
          <h3 className="text-gray-800 sm:text-xs lg:text-2xl pt-3 font-extrabold uppercase">
            {product.name}
          </h3>
          <p className="md:sm:text-sm lg:text-base">{product.description}</p>
          <p className="md:sm:text-sm lg:text-xs font-semibold uppercase">
            category:{product.category?.name}
          </p>
          <h5 className="text-gray-800 sm:text-sm lg:text-lg pt-3 font-n font-semibold capitalize">
            SAR: {product.price}/-
          </h5>
          <button
            class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 hover:opacity-[0.95] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
            data-ripple-light="true"
          >
            Add To Cart
          </button>
        </div>
      </div>
      <hr />
      <div className="flex flex-col justify-center text-center ">
        <h1 className="font-bold">Related Products</h1>
      </div>
      {relatedProducts.length < 1 && <p>No Related Products Found</p>}
      <div className="flex flex-row justify-center">
        {relatedProducts?.map((p) => (
          <div className="flex-col">
            <div className="m-2 group p-8  bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#000000] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all max-w-xs h-96 ">
              <img
                onClick={() => navigate(`/product/${p.slug}`)}
                src={`/api/v1/product/product-image/${p._id}`}
                style={{
                  transform:
                    "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
                }}
                className="w-44 card1img aspect-square text-[#000000] group-hover:bg-gray-200 text-5xl rounded-s p-2 transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2  mx-auto"
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
    </Layout>
  );
};

export default ProductDetails;
