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
  //get user data
  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone } = auth?.user;
      setEmail(email);
      setName(name);
      setPhone(phone);
    }
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
        phone,
      });
      if (!password) {
        toast.error("Password is required!!! ");
      }
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
        <div className="bg-white lg:w-screen max-h-screen    rounded-tr-lg rounded-br-lg border drop-shadow-2xl shadow-xl">
          <div
            className="lg:col-span-2  max-h-screen h-screen sm:px-2
           py-5 md:px-6"
          >
            <form onSubmit={handleSubmit}>
              <div className=" grid  gap-4 md:gap-y-2 text-sm grid-cols-1  md:grid-cols-5 ">
                <p className="sm:text-lg lg:text-2xl  uppercase font-bold sm:mb-0 md:mb-2">
                  Profile details
                </p>
              </div>
              <div className="flex w-[96%]  justify-center items-center align-middle  border-2 h-1 rounded-xl bg-gray-500 border-gray-300 sm:mb-2 md:my-3"></div>
              {/* Divider */}
              <div className="flex flex-col gap-3 ">
                <div class="md:col-span-5 font-semibold sm:text-sm md:text-md ">
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
                <div class="md:col-span-5 sm:text-sm  md:text-md font-semibold">
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
                <div class="md:col-span-3 font-semibold sm:text-sm  md:text-md">
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

                <div class="md:col-span-3 font-semibold sm:text-sm  md:text-md">
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
              </div>

              <div class="md:col-span-5 font-semibold text-right mt-3">
                <div class="inline-flex items-end">
                  <button
                    type="submit"
                    class="bg-black hover:bg-gray-800 text-white md:font-semibold sm:font-medium
                         sm:py-1 sm:px-2 md:py-2 md:px-4 rounded"
                  >
                    Update Details
                  </button>
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
