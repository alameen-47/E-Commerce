import React from "react";
import Layout from "../../../components/Layout/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import { t } from "i18next";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");

  // const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  //form function
  const handleSendOtp = async (e) => {
    e.preventDefault();
    console.log("handleSendOtp called"); // Add this line

    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
      });
    
      if (res && res.data.success) {
        toast.success("OTP has been sent to the Email");
        setStep(2);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(t("alert.Something went wrong!"));
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (res && res.data.success) {
        toast.success("Password Changed Successfully");
        navigate("/signin");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(t("Something went wrong!"));
    }
  };
  return (
    <Layout title={"Forgot-Password - Rawad Mall"}>
      <form onSubmit={step === 1 ? handleSendOtp : handleResetPassword}>
        <div className="forgotpassword-container">
          <div className="forgotpassword-container-content">
            <h4>{t("signin.Reset Password")}</h4>
            <div className="inputs">
              {step === 1 && (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("signin.Enter Your Email")}
                    required
                  />
                  {/* <input
                type="type"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Dream Job?"
                required
              /> */}
                  <button type="submit">{t("signin.SEND OTP")}</button>
                  {/* <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter Your Password"
                required
              /> */}
                </>
              )}
              {step === 2 && (
                <>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder={t("signin.Enter OTP")}
                    required
                  />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t("signin.Enter Your New Password")}
                    required
                  />
                  <button type="submit">{t("signin.Reset Password")}</button>
                </>
              )}
            </div>
            {/* <button type="submit">RESET PASSWORD</button> */}
            <p>
              {t("Don't have an account?")}
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

export default ForgotPassword;
