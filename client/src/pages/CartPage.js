import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import Orders from "./user/Orders/Orders";
import MapComponent from "../components/MapComponent";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { ProductHistory } from "../components/ProductHistory";
import { RiEmotionSadFill } from "react-icons/ri";
import { ImageCarousel } from "../components/Product/ImageCarousel";

const CartPage = () => {
  const storedCart = JSON.parse(localStorage.getItem("CART")) || [null];
  const [cart, setCart] = useState(storedCart);
  const [iqty, setIqty] = useState();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [showError, setShowError] = useState(false); // Track error message for shipping selection

  //translation
  const translateText = async (text, targetLanguage) => {
    const { data } = await axios.post("/api/v1/translate", {
      text,
      targetLanguage,
    });
    return data.translatedText;
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  // handle Payment
  const handlePayments = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });

      setLoading(false);
      toast.success(`Your order has been placed successfully`);
      setCart([]);
      localStorage.removeItem("CART");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleShippingChange = (e) => {
    console.log("Event:", e); // Add this line to debug the event object
    if (e && e.target) {
      const selectedOption = e.target.value;
      let cost = 0;
      switch (selectedOption) {
        case "standard":
          cost = 10;
          break;
        case "express":
          cost = 20;
          break;
        case "next-day":
          cost = 30;
          break;
        default:
          cost = 0;
      }
      setSelectedShipping(selectedOption); // Track the selected option
      setShippingCost(cost);
      setShowError(false); // Reset error if option is selected
    } else {
      console.error("Invalid event object:", e);
    }
  };
  const increment = (index) => {
    // let updatedQuantity = units ? parseInt(units) + 1 : 1;
    const iqty = [...cart];
    if (iqty[index].units < iqty[index].quantity) {
      iqty[index].units += 1;
      setCart(iqty);
      localStorage.setItem("CART", JSON.stringify(iqty));
    } else {
      toast.error("Oops!! Out Of Stock");
    }
  };
  const decrement = (index) => {
    // let updatedQuantity = units ? parseInt(units) + 1 : 1;
    const dqty = [...cart];
    if (dqty[index].units > 1) {
      dqty[index].units -= 1;
      setCart(dqty);
      localStorage.setItem("CART", JSON.stringify(dqty));
    }
  };

  //Items total Price
  const totalPrice = () => {
    let total = 0;
    cart.map((item) => (total += item.price * item.units));
    return total;
  };

  //total Checkout Price
  const totalcheckoutPrice = () => {
    try {
      let totalcheckout = cart.reduce(
        (acc, item) => acc + item.price * item.units,
        0
      );
      totalcheckout += shippingCost; // Add the selected shipping cost
      return totalcheckout.toLocaleString("en-US", {
        style: "currency",
        currency: "SAR",
      });
    } catch (error) {
      console.log(error);
      return "0.00";
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      // Create a copy of the cart array
      const updatedCart = cart.filter((item) => item._id !== pid);

      // Update the cart state
      setCart(updatedCart);

      // Update local storage
      localStorage.setItem("CART", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const translateCartItems = async (cartItems) => {
      const translatedCart = await Promise.all(
        cartItems.map(async (item) => {
          const translatedName = await translateText(item.name, i18n.language);
          const translatedDescription = await translateText(
            item.description,
            i18n.language
          );
          return {
            ...item,
            name: translatedName,
            description: translatedDescription,
          };
        })
      );
      setCart(translatedCart);
    };
    const storedCart = JSON.parse(localStorage.getItem("CART"));
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart); // This will throw an error if it's not valid JSON
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          translateCartItems(parsedCart);
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        localStorage.removeItem("CART"); // Clear invalid data
      }
    }
  }, [i18n.language]);
  useEffect(() => {
    localStorage.setItem("CART", JSON.stringify(cart));
  }, [cart]);

  return (
    <Layout>
      <div className="container mx-auto mt-10">
        <div className="flex flex-col md:flex-row shadow-md my-10">
          <div className="w-full md:w-3/4 bg-white md:px-10 md:py-10">
            <div className="flex justify-between border-b items-center align-middle  bg-black/20 p-2 rounded-lg">
              <h1 className="font-semibold lg:text-2xl mb-0 ">My Cart</h1>
              <h2 className="font-semibold lg:text-2xl mb-0 ">
                {cart?.length ? (
                  `${cart.length} ${t("cart.ITEMS")}${
                    auth?.token ? "" : ` ${t("cart.Please Login to Checkout")}`
                  }`
                ) : (
                  <div className="flex flex-col gap-2 align-middle items-center ">
                    <p className="text-md mb-0 leading-0">Cart is Empty</p>
                    <Link
                      to="/allproducts"
                      className=" mb-0  text-xs underline text-gray-600"
                    >
                      Continue Shopping!!
                    </Link>
                  </div>
                )}
              </h2>
            </div>
            <div className="divider  h-[2px] rounded-lg px-4"></div>
            {cart?.length > 0 && (
              <>
                <div className="flex flex-col mt-10  justify-center align-middle md:px-2">
                  <div className="flex justify-between align-middle items-center  border-b-2  bg-slate-4400 ">
                    <h3 className="font-semibold text-white bg-black text-center text-[0.8rem] mb-0 uppercase w-2/5 overflow-auto rounded-tl-md border-r-2 border-gray-600 border-1">
                      {t("cart.PRODUCT DETAILS")}
                    </h3>
                    <h3 className="font-semibold text-white bg-black  text-[0.8rem] mb-0 uppercase w-1/5 text-center border-r-2 border-gray-600 border-1">
                      {t("cart.QUANTITY")}
                    </h3>
                    <h3 className="font-semibold text-white bg-black  text-[0.8rem] mb-0 uppercase w-1/5 text-center border-r-2 border-gray-600 border-1">
                      {t("cart.PRICE")}
                    </h3>
                    <h3 className="font-semibold text-white bg-black  text-[0.8rem] mb-0 uppercase w-1/5 text-center rounded-tr-md  border-gray-600 border-1">
                      {t("cart.TOTAL")}
                    </h3>
                  </div>
                  {storedCart.map((units, index) => (
                    <>
                      <div
                        onClick={() => navigate(`/product/${units.slug}`)}
                        key={units._id}
                        className="cursor-pointer flex items-center justify-between border-b md:py-4 bg-black/10 md:px-3"
                      >
                        {/* Product Details */}

                        <div className="flex w-2/5">
                          {/* Product Details */}
                          <div className="flex w-2/5">
                            {/* Display First Product Image Directly */}
                            {units.images?.[0]?.imageSet?.[0] ? (
                              <img
                                src={`data:${units.images[0].imageSet[0].contentType};base64,${units.images[0].imageSet[0].data}`}
                                alt="Product"
                                className=" md:w-[10rem] md:h-[9rem] object-contain bg-white rounded-lg"
                              />
                            ) : (
                              <p>No image available</p>
                            )}
                          </div>

                          <div className="flex flex-col justify-between ml-4 flex-grow ">
                            <span className="font-bold text-sm">
                              {units.name}
                            </span>
                            <span className="text-gray-600 text-xs sm:hidden md:flex">
                              {units.description
                                ? units.description.substring(0, 50)
                                : ""}
                            </span>
                            <p
                              className="font-semibold box-border cursor-pointer text-red-500 hover:text-red-700 text-xs"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent the parent onClick from firing
                                removeCartItem(units._id);
                              }}
                            >
                              {t("cart.REMOVE")}
                            </p>
                            <div className=" bottom-9 flex justify-end items-end  align-baseline divider bg-black/30 h-[2px] rounded-lg px-4"></div>
                          </div>
                        </div>

                        <div className="INCREMENT/DECREMENT flex justify-center text-center ">
                          <svg
                            className="fill-current text-gray-600 md:w-5 md:mx-2 cursor-pointer"
                            viewBox="0 0 448 512"
                            onClick={(e) => {
                              e.stopPropagation();
                              decrement(index);
                            }}
                          >
                            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                          <p
                            className="border text-center  mb-0"
                            type="number"
                            min={1}
                          >
                            {units.units}
                          </p>
                          <svg
                            className="fill-current text-gray-600 md:w-5 border border-black border-1 md:mx-2 cursor-pointer"
                            viewBox="0 0 448 512"
                            onClick={(e) => {
                              e.stopPropagation();
                              increment(index);
                            }}
                          >
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </div>

                        <span className=" PRICE text-center w-1/5 font-semibold text-sm">
                          {units.price}
                        </span>
                        <span className="TOTAL PRICE text-center w-1/5 font-semibold text-sm">
                          {units.price * units.units}
                        </span>
                      </div>
                    </>
                  ))}
                </div>
              </>
            )}
            <Link
              href="#"
              className="flex font-semibold text-gray-700 hover:drop-shadow-lg text-sm mt-10"
            >
              {/* Continue Shopping Link */}
            </Link>
          </div>
          {cart?.length > 0 && (
            <>
              <div id="summary" className="w-full  md:w-1/4 px-8 py-10 ">
                <h1 className="font-semibold text-2xl border-b   bg-black/20 p-2 rounded-lg">
                  {t("cart.Order Summary")}
                </h1>

                <div className="divider bg-black/30 h-[2px] rounded-lg px-4"></div>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    {t("cart.ITEMS")} {cart?.length}
                  </span>
                  <span className="font-semibold text-sm">
                    {t("cart.SAR")}: {totalPrice()}/-
                  </span>
                </div>
                <div>
                  <label className="font-medium inline-block mb-3 text-sm uppercase">
                    {t("cart.SHIPPING")}
                  </label>
                </div>
                {auth?.user?.address ? (
                  <>
                    <div className="py-10 flex flex-col justify-around gap-4">
                      <input
                        type="text"
                        id="address"
                        placeholder="Enter your address"
                        className="p-2 text-s,m hngbfvdcm w-full"
                      />
                      <input
                        type="text"
                        id="Zip Code"
                        placeholder="Enter your Zip Code"
                        className="p-2 text-sm w-full"
                      />
                      <h3 className="p-2 text-sm w-full">
                        {auth.user?.address}
                      </h3>
                    </div>

                    <button
                      onClick={() => navigate("/dashboard/user/edit-profile")}
                      className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
                    >
                      {t("cart.UPDATE ADDRESS")}
                    </button>
                  </>
                ) : (
                  <>
                    {auth?.token ? (
                      <button
                        onClick={() => navigate("/dashboard/user/profile")}
                        className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
                      >
                        {t("cart.Update Address")}
                      </button>
                    ) : (
                      <button
                        className="bg-green-600 hover:bg-green-400 px-5 py-2 text-sm text-white uppercase"
                        onClick={() =>
                          navigate("/signin", {
                            state: "/cart",
                          })
                        }
                      >
                        {t("cart.Please Login to Checkout")}
                      </button>
                    )}
                  </>
                )}
                <div className="border-t mt-8">
                  <div className="flex flex-col gap-3 font-semibold justify-between text-sm uppercase">
                    <span>
                      Product Price:
                      {cart
                        ?.map((item) => item.price)
                        .reduce((a, b) => a + b, 0)}
                    </span>
                    <span>
                      Shipping Charge:
                      {shippingCost}
                    </span>
                  </div>
                </div>
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>{t("cart.TOTAL COST")}</span>
                    <span>
                      {t("cart.SAR")}: {totalcheckoutPrice()}/-
                    </span>
                  </div>

                  <div>
                    {!clientToken || !auth?.token || !cart?.length ? (
                      ""
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />
                        <select
                          className="block p-2 text-gray-600 w-full text-sm"
                          onChange={handleShippingChange} // Call shipping handler
                          required
                        >
                          <option value="">
                            -- {t("cart.Choose shipping method")} --
                          </option>
                          <option value="standard">
                            {t("cart.Standard shipping")} - {t("cart.SAR")}
                            :10.00
                          </option>
                          <option value="express">
                            {t("cart.Express shipping")} - {t("cart.SAR")}:20.00
                          </option>
                          <option value="next-day">
                            {t("cart.Next-day shipping")} - {t("cart.SAR")}
                            :30.00
                          </option>
                        </select>
                        <button
                          className="bg-green-600 font-semibold hover:bg-green-400 py-3 text-sm text-white uppercase w-full"
                          onClick={() => {
                            if (!selectedShipping) {
                              setShowError(true); // Trigger error
                              toast.error("Please choose a shipping method");
                            } else {
                              handlePayments();
                            }
                          }}
                          disabled={
                            loading || !instance || !auth?.user?.address
                          }
                        >
                          {loading
                            ? t("cart.Processing ....")
                            : t("cart.Make Payment")}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <ProductHistory />
      </div>
    </Layout>
  );
};

export default CartPage;
