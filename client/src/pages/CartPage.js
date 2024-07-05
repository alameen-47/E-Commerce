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

const CartPage = () => {
  const storedCart = JSON.parse(localStorage.getItem("CART")) || [];
  const [cart, setCart] = useState(storedCart);
  const [iqty, setIqty] = useState();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
      let totalcheckout = 0;
      cart?.map((item) => {
        totalcheckout += item.price * item.units;
      });
      totalcheckout += 10;
      return totalcheckout.toLocaleString("en-us", "ar-sa", {
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
      translateCartItems(storedCart);
    }
  }, [i18n.language]);
  useEffect(() => {
    localStorage.setItem("CART", JSON.stringify(cart));
  }, [cart]);

  return (
    <Layout>
      <div className="container mx-auto mt-10">
        <div className="flex flex-col md:flex-row shadow-md my-10">
          <div className="w-full md:w-3/4 bg-slate-200 px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold lg:text-2xl">
                {t("cart.Shopping Cart")}
              </h1>
              <h2 className="font-semibold lg:text-2xl">
                {cart?.length
                  ? `${cart.length} ${t("cart.ITEMS")}${
                      auth?.token
                        ? ""
                        : ` ${t("cart.Please Login to Checkout")}`
                    }`
                  : t("cart.Cart is Empty")}
              </h2>
            </div>
            <div className="divider h-6 px-4"></div>

            <div className="flex flex-col mt-10 mb-5">
              <div className="flex justify-between border-b-2 pb-3">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5 overflow-auto">
                  {t("cart.PRODUCT DETAILS")}
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  {t("cart.QUANTITY")}
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  {t("cart.PRICE")}
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  {t("cart.TOTAL")}
                </h3>
              </div>

              {storedCart.map((units, index) => (
                <div
                  key={units._id}
                  className="flex items-center justify-between border-b py-4"
                >
                  {/* Product Details */}

                  <div className="flex w-2/5">
                    {/* product */}
                    <div className="w-20">
                      <img
                        className="h-24 aspect-auto object-contain sm:w-auto "
                        src={`/api/v1/product/product-image/${units._id}`}
                        alt={units.name}
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{units.name}</span>
                      <span className="text-gray-600 text-xs">
                        {units.description
                          ? units.description.substring(0, 50)
                          : ""}
                      </span>
                      <p
                        className="font-semibold box-border cursor-pointer text-red-500 hover:text-red-700 text-xs"
                        onClick={() => removeCartItem(units._id)}
                      >
                        {t("cart.REMOVE")}
                      </p>
                      <div className="divider h-6 px-18"></div>
                    </div>
                  </div>

                  <div className="flex justify-center text-center w-1/5">
                    <svg
                      className="fill-current text-gray-600 w-3 cursor-pointer"
                      viewBox="0 0 448 512"
                      onClick={() => decrement(index)}
                    >
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                    <p
                      className="mx-2 border text-center w-8 mb-0"
                      type="number"
                      min={1}
                    >
                      {units.units}
                    </p>
                    <svg
                      className="fill-current text-gray-600 w-3 cursor-pointer"
                      viewBox="0 0 448 512"
                      onClick={() => increment(index)}
                    >
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>

                  <span className="text-center w-1/5 font-semibold text-sm">
                    {units.price}
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {units.price * units.units}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="#"
              className="flex font-semibold text-gray-700 hover:drop-shadow-lg text-sm mt-10"
            >
              {/* Continue Shopping Link */}
            </Link>
          </div>
          <div id="summary" className="w-full md:w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              {t("cart.Order Summary")}
            </h1>

            <div className="divider  h-6 px-4"></div>
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
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>
                  {t("cart.Standard shipping")} - {t("cart.SAR")}:10.00
                </option>
              </select>
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
                  <h3 className="p-2 text-sm w-full">{auth.user?.address}</h3>
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
                    className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
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

                    <button
                      className="bg-black font-semibold hover:bg-gray-800 py-3 text-sm text-white uppercase w-full"
                      onClick={handlePayments.bind(this)}
                      disabled={loading || !instance || !auth?.user?.address}
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
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
