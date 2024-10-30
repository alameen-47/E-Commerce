import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { UserMenu } from "../components/Layout/UserMenu";
import { LikedCard } from "../components/Product/Cards/LikedCard";

export const LikedProducts = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const updateWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };
  return (
    <Layout title={"Your Orders"}>
      <div className="bg-white md:hidden lg:flex sm:block flex h-screen max-h-screen   lg:flex-row sm:flex-col rounded   lg:px-4 md:p-8 drop-shadow-2xl shadow-2xl">
        <UserMenu />
        <div className="bg-white lg:w-screen max-h-screen overflow-scroll  custom-scrollbar rounded-tr-lg rounded-br-lg border drop-shadow-2xl shadow-xl">
          <div
            className="lg:col-span-2  max-h-screen h-screen sm:px-0
           py-5 md:px-6"
          >
            <div className="grid gap-4 md:gap-y-2 text-sm grid-cols-1  md:grid-cols-5 ">
              <p className="sm:text-lg lg:text-2xl px-4 uppercase font-bold sm:mb-0 md:mb-2">
                My Wishlist
              </p>
            </div>
            <div className="flex flex-col  justify-center   align-middle items-center">
              {/* //////////F */}
              <div
                className="flex w-[96%]  justify-center items-center align-middle  border-2 h-1 rounded-xl bg-gray-500 
              
              border-gray-300 sm:mb-2  md:my-3"
              ></div>
              {/* Divider */}
              <div className="px-5 w-full h-full grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 flex-col gap-4 justify-center  align-middle items-center">
                {wishlist.map((product) => (
                  <LikedCard
                    key={product._id}
                    product={product}
                    onRemove={updateWishlist}
                  />
                ))}
                {/* <LikedCard />
                <LikedCard />
                <LikedCard />
                <LikedCard />
                <LikedCard />
                <LikedCard />
                <LikedCard />
                <LikedCard />
                <LikedCard /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
