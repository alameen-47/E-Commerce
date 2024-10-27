import React from "react";
import { UserMenu } from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { Coupon } from "../../components/Coupon";

export const MyCoupons = () => {
  return (
    <Layout title={"Your Orders"}>
      <div>
        <div className="bg-white md:hidden lg:flex sm:block flex h-screen max-h-screen   lg:flex-row sm:flex-col rounded   lg:px-4 md:p-8 drop-shadow-2xl shadow-2xl">
          <UserMenu />
          <div className="bg-white lg:w-screen max-h-screen overflow-scroll  custom-scrollbar rounded-tr-lg rounded-br-lg border drop-shadow-2xl shadow-xl">
            <div className="lg:col-span-2  max-h-screen h-screen px-4 py-5 sm:px-6">
              <div className="grid gap-4 md:gap-y-2 text-sm grid-cols-1  md:grid-cols-5 ">
                <p className="sm:text-lg lg:text-2xl px-4 uppercase font-bold sm:mb-0 md:mb-2">
                  MY coupons
                </p>
              </div>
              <div className="flex flex-col  justify-center   align-middle items-center">
                <div className="flex w-[96%]  justify-center items-center align-middle  border-2 h-1 rounded-xl bg-gray-500 border-gray-300 sm:mb-2 md:my-3"></div>
                {/* Divider */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-9 ">
                  <Coupon />
                  <Coupon />
                  <Coupon />
                  <Coupon />
                  <Coupon />
                  <Coupon />
                  <Coupon />
                  <Coupon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
