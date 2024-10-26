import React, { useState, useEffect } from "react";
// import "./Profile.css";
import Layout from "../../../components/Layout/Layout";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { t } from "i18next";
import { UserMenu } from "../../../components/Layout/UserMenu";
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
    // setAddress(address);
    // setZipCode(zipCode);
  }, [auth?.user]);

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if password is provided
    if (!password) {
      toast.error("Please enter your password to save changes.");
      return;
    }
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
      <div className="bg-white md:hidden lg:flex sm:block flex h-screen max-h-screen   lg:flex-row sm:flex-col rounded   lg:px-4 md:p-8 drop-shadow-2xl shadow-2xl">
        <UserMenu />
        <div className="bg-white lg:w-screen max-h-screen overflow-scroll  custom-scrollbar rounded-tr-lg rounded-br-lg border drop-shadow-2xl shadow-xl">
          <div className="lg:col-span-2  max-h-screen h-screen md:px-4 py-5 sm:px-6">
            <form onSubmit={handleSubmit}>
              <div className="  grid gap-4 md:gap-y-2 text-sm grid-cols-1  md:grid-cols-5 ">
                <p className="sm:text-lg lg:text-2xl px-4 uppercase font-bold sm:mb-0 md:mb-2">
                  Profile details
                </p>
                <div class="md:col-span-5 font-semibold">
                  <label for="full_name">Name :</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="full_name"
                    id="full_name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-300/70 font-medium"
                    placeholder={t("account.Enter Your Name")}
                  />
                </div>
                <div class="md:col-span-5 font-semibold">
                  <label for="email">{t("account.Email address")} :</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    name="email"
                    id="email"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-300/70 font-medium"
                    placeholder="email@domain.com"
                    disabled
                  />
                </div>
                <div class="md:col-span-3 font-semibold">
                  <label for="password">{t("account.Password")} :</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-300/70 font-medium"
                    placeholder={t("account.Enter your New password")}
                  />
                </div>
                {/* <div class="md:col-span-3 font-semibold">
                  <label for="address">{t("account.Full Address")}</label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    name="address"
                    id="address"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-300/70 font-medium"
                    placeholder={t("account.Enter your address")}
                  />
                </div>
                <div class="md:col-span-3 font-semibold">
                  <label for="address">{t("account.Full Address")}</label>
                  <input
                    value={address}
                    onChange={(e) => setZipCode(e.target.value)}
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-300/70 font-medium"
                    placeholder={t("account.Enter your Zip Code ")}
                  />
                </div> */}
                <div class="md:col-span-3 font-semibold">
                  <label for="address">{t("account.Phone")} :</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                      Update Details
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
