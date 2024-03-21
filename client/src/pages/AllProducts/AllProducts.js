import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import "./AllProducts.css";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { Prices } from "../../components/Prices.js";
import { useCart } from "../../context/cart.js";
import { toast } from "react-hot-toast";

const AllProducts = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState([0]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get all AllProducts
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //getTotal count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"<<PRODUCTS ALL YOU NEED>>"}>
      <div className=" container h-auto w-screen flex align-middle mt-16">
        <div className="md:w-1/5 pr-4 pl-4 flex-wrap">
          <h3 className="text-center md:sm:text-sm lg:text-lg font-bold ">
            Filter By Category
          </h3>
          <div className="flex flex-col">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* //price filter// */}
          <h3 className="text-center md:sm:text-sm lg:text-lg font-bold mt-5 ">
            Filter By Price
          </h3>
          <div className="flex flex-col">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="flex flex-col">
            <button
              className="btn-btn-primary my-7 !text-red-500"
              type="primary"
              onClick={() => window.location.reload()}
              block
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="md:w-4/4 pr-4 pl-4">
          <h1 className="text-center md:sm:text-xl lg:text-3xl font-semibold">
            ALL PRODUCTS
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
                    <button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                      className="btun4 text-white lg:inline-flex items-center gap-3 group-hover:bg-white group-hover:text-black bg-[#000] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer py-2 px-4 text-sm font-semibold rounded-full butn"
                    >
                      ADD TO CART
                    </button>
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
      </div>
    </Layout>
  );
};

export default AllProducts;
