import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Checkbox, Image, Input } from "antd";
import { CartCard } from "../components/Product/Cards/CartCard.jsx";
import { ProductHistory } from "../components/ProductHistory.jsx";
import { preconnect } from "react-dom";
import emptyCart from "../assets/icons/empty-cart.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const CartPage = () => {
  const navigate = useNavigate();
  const orderSummaryRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState({}); // { productId: true/false }

  const checkout = async () => {
    try {
      const selectedProductIds = Object.keys(checkedItems).filter(
        (id) => checkedItems[id] === true
      );
      const selectedItems = products.filter((item) =>
        selectedProductIds.includes(item._id)
      );
      if (selectedItems.length === 0) {
        alert("Please select products to Checkout");
        return;
      }

      const orderPayload = {
        products: selectedItems.map((item) => ({
          product: item._id,
          units: item.units,
          price: item.price,
          // categoryDetails: {
          //   size: item.categoryDetails.selectedSize,
          // },
          color: item.color,
        })),
        shippingAddress: {
          address: "Balele",
          city: "balele",
          postalCode: "571219",
          country: "India",
        },
        payment: {
          method: "COD", // or Stripe/PayPal if implemented
        },
      };

      const { data } = await axios.post(
        "/api/v1/orders/create-order",
        orderPayload
      );

      toast.success("Order Placed Successfully");
      const removeItems = localStorage.removeItem("CART");
      setProducts(removeItems);

      console.log(data);
    } catch (error) {
      console.error("Checkout Error: ", error.response?.data || error.message);
      toast.error("Checkout failed");
    }
  };

  const fetchCart = () => {
    setLoading(false);
    const cartProducts = localStorage.getItem("CART");
    if (cartProducts) {
      const cartArray = JSON.parse(cartProducts);
      setLoading(true);

      setProducts(cartArray);
    } else {
      setProducts([]);
      setLoading(false);
    }
  };

  const handleDelete = (_id) => {
    setProducts((prevProduct) => {
      const updatedProduct = prevProduct.filter((p) => p._id !== _id);
      localStorage.setItem("CART", JSON.stringify(updatedProduct));
      return updatedProduct;
    });
  };

  const handleQuantityChange = (_id, change) => {
    setProducts((prev) => {
      const newCart = prev.map((item) => {
        if (item._id === _id) {
          let unit = (item.units || 1) + change;
          return { ...item, units: unit < 1 ? 1 : unit };
        }
        return item;
      });
      console.log(newCart, "newCart -==-==-= INSIDE CARD");
      localStorage.setItem("CART", JSON.stringify(newCart));
      return newCart;
    });
  };
  // handleQuantityChange();
  useEffect(() => {
    fetchCart();

    const interval = setInterval(() => {
      const stored = JSON.parse(localStorage.getItem("CART"));
      setProducts((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(stored)) {
          return stored;
        }
        return prev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const cartTotal = () => {
    return (
      products &&
      products?.reduce((total, product) => {
        if (checkedItems[product._id]) {
          return total + product.price * (product.units || 1);
        }
        return total;
      }, 0)
    );
  };

  const cartDiscount = () => {
    return (
      products &&
      products?.reduce((total, product) => {
        if (checkedItems[product._id]) {
          const discounted = Math.round(
            product.price + (product.price * product.offer) / 100
          );
          return total + discounted * product.units;
        }
        return total;
      }, 0)
    );
  };

  const handleScroll = () => {
    if (orderSummaryRef.current) {
      orderSummaryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleCheck = (productId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  useEffect(() => {
    const initialChecked = {};
    products &&
      products?.forEach((item) => {
        initialChecked[item._id] = true;
      });
    setCheckedItems(initialChecked);
  }, [products]);

  const isAllSelected = Object.values(checkedItems).every(Boolean);
  const handleSelectAll = () => {
    const newState = {};
    products &&
      products?.forEach((item) => {
        newState[item._id] = !isAllSelected;
      });
    setCheckedItems(newState);
  };

  return (
    <>
      <Layout>
        {loading && products && products.length <= 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white to-grey-300 rounded-2xl shadow-md">
            <img
              src={emptyCart} // Use a relevant image path
              alt="Empty Cart"
              className="w-52  h-auto mb-6 animate-pulse duration-700"
            />
            <h2 className="md:text-3xl sm:text-2xl font-bold text-gray-800 mb-4">
              Your cart is feeling lonely!
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Looks like you haven’t added anything yet. Let’s fix that.
            </p>
            <Link to="/">
              <button className="bg-black hover:bg-white text-white hover:text-black font-semibold px-6 py-3 rounded-full shadow-lg transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex  w-auto p-3 md:flex-row gap-3 sm:flex-col">
            <div
              className="LEFT md:w-[70%] rounded-lg p-4  bg-[#EFEEEE]/70"
              // style={{
              //   background:
              //     "linear-gradient(185deg, #F5F7FA, #E4E7EB, #BDC3C7, #2C3E50)",
              // }}
            >
              <div className="HEADING  font-semibold text-2xl flex flex-row justify-between  align-middle items-center mb-3">
                <span className="mb-0 ">
                  Shopping Cart ( {products && products?.length} )
                </span>
                <div className="mb-0 text-sm flex  justify-center align-middle items-center gap-2">
                  <input
                    type="checkbox"
                    value={""}
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="w-5 h-4"
                  />
                  <div>Select All</div>
                </div>
              </div>
              {products?.length > 0
                ? products.map((product) => (
                    <div className="flex flex-col gap-y-3 ">
                      <CartCard
                        key={product._id}
                        product={product}
                        onDelete={handleDelete}
                        isChecked={!!checkedItems[product._id]}
                        onCheck={() => handleCheck(product._id)}
                        onToggle={() =>
                          setCheckedItems((prev) => ({
                            ...prev,
                            [product._id]: !prev[product._id],
                          }))
                        }
                        handleQuantityChange={handleQuantityChange}
                      />
                    </div>
                  ))
                : ""}
            </div>
            <div
              ref={orderSummaryRef}
              className="RIGHT
          rounded-lg  p-4 flex flex-col gap-3 checkout-section  sticky top-4"
              style={{
                background:
                  "linear-gradient(135deg, #F5F7FA, #E4E7EB, #BDC3C7, #2C3E50)",
              }}
            >
              {products && (
                <div className="sticky top-0 z-10 ">
                  <span className="mb-0 font-semibold text-xl">
                    Order Summary
                  </span>
                  <div className="PROMO_CODE w-full flex flex-col sticky gap-3 ">
                    <span className="text-sm font-semibold">Promo Code :</span>
                    <div className=" justify-between align-middle items-center ">
                      <Input
                        placeholder="SAVE15"
                        className="rounded-r-full rounded-l-xl h-10 font-semibold"
                      />
                      <button className="absolute right-0 h-10 px-7 rounded-badge bg-black rounded-x-full transform active:scale-95 active:shadow-lg transition duration-150 text-white">
                        Apply
                      </button>
                    </div>
                    <div className="CLAIMED_OFFER bg-[#00AEEF]/30 border-dashed border-black border-[1px] rounded-md text-sm p-1 font-semibold text-center text-gray-800">
                      You got 15% (SR:25/-) off on your Woodland Shoes
                    </div>
                    <>
                      <p
                        className="underline text-sm font-semibold text-[#17A2B8] tex-center flex justify-center align-middle items-center cursor-pointer"
                        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
                      >
                        Discover Available coupons for added savings!
                      </p>
                    </>
                    <>
                      <div className=" text-[#746E6E] font-medium flex flex-col gap-2">
                        <div className="flex justify-between">
                          <span className="font-semibold ml-1 text-black">
                            Subtotal for (
                            {Object.values(checkedItems).filter(Boolean).length}
                            ) Items :
                          </span>

                          <span className="font-semibold ml-1 text-black">
                            SR:{cartTotal()}/-
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold ml-1 text-black">
                            Offer :
                          </span>

                          <span className="font-semibold ml-1 text-[#992D2D]">
                            -SR:{cartDiscount()}/-
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold ml-1 text-black">
                            Shipping Fee :
                          </span>

                          <div className="gap-2 flex flex-row">
                            <strike className="font-semibold text-[#808080]">
                              SR:150/-
                            </strike>
                            <span className="font-semibold text-black">
                              FREE
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                    <div className="DIVIDER bg-black h-[0.1rem] w-[90%] flex justify-center align-middle items-center m-auto"></div>
                    <div className="flex justify-center align-middle items-center text-center">
                      <p
                        className="font-semibold text-xs gap-2 p-2 mb-0 "
                        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
                      >
                        🎉 Big Win! You’re snagging a (SR:
                        <span className="text-[1rem] text-[#992D2D]">
                          {cartDiscount()}/-
                        </span>
                        ) discount on this order!
                      </p>
                    </div>
                    <>
                      <div className="TOTAL_AMOUNT flex justify-between">
                        <span className="font-bold ml-1 text-lg text-black">
                          Total Amount :
                        </span>
                        <span className="font-bold ml-1 text-lg text-black">
                          SR:{cartTotal()}/-
                        </span>
                      </div>
                    </>

                    <>
                      <button
                        className="CHECKOUT_BUTTON rounded-md bg-black text-white font-bold text-lg p-2 shadow-sm drop-shadow-md transform active:scale-95 sm:hidden md:flex text-center justify-center active:shadow-lg transition duration-150 sm:sticky  sm:bottom-12 sm:left-0 sm:right-0 md:relative sm:mb-1   md:bottom-auto md:left-auto md:right-auto w-[100%]"
                        onClick={checkout}
                      >
                        CHECKOUT{" "}
                        <span className="!font-medium sm:visible md:hidden">
                          (SR:{cartTotal()}/-)
                        </span>
                      </button>
                    </>
                  </div>
                </div>
              )}
            </div>
            {Object.values(checkedItems).some((value) => value === true) && (
              <button
                className=" border-2 border-white CHECKOUT_BUTTON md:hidden rounded-md bg-black text-white font-bold text-lg my-2 p-2 shadow-sm drop-shadow-md transform active:scale-95 active:shadow-lg transition duration-150 sm:sticky  sm:bottom-[3.5rem] sm:left-0 sm:right-0 md:relative sm:my-4   md:bottom-auto md:left-auto md:right-auto"
                onClick={checkout}
              >
                CHECKOUT{" "}
                <span className="!font-medium sm:visible md:hidden">
                  (SR:{cartTotal()}/-)
                </span>
              </button>
            )}
          </div>
        )}

        <ProductHistory />
      </Layout>
    </>
  );
};
export default CartPage;
