import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Signin.css";
import { useAuth } from "../../../context/auth";
import { t } from "i18next";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/signin", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        toast.success(`${t("signin.Signed in Succesfully")}`);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${t("alert.Something went wrong!")}`);
    }
  };
  return (
    <Layout title={"Signin-Rawad Mall"}>
      <form onSubmit={handleSubmit}>
        <div className="Signin-containe flex justify-center align-middle py-10 px-6">
          <div className="Signin-container-content">
            <h1>{t("signin.SIGN IN")}</h1>
            <div className="inputs">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("signin.Enter Your Email")}
                required
                autoFocus
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("signin.Enter Your Password")}
                required
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              {t("signin.SIGN IN")}
            </button>
            <button
              className="forgot-password"
              type="button"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              {t("signin.Forgot Password")}
            </button>
            <p>
              {t("signin.Don't have an account?")}
              <Link to="/register">
                <span>{t("signin.Sign Up")}</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Signin;
