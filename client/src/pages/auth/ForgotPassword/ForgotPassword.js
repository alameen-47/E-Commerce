import React from "react";
import Layout from "../../../components/Layout/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import { t } from "i18next";
import { Flex, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("password");
  // const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  //form function
  const handleSendOtp = async (e) => {
    e.preventDefault();
    console.log("handleSendOtp called");

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
        toast.error(
          res.data.message || "Failed to reset password. Please try again."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  const handleChange = (e) => {
    console.log(e, "OTPPPPPPP======================");
    if (e !== undefined) {
      // Optional chaining and checking if value is defined
      setOtp(e); // Ensure e.target is not undefined
    }
  };
  return (
    <Layout title={"Forgot-Password - Rawad Mall"}>
      <form onSubmit={step === 1 ? handleSendOtp : handleResetPassword}>
        <div className="forgotpassword-container">
          <div className="forgotpassword-container-content ">
            <h4>{t("signin.Reset Password")}</h4>
            <div className=" flex flex-col justify-center items-center align-middle gap-5 bg-black">
              {step === 1 && (
                <>
                  <input
                    className="border-b text-sm pl-1 py-1 bg-black text-white w-[100%]"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("signin.Enter Your Email")}
                    required
                  />

                  <button type="submit">{t("signin.SEND OTP")}</button>
                </>
              )}
              {step === 2 && (
                <>
                  <label
                    htmlFor="otp"
                    className="text-sm font-medium text-gray-400 mb-1"
                  >
                    {t("signin.Enter OTP")}
                  </label>
                  <Input.OTP
                    className="bg-black text-white w-10 !h-10 !mx-1 !text-center !border !border-gray-300 !rounded-md !focus:outline-none !focus:border-blue-500 col-span-1 p-0"
                    length={6}
                    type="text"
                    value={otp}
                    onChange={handleChange}
                    placeholder={t("signin.Enter OTP")}
                    required
                  />

                  <div className="flex flex-row items-center justify-center align-middle relative bg-black w-[100%]">
                    <input
                      className="border-b text-sm pl-1 py-1 w-full bg-black text-white"
                      type={type}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
