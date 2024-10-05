import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import "./AllProducts.css";
import { Checkbox, FloatButton, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart.js";
import { Skeleton } from "antd";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import { Prices } from "../.././components/Prices";
import { ProductCard1 } from "../../components/Product/ProductCard1.jsx";
import Products from "../Admin/Products/Products.js";
import { Offers } from "../../components/Offers.jsx";
import { Button, Drawer } from "antd";
import { FaFilter } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const AllProducts = () => {
  const [cart] = useCart();
  const [open, setOpen] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [radioOffer, setRadioOffer] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [hasMore, setHasMore] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12); // Number of visible products initially
  const [categoryName, setCategoryName] = useState([]);
  const [active, setActive] = useState(true);

  const showLoading = () => {
    setOpen(true);
    setLoadingAnimation(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoadingAnimation(false);
    }, 2000);
  };

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

  const getAllProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/product/get-product`);
      // setLoading(false);
      const totalLength = data.length;
      console.log(typeof data.products, "DATA.PRODUCT VALUES", data.products);

      setProducts(data.products);

      // Check if there are more products to load
      if (data.products.length < 10) {
        setHasMore(false); // No more products available if fewer than 10 are returned
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
      const nextVisibleCount = visibleCount + 6; // Load 12 more products
      if (products.length) {
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
      console.log("ALL PRODUCTS OUTPUT ", Products);
    }
  }, [page]);

  // Function to handle changes in category filters
  const handleFilter = (value, id, name) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCategoryName([...categoryName, name]);

    setChecked(all);
  };
  useEffect(() => {
    console.log([categoryName], "CATEGORY NAME SELECTED");
  }, [categoryName]);
  // useEffect(() => {
  //   if (!checked.length || !radio.length || radioOffer.length) getAllProducts();
  // }, [checked.length, radio.length, radioOffer.length]);

  useEffect(() => {
    if (checked.length || radio.length || radioOffer.length) filterProduct();
  }, [checked, radio, radioOffer]);

  //get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
        radioOffer,
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
      <div>
        <div
          style={{
            marginTop: 10,
          }}
          className="md:hidden sm:absolute left-4  "
        >
          <FloatButton
            icon={<FaShoppingCart />}
            badge={{
              count: cart ? cart.length : 0,
            }}
            onClick={() => navigate("/cart")}
          />

          <Button
            type=""
            className="bg-black focus:outline-0 text-white"
            onClick={showLoading}
          >
            <FaFilter />
            Filter
          </Button>
          <Drawer
            closable
            destroyOnClose
            title={<p></p>}
            placement="right"
            open={open}
            loading={loading}
            onClose={() => setOpen(false)}
          >
            {showLoading && (
              <div className="lg:hidden relative sm:top-5 sm:px-2">
                <h3 className="text-center md:sm:text-xs lg:text-lg font-bold ">
                  {t("allProducts.Filter By Category")}
                </h3>
                <div className="flex flex-col font-semibold">
                  {categories?.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) =>
                        handleFilter(e.target.checked, c._id, c.name)
                      }
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
                      <div className="text-white font-semibold" key={p._id}>
                        <Radio value={p.array}>
                          {t(`prices.${p.nameKey}`)}
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
                {/* //Offer filter// */}
                <h3 className="text-center md:sm:text-sm lg:text-lg font-bold mt-5 ">
                  {t("offers.Filter By Offers")}
                </h3>
                <div className="flex flex-col">
                  <Radio.Group onChange={(e) => setRadioOffer(e.target.value)}>
                    {Offers?.map((o) => (
                      <div className="text-white font-semibold" key={o._id}>
                        <Radio value={o.array}>
                          {t(`offers.${o.nameKey}`)}
                        </Radio>
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
          </Drawer>
        </div>
        <div className="h-auto w-full flex align-top  items-start bg-white pt-10">
          <div className="md:w-1/5 lg:block  sm:hidden pr-4 pl-4 flex-wrap top-0 left-0 bottom-0 sticky  justify-start align-top items-start ">
            <h3 className="text-center md:sm:text-sm lg:text-lg font-bold ">
              {t("allProducts.Filter By Category")}
            </h3>
            <div className="flex flex-col font-semibold">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => {
                    handleFilter(e.target.checked, c._id, c.name);
                  }}
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
                  <div className="text-white font-semibold" key={p._id}>
                    <Radio value={p.array}>{t(`prices.${p.nameKey}`)}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            {/* //Offer filter// */}
            <h3 className="text-center md:sm:text-sm lg:text-lg font-bold mt-5 ">
              {t("offers.Filter By Offers")}
            </h3>
            <div className="flex flex-col">
              <Radio.Group onChange={(e) => setRadioOffer(e.target.value)}>
                {Offers?.map((o) => (
                  <div className="text-white font-semibold" key={o._id}>
                    <Radio value={o.array}>{t(`offers.${o.nameKey}`)}</Radio>
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
          <div className="md:w-4/4 md:items-center sm:justify-center sm:items-center sm:w-full flex-row justify-center align-middle items-center p-1 ">
            <FloatButton
              icon={<FaShoppingCart />}
              badge={{
                count: cart ? cart.length : 0,
              }}
              onClick={() => navigate("/cart")}
            />
            <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-2">
              {visibleProducts && visibleProducts.length > 0
                ? visibleProducts.map((p) => (
                    <div
                      className="flex w-auto lg:flex-col sm:flex-row  justify-center align-middle items-center"
                      key={p._id}
                    >
                      <ProductCard1 products={p} />
                    </div>
                  ))
                : // Display 5 skeleton components (adjust the number as needed)
                  Array.from({ length: 12 }).map((_, index) => (
                    <div
                      className="flex lg:flex-col sm:flex-row   justify-center align-middle items-center"
                      key={index}
                    >
                      <div className="flex w-48 flex-col gap-4">
                        {/* <div className="skeleton h-32 w-full"></div> */}
                        <Skeleton.Image
                          active={active}
                          style={{ width: "100%", height: "150px" }}
                        />

                        <Skeleton active />
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
