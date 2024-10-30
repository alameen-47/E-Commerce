import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { UserMenu } from "../../../components/Layout/UserMenu";
import { t } from "i18next";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";

export const EditAddress = () => {
  const [auth, setAuth] = useAuth();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");

  //get user data
  useEffect(() => {
    if (auth?.user?.address) {
      const { street, city, province, zipCode } = auth?.user.address;
      setStreet(street);
      setCity(city);
      setProvince(province);
      setZipCode(zipCode);
    }
  }, [auth?.user]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("/api/v1/auth/update-address", {
        street,
        city,
        province,
        zipCode,
      });
      setAuth(data);
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      ls.user = data.updatedAddress;
      localStorage.setItem("auth", JSON.stringify(ls));
      toast.success("Your Address has been updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Layout title={"Your Profile"}>
        <div className="bg-white md:hidden lg:flex sm:block flex h-screen max-h-screen   lg:flex-row sm:flex-col rounded   lg:px-4 md:p-8 drop-shadow-2xl shadow-2xl">
          <UserMenu />
          <div className="bg-white lg:w-screen max-h-screen    rounded-tr-lg rounded-br-lg border drop-shadow-2xl shadow-xl">
            <div
              className="lg:col-span-2  max-h-screen h-screen sm:px-2
           py-5 md:px-6"
            >
              <form onSubmit={handleSubmit}>
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
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      type="text"
                      name="street"
                      id="street"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-300/70 font-medium"
                      placeholder={t("account.Enter Your Street")}
                    />
                  </div>
                  <div class="md:col-span-5 font-semibold sm:text-sm md:text-md ">
                    <label for="email">City :</label>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      name="city"
                      id="city"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-300/70 font-medium"
                      placeholder="Enter Your City"
                    />
                  </div>
                  <div class="md:col-span-5 font-semibold sm:text-sm md:text-md ">
                    <label for="password">Province :</label>
                    <input
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      type="text"
                      name="province"
                      id="province"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-300/70 font-medium"
                      placeholder={t("account.Enter your Province")}
                    />
                  </div>

                  <div class="md:col-span-5 font-semibold sm:text-sm md:text-md ">
                    <label for="address">Postal / ZIP code :</label>
                    <input
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      type="text"
                      name="zipCode"
                      id="zipCode"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-300/70 font-medium"
                      placeholder={t("account.Enter Your zipCode")}
                    />
                  </div>
                  <div class="md:col-span-5  text-right">
                    <div class="inline-flex items-end">
                      <button
                        type="submit"
                        class="bg-black hover:bg-gray-800 text-white md:font-semibold sm:font-medium
                         sm:py-1 sm:px-2 md:py-2 md:px-4 rounded"
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
