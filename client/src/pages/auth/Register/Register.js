import React, { useState } from "react";
import "./Register.css";
import Layout from "../../../components/Layout/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { API_BASE_URL } from "../../../utilities/api";

const Register = () => {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
  // const [zipCode, setZipCode] = useState("");
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("password");
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, {
        // name,
        email,
        password,
        phone,
        // address,
        // zipCode,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/signin");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(t("common.Something went wrong"));
    }
  };

  return (
    <Layout title={"Register-Rawad Mall"}>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center align-middle py-10 px-6 items-center">
          <div className="Register-container-content ">
            <h1>{t("signin.Sign Up")}</h1>
            <div className="inputs">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("signin.Enter Your Email")}
                required
              />
              <div className="flex flex-row items-center justify-center align-middle relative">
                <input
                  className="pr-10" // Add right padding to create space for the icon
                  type={type}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("signin.Enter Your Password")}
                  required
                />
                {/* Eye Icon */}
                <span
                  onClick={() => {
                    setVisible(!visible);
                    setType(type === "password" ? "string" : "password");
                  }}
                  className="absolute top-[.18rem] right-2  cursor-pointer"
                >
                  {visible ? (
                    <EyeTwoTone twoToneColor="#ffffff" />
                  ) : (
                    <EyeInvisibleOutlined style={{ color: "white" }} />
                  )}
                </span>
              </div>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("signin.Enter Your Phone Number")}
                required
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              {t("signin.SIGN UP")}
            </button>
            <p className="py-1">
              {t("signin.Already have an account?")}
              <Link to="/signin">{t("signin.Sign In")}</Link>
            </p>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
