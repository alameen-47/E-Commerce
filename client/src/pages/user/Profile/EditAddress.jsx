import React from "react";
import Layout from "../../../components/Layout/Layout";
import { UserMenu } from "../../../components/Layout/UserMenu";
import { t } from "i18next";

export const EditAddress = () => {
  return (
    <div>
      <Layout title={"Your Profile"}>
        <div className="bg-white md:hidden lg:flex sm:block flex h-screen max-h-screen   lg:flex-row sm:flex-col rounded   lg:px-4 md:p-8 drop-shadow-2xl shadow-2xl">
          <UserMenu />
          <div className="bg-white lg:w-screen max-h-screen   custom-scrollbar rounded-tr-lg rounded-br-lg border drop-shadow-2xl shadow-xl">
            <div className="lg:col-span-2  max-h-screen h-screen px-4 py-5 sm:px-6">
              <form onSubmit={""}>
                <div className=" grid  gap-4 md:gap-y-2 text-sm grid-cols-1  md:grid-cols-5 ">
                  <p className="sm:text-lg lg:text-2xl  uppercase font-bold sm:mb-0 md:mb-2">
                    Edit Address
                  </p>
                </div>
                <div className="flex w-[96%]  justify-center items-center align-middle  border-2 h-1 rounded-xl bg-gray-500 border-gray-300 sm:mb-2 md:my-3"></div>
                {/* Divider */}
                <div className="flex flex-col gap-3 ">
                  <div class="md:col-span-5 font-semibold sm:text-sm md:text-md ">
                    <label for="full_name">Street :</label>
                    <input
                      value={""}
                      onChange={"(e) => setName(e.target.value)"}
                      type="text"
                      name="full_name"
                      id="full_name"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-300/70 font-medium"
                      placeholder={t("account.Enter Your Name")}
                    />
                  </div>
                  <div class="md:col-span-5 font-semibold sm:text-sm md:text-md ">
                    <label for="email">City :</label>
                    <input
                      value={""}
                      onChange={"(e) => setEmail(e.target.value)"}
                      type="text"
                      name="email"
                      id="email"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-300/70 font-medium"
                      placeholder="email@domain.com"
                      disabled
                    />
                  </div>
                  <div class="md:col-span-5 font-semibold sm:text-sm md:text-md ">
                    <label for="password">Province :</label>
                    <input
                      value={""}
                      onChange={"(e) => setPassword(e.target.value)"}
                      type="password"
                      name="password"
                      id="password"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-300/70 font-medium"
                      placeholder={t("account.Enter your New password")}
                    />
                  </div>

                  <div class="md:col-span-5 font-semibold sm:text-sm md:text-md ">
                    <label for="address">Postal / ZIP code :</label>
                    <input
                      value={""}
                      onChange={"(e) => setPhone(e.target.value)"}
                      type="text"
                      name="phone"
                      id="phone"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-300/70 font-medium"
                      placeholder={t("account.Enter Your Phone Number")}
                    />
                  </div>
                  <div class="md:col-span-5 font-semibold text-right">
                    <div class="inline-flex items-end">
                      <button
                        type="submit"
                        class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                      >
                        Update Address
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
