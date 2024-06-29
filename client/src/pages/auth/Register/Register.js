import React, { useState } from "react";
import "./Register.css";
import Layout from "../../../components/Layout/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        // answer,
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
        <div className="Register-container">
          <div className="Register-container-content">
            <h1>{t("signin.Sign Up")}</h1>
            <div className="inputs">
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("signin.Enter Your Name")}
                autoFocus
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("signin.Enter Your Email")}
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("signin.Enter Your Password")}
                required
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("signin.Enter Your Phone Number")}
                required
              />
              <input
                type="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t("signin.Enter Your Address")}
                required
              />
              {/* <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="What is your Dream job?"
                required
              /> */}
            </div>
            <button type="submit" onClick={handleSubmit}>
              {t("signin.SIGN UP")}
            </button>
            <p>
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
