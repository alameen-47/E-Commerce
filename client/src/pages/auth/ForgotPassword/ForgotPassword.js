import React from "react";
import Layout from "../../../components/Layout/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/signin");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot-Password - Rawad Mall"}>
      <form onSubmit={handleSubmit}>
        <div className="forgotpassword-container">
          <div className="forgotpassword-container-content">
            <h4>Reset Password</h4>
            <div className="inputs">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
              />
              <input
                type="type"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Dream Job?"
                required
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter Your Password"
                required
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              RESET PASSWORD
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

export default ForgotPassword;
