import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Checkbox, Image, Input } from "antd";
import { CartCard } from "../components/Product/Cards/CartCard.jsx";
import { ProductHistory } from "../components/ProductHistory.jsx";

export const CartPage = () => {
  const orderSummaryRef = useRef(null);
  const [products, setPoducts] = useState([]);

  const fetchCart = () => {
    const cartProducts = localStorage.getItem("CART");
    if (cartProducts) {
      const cartArray = JSON.parse(cartProducts);
      setPoducts(cartArray);
    } else {
      setPoducts([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleScroll = () => {
    if (orderSummaryRef.current) {
      orderSummaryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  return (
    <Layout>
      <div className="flex  w-auto p-3 md:flex-row gap-3 sm:flex-col">
        <div className="LEFT md:w-[70%] rounded-lg p-4  bg-[#EFEEEE]/70">
          <div className="HEADING  font-semibold text-2xl flex flex-row justify-between  align-middle items-center mb-3">
            <span className="mb-0 ">Shopping Cart (5)</span>
            <div className="mb-0 text-sm flex  justify-center align-middle items-center gap-2">
              <input type="checkbox" className="w-5 h-4" />
              <div>Select All</div>
            </div>
          </div>
          {products?.length > 1 ? (
            <div className="flex flex-col gap-2">
              <CartCard products={products} />
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          ref={orderSummaryRef}
          className="RIGHT
 rounded-lg bg-[#EFEEEE]/70 p-4 flex flex-col gap-3 checkout-section  sticky top-4"
        >
          <div className="sticky top-0 z-10">
            <span className="mb-0 font-semibold text-xl">Order Summary</span>
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
                      Subtotal for (2) Items :
                    </span>

                    <span className="font-semibold ml-1 text-black">
                      SR:1,300/-
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold ml-1 text-black">
                      Offer :
                    </span>

                    <span className="font-semibold ml-1 text-[#992D2D]">
                      -SR:900/-
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold ml-1 text-black">
                      Shipping Fee :
                    </span>

                    <div className="gap-2 flex flex-row">
                      <strike className="font-semibold text-[#808080]">
                        SR:15/-
                      </strike>
                      <span className="font-semibold text-black">FREE</span>
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
                  <span className="text-[1rem] text-[#992D2D]">900/-</span>)
                  discount on this order!
                </p>
              </div>
              <>
                <div className="TOTAL_AMOUNT flex justify-between">
                  <span className="font-bold ml-1 text-lg text-black">
                    Total Amount :
                  </span>
                  <span className="font-bold ml-1 text-lg text-black">
                    SR:1,300/-
                  </span>
                </div>
              </>
              <button className="CHECKOUT_BUTTON rounded-md bg-black text-white font-bold text-lg p-2 shadow-sm drop-shadow-md transform active:scale-95 sm:hidden md:flex text-center justify-center active:shadow-lg transition duration-150 sm:sticky  sm:bottom-12 sm:left-0 sm:right-0 md:relative sm:mb-1   md:bottom-auto md:left-auto md:right-auto w-[100%]">
                CHECKOUT{" "}
                <span className="!font-medium sm:visible md:hidden">
                  (SR:1,300/-)
                </span>
              </button>
            </div>
          </div>
        </div>
        <button className=" border-2 border-white CHECKOUT_BUTTON md:hidden rounded-md bg-black text-white font-bold text-lg my-2 p-2 shadow-sm drop-shadow-md transform active:scale-95 active:shadow-lg transition duration-150 sm:sticky  sm:bottom-[3.5rem] sm:left-0 sm:right-0 md:relative sm:my-4   md:bottom-auto md:left-auto md:right-auto w-">
          CHECKOUT{" "}
          <span className="!font-medium sm:visible md:hidden">
            (SR:1,300/-)
          </span>
        </button>
      </div>
      <ProductHistory />
    </Layout>
  );
};
export default CartPage;
