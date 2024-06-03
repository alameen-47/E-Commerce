import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Signin.css";
import { useAuth } from "../../../context/auth";
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
        toast.success("Signed in Succesfully");
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
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Signin-Rawad Mall"}>
      <form onSubmit={handleSubmit}>
        <div className="Signin-container">
          <div className="Signin-container-content">
            <h1>Sign In</h1>
            <div className="inputs">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
                autoFocus
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                required
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              SIGN IN
            </button>
            <button
              className="forgot-password"
              type="button"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
            <p>
              Don't have an account?
              <Link to="/register">
                <span>Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Signin;
