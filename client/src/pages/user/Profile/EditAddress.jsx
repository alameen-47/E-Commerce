import React from "react";
import Layout from "../../../components/Layout/Layout";
import { UserMenu } from "../../../components/Layout/UserMenu";
import { t } from "i18next";

export const EditAddress = () => {
  return (
    <div>
      <Layout title={"Your Profile"}>
        <div class="bg-white flex  lg:flex-row sm:flex-col rounded   px-4 md:p-8 drop-shadow-2xl shadow-2xl">
          <UserMenu />
          <div class="bg-white lg:w-screen  rounded-tr-lg rounded-br-lg border drop-shadow-2xl shadow-xl">
            <div class="lg:col-span-2 px-4 py-5 sm:px-6">
              <form onSubmit={""}>
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <p className="sm:text-lg lg:text-2xl font-bold uppercase">
                    Edit address
                  </p>
                  <div class="md:col-span-5 font-semibold">
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
                  <div class="md:col-span-5 font-semibold">
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
                  <div class="md:col-span-3 font-semibold">
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

                  <div class="md:col-span-3 font-semibold">
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
