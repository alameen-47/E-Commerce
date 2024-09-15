import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.js";
import { toast } from "react-hot-toast";
import { t } from "i18next";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart([]);
  const [units, setUnits] = useState(1);
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const addToCart = (item) => {
    const updatedCart = [...cart, ...item];
    setCart(updatedCart);
    localStorage.setItem("CART", JSON.stringify(updatedCart));
    toast.success("Item Added to cart");
  };
  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
    // console.log(product);
    // getImage();
    console.log("HELOOOOOO", images);
  }, [params?.slug]);

  // const finalImages=async()=>{
  //   getProduct()

  // }

  // getImage
  const getImage = async (id) => {
    const response = await axios.get(`/api/v1/product/product-image/${id}`);
    console.log("HAHAHAHAHHA ", response);
    setImages((prevImages) => [...prevImages, response.data]);
  };
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      //calling getImages here couse we cannot get the productId from params taking it directly from productDetails
      getImage(data?.product._id);
      console.log(images);
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
      <div className="flex flex-wrap md:flex-row sm:flex-col sm:justify-center my-16 container mx-auto ">
        <div>
          <div className="items-center md:flex-row sm:flex-col w-auto  flex lg:h-96 sm:h-auto bg-slate-100 rounded-sm align-middle justify-center">
            <img
              src={`/api/v1/product/product-image/${product._id}`}
              alt={product.name}
              className="MAIN IMAGE justify-center md:sm:h-auto object-scale-down h-auto   transition duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-row justify-between">
            {images &&
              images.map((image, i) => (
                <img
                  key={i}
                  src={`data:image/jpeg;base64,${image}`} // Display base64 image
                  alt={`Product ${i + 1}`}
                  style={{ width: "200px", height: "200px" }} // Adjust as needed
                />
              ))}
          </div>
        </div>

        <div className="md:w-1/2 pr-4 pl-12 py-5 flex flex-col  gap-6">
          <h3 className="text-gray-800 sm:text-xs lg:text-2xl pt-3 font-extrabold uppercase">
            {product.name}
          </h3>
          <p className="md:sm:text-sm lg:text-base">{product.description}</p>
          <p className="md:sm:text-sm lg:text-xs font-semibold uppercase">
            category:{product.category?.name}
          </p>
          <div className="flex flex-col gap-5 ">
            {product.offer ? (
              <>
                <div className="flex flex-row gap-1  items-center mt-0 ">
                  <strike className="ordernow-text text-[#616161] font-semibold  group-hover:text-white text-center items-center lg:text-sm  sm:text-xs">
                    SR: {Math.floor(product.price * (1 + product.offer / 100))}
                    /-
                  </strike>
                  <span
                    className="text-green-500 font-semibold lg:text-lg sm:text-xs
            "
                  >
                    {product.offer}% off
                  </span>
                </div>

                <h5 className="ordernow-text text-[rgb(0,0,0)] font-bold h-2 group-hover:text-white  items-center lg:text-2xl sm:text-md">
                  SR:{product.price}/-
                </h5>
              </>
            ) : (
              <h5 className="ordernow-text text-[#000000] font-semibold h-2 group-hover:text-white  lg:text-2xl sm:text-xs">
                SR:{product.price}/-
              </h5>
            )}
          </div>

          <button
            onClick={() => {
              addToCart([{ ...product, units }]);
            }}
            class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 hover:opacity-[0.95] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
            data-ripple-light="true"
          >
            {t("common.ADD TO CART")}
          </button>
        </div>
      </div>
      <hr />
      <div className="flex flex-col justify-center text-center ">
        <h1 className="font-bold">Related Products</h1>
      </div>
      {relatedProducts.length < 1 && <p>No Related Products Found</p>}
      <div className="flex justify-center">
        <div className="grid lg:grid-cols-4  sm:grid-cols-2 ">
          {relatedProducts?.map((p) => (
            <div className="flex-col">
              <div className="m-2 group p-8  bg-slate-200/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#000000] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all max-w-xs h-96 ">
                <img
                  onClick={() => navigate(`/product/${p.slug}`)}
                  src={`/api/v1/product/product-image/${p._id}/0`}
                  style={{
                    transform:
                      "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
                  }}
                  className="w-44 card1img aspect-square text-[#000000] group-hover:bg-gray-200 text-5xl rounded-s p-2 transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2  mx-auto "
                  alt=""
                ></img>
                <p className="cardtxt font-semibold text-black tracking-wider group-hover:text-white text-xl">
                  {p.name.substring(0, 15)}
                </p>
                <p className=" font-semibold text-gray-600  group-hover:text-gray-200 text-xs">
                  {p.description.substring(0, 30)}
                </p>
                <div className="flex gap-2 flex-col justify-center align-middle items-center">
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
                    className="text-white lg:inline-flex items-center gap-3 group-hover:bg-slate-200 group-hover:text-black bg-[#000] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer py-2 px-2 text-xs font-semibold rounded-full "
                  >
                    {t("common.ADD TO CART")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
