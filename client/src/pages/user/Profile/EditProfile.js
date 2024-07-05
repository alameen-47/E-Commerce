import React, { useState, useEffect } from "react";
// import "./Profile.css";
import Layout from "../../../components/Layout/Layout";
import UserMenu from "../../../components/Layout/UserMenu/UserMenu";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { t } from "i18next";
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  //get user data
  useEffect(() => {
    const { email, name, phone, address, zipCode } = auth?.user;
    setEmail(email);
    setName(name);
    setPhone(phone);
    setAddress(address);
    setZipCode(zipCode);
  }, [auth?.user]);

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/update-profile", {
        name,
        email,
        password,
        address,
        phone,
        zipCode,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Your profile has been updated successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div class="bg-slate-200 flex  lg:flex-row sm:flex-col rounded shadow-lg  px-4 md:p-8 mb-6">
        <UserMenu />
        <div class="bg-slate-200 lg:w-screen shadow rounded-tr-lg rounded-br-lg border">
          <div class="lg:col-span-2 px-4 py-5 sm:px-6">
            <form onSubmit={handleSubmit}>
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <p className="sm:text-lg lg:text-2xl">
                  {t("account.Update Personal Details.")}
                </p>
                <div class="md:col-span-5">
                  <label for="full_name">{t("account.Full name")}</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="full_name"
                    id="full_name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder={t("account.Enter Your Full Name")}
                  />
                </div>
                <div class="md:col-span-5">
                  <label for="email">{t("account.Email address")}</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    name="email"
                    id="email"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="email@domain.com"
                    disabled
                  />
                </div>
                <div class="md:col-span-3">
                  <label for="password">{t("account.Password")}</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder={t("account.Enter your New password")}
                  />
                </div>
                <div class="md:col-span-3">
                  <label for="address">{t("account.Full Address")}</label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    name="address"
                    id="address"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder={t("account.Enter your address")}
                  />
                </div>
                <div class="md:col-span-3">
                  <label for="address">{t("account.Full Address")}</label>
                  <input
                    value={address}
                    onChange={(e) => setZipCode(e.target.value)}
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder={t("account.Enter your Zip Code ")}
                  />
                </div>
                <div class="md:col-span-3">
                  <label for="address">{t("account.Phone")}</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    name="phone"
                    id="phone"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder={t("account.Enter Your Phone Number")}
                  />
                </div>
                <div class="md:col-span-5 text-right">
                  <div class="inline-flex items-end">
                    <button
                      type="submit"
                      class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                    >
                      {t("account.Update")}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
