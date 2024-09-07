import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import "./AllProducts.css";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart.js";
import { toast } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import { Prices } from "../.././components/Prices";

const AllProducts = () => {
  const [cart, setCart] = useCart([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState([0]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [c, setC] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [hasMore, setHasMore] = useState(true);
  const [units, setUnits] = useState(1);

  //translation
  const translateText = async (text, targetLanguage) => {
    const { data } = await axios.post("/api/v1/translate", {
      text,
      targetLanguage,
    });
    return data.translatedText;
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (products) {
      setLoading(false);
    }
  }, [products]);

  //handle scroll event
  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 800 &&
      !loading &&
      hasMore // Check if there are more products to load
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 800);

  // Effect to add/remove scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, loading, hasMore]);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        const translatedCategories = await Promise.all(
          data.categories.map(async (category) => {
            const translatedName = await translateText(
              category.name,
              i18n.language
            );

            return {
              ...category,
              name: translatedName,
            };
          })
        );
        setCategories(translatedCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (item) => {
    const updatedCart = [...cart, ...item];
    setCart(updatedCart);
    localStorage.setItem("CART", JSON.stringify(updatedCart));
    toast.success(`${t("Item Added to cart")}`);
  };

  // //get all AllProducts
  const getAllProducts = async () => {
    if (!hasMore) return; // Exit early if there are no more products to load

    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (data.products.length > 0) {
        const translatedProducts = await Promise.all(
          data.products.map(async (product) => {
            const translatedName = await translateText(
              product.name,
              i18n.language
            );
            const translatedDescription = await translateText(
              product.description,
              i18n.language
            );
            return {
              ...product,
              name: translatedName,
              description: translatedDescription,
            };
          })
        );
        setProducts((prevProducts) => [...prevProducts, ...translatedProducts]);
        if (data.products.length < data.pageSize) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
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
    if (page > 1 && hasMore) {
      getAllProducts();
    }
  }, [page]);

  // Function to handle changes in category filters
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
      const translatedProducts = await Promise.all(
        data.products.map(async (product) => {
          const translatedName = await translateText(
            product.name,
            i18n.language
          );
          const translatedDescription = await translateText(
            product.description,
            i18n.language
          );
          return {
            ...product,
            name: translatedName,
            description: translatedDescription,
          };
        })
      );
      setProducts(translatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"<<PRODUCTS ALL YOU NEED>>"}>
      <div
        onClick={() => setToggle(!toggle)}
        id="dropdownDefault"
        data-dropdown-toggle="dropdown "
        class="  w-40 lg:hidden  flex justify-around   bg-black  text-white hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-4 py-2.5 text-center   dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        type="button"
      >
        <div className=" flex top-0   lg:md:h-5 sm:text-[12px]">
          {t("allProducts.Filter Products")}
          {toggle ? (
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path>
            </svg>
          )}
        </div>
      </div>
      {toggle && (
        <div className="lg:hidden relative sm:top-5 sm:px-2">
          <h3 className="text-center md:sm:text-xs lg:text-lg font-bold ">
            {t("allProducts.Filter By Category")}
          </h3>
          <div className="flex flex-col font-semibold">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name || <Skeleton />}
              </Checkbox>
            ))}
          </div>
          {/* //price filter// */}
          <h3 className="text-center md:sm:text-sm lg:text-lg font-bold mt-5 ">
            {t("allProducts.Filter By Price")}
          </h3>
          <div className="flex flex-col">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div className="text-white font-semibold" key={p._id}>
                  <Radio value={p.array}>{t(`prices.${p.nameKey}`)}</Radio>
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
              {t("allProducts.Reset Filters")}
            </button>
          </div>
        </div>
      )}
      <div className="h-auto w-full flex align-top mt-16  sm:justify-center sm:items-center bg-slate-200">
        <div className="md:w-1/5 lg:block  sm:hidden pr-4 pl-4 flex-wrap top-0 left-0 bottom-0 sticky  justify-start align-top items-start ">
          <h3 className="text-center md:sm:text-sm lg:text-lg font-bold ">
            {t("allProducts.Filter By Category")}
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
            {t("allProducts.Filter By Price")}
          </h3>
          <div className="flex flex-col">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div className="text-white" key={p._id}>
                  <Radio value={p.array}>{p.nameKey}</Radio>
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
              {t("allProducts.Reset Filters")}
            </button>
          </div>
        </div>
        <div className="md:w-4/4 md:items-center sm:justify-center sm:items-center flex-row justify-center align-middle items-center p-1">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3  ">
            {products?.map((p) => (
              <div
                className=" flex lg:flex-col sm:flex-row 
                lg:aspect-[2/3]"
                key={p._id}
              >
                <div className="text-wrap  group lg:py-4 lg:px-2  bg-slate-200/10 rounded-lg flex flex-col items-center justify-center  relative after:absolute after:h-full after:bg-[#000000] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all sm:py-4  lg:xl:h-96 sm:h-72 gap-1">
                  <img
                    onClick={() => navigate(`/product/${p.slug}`)}
                    src={`/api/v1/product/product-image/${p._id}`}
                    style={{
                      transform:
                        "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
                    }}
                    className="lg:md:w-44 md:w-40 sm:w-32  overflow-hidden object-contain aspect-square text-[#000000] group-hover:bg-gray-200 lg:text-5xl sm:text-2xl rounded-s  transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2  mx-auto h-[60%]"
                    alt=""
                  />
                  <p className="cardtxt font-semibold  text-black tracking-wider group-hover:text-white h-2 md:text-sm lg:text-[16px] sm:text-[10px]">
                    {(() => {
                      const words = p.name.split(" ");
                      return words.length > 1
                        ? words.slice(0, 2).join(" ").toUpperCase()
                        : words[0].toUpperCase();
                    })()}
                    {/* {p.name} */}
                  </p>
                  <p className="blueberry font-semibold text-gray-500  group-hover:text-gray-200 mb-0 lg:text-xs md:text-sm sm:text-[10px] text-center px-2">
                    {/* {(() => {
                      const words = p.description.split(" ");
                      return words.length > 1
                        ? words.slice(0, 2).join(" ")
                        : words[0];
                    })()} */}
                    {p.description}
                  </p>

                  {p.offer ? (
                    <>
                      <div className="flex gap-1 justify-center items-center mt-0 ">
                        <strike className="ordernow-text text-[#616161] font-semibold  group-hover:text-white text-center items-center lg:text-sm  sm:text-xs">
                          SR:
                          {Math.floor(p.price * (1 + p.offer / 100)) || (
                            <Skeleton />
                          )}
                          /-
                        </strike>
                        <span className="text-green-500 font-semibold lg:text-lg sm:text-xs">
                          {p.offer || <Skeleton />}% off
                        </span>
                      </div>
                      <p className="ordernow-text text-[#000000] font-bold h-2 group-hover:text-white text-center items-center lg:text-lg sm:text-md">
                        SR:{p.price || <Skeleton />}/-
                      </p>
                    </>
                  ) : (
                    <p className="ordernow-text text-[#000000] font-semibold h-2 group-hover:text-white text-center items-center lg:text-lg sm:text-xs">
                      SR:{p.price || <Skeleton />}/-
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
                {/* )} */}
              </div>
            ))}
          </div>

          <div
            className="bg-black my-4 p-2 w-fit text-white m-auto 
           h-auto flex justify-center align-middle items-center rounded-lg text-center"
          >
            {loading ? (
              <p className="mb-0">{t("allProducts.loadingMoreProducts")}</p>
            ) : (
              !hasMore && (
                <p className="flex text-center mb-0 ">
                  {t("allProducts.noMoreProducts")}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
