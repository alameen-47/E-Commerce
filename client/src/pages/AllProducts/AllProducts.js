import React, { useState, useEffect, useCallback } from "react";
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
import { Carousel } from "@material-tailwind/react";
import { ProductCard1 } from "../../components/Product/ProductCard1.jsx";

const AllProducts = ({ start, end }) => {
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
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const pageSize = 20;
  const [units, setUnits] = useState(1);
  const [visibleCount, setVisibleCount] = useState(12); // Number of visible products initially
  const [productLimit, setProductLimit] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [displayedProductIds, setDisplayedProductIds] = useState(new Set()); // To keep track of displayed product IDs

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
    // getTotal();
  }, []);

  useEffect(() => {
    if (products) {
      setLoading(false);
    }
  }, [products]);

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

  const getAllProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/product/get-product`);
      // setLoading(false);
      const totalLength = data.length;
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

            const updatedImages = product?.image.map((img) => ({
              ...img,
              filePath: `http://localhost:8085/uploads/${img.filePath}`,
            }));

            return {
              ...product,
              name: translatedName,
              description: translatedDescription,
              image: updatedImages,
            };
          })
        );
        setProducts((prevProducts) => [...prevProducts, ...translatedProducts]);

        // Initialize displayed products and IDs
        const initialProducts = data.products.slice(0, pageSize);
        setDisplayedProducts(initialProducts);
        setDisplayedProductIds(
          new Set(initialProducts.map((product) => product._id))
        );
        setStartIndex(pageSize);
        if (data.products.length <= pageSize) setHasMore(false);
        // Check if there are more pages to load
        if (data.currentPage >= data.totalPages || data.products.length < 10) {
          setHasMore(false); // Stop fetching when no more products are available
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        !loading &&
        hasMore
      ) {
        loadMoreProducts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  const loadMoreProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      // Calculate the next visible products
      const nextVisibleCount = visibleCount + 20; // Load 20 more products
      if (nextVisibleCount >= products.length) {
        setHasMore(false); // No more products to load
      }

      // Update the visible count
      setVisibleCount(nextVisibleCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const visibleProducts = products.slice(0, visibleCount);

  // Trigger fetching products when scrolling
  useEffect(() => {
    if (hasMore) {
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
              onClick={() => {
                setChecked([]);
                setRadio([]);
                getAllProducts();
              }}
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
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2  gap-2">
            {visibleProducts?.map((p) => (
              <div
                className=" flex lg:flex-col sm:flex-row 
                lg:aspect-[2/3]
align-super                
                "
                key={p._id}
              >
                <ProductCard1 products={p} />
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
