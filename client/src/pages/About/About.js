import React from "react";
import Layout from "../../components/Layout/Layout";
import { t } from "i18next";
import background from "../../assets/about_bg.png";
import cart from "../../assets/icons/icons8-shopping-cart-48.png";
import truck from "../../assets/icons/delivery_truck.png";
import secure from "../../assets/icons/secure_data.png";
import support from "../../assets/icons/customer_support.png";
const About = () => {
  return (
    <Layout title={"About-Us"}>
      <div className="bg-white w-screen ">
        <div className="FIRST">
          <div className="absolute flex flex-col justify-center align-middle  right-[10%] lg:top-[20%] sm:mt-3 md:mt-0 xl:top-[30%] ">
            <div className="contentss flex flex-col justify-center align-middle ">
              <h2 className="xl:text-4xl mb-0 lg:mb-0 xl:mb-3 lg:text-3xl md:text-2xl font-bold text-sm text-white">
                Welcome to
              </h2>
              <h1 className="xl:text-7xl mb-0 lg:mb-0 xl:mb-3 lg:text-6xl md:text-5xl font-extrabold text-lg text-white">
                Rawad Mall
              </h1>
              <h3 className="text-[#D4D4D4] mb-0 lg:mb-0 xl:mb-3 font-bold xl:text-3xl md:text-2xl  lg:text-2xl ">
                Your One-Stop
                <br />
                Destination for
                <br />
                Everything You Need
              </h3>
            </div>
            <div className="sm:mt-2 md:mt-0 shop-now flex flex-row xl:p-3 p-1  bg-black rounded-lg justify-center  gap-1 lg:w-[50%] w-[80%] cursor-pointer transform active:scale-95 shadow-lg ">
              <button className="text-white lg:p-1 lg:text-xl sm:text-sm ">
                SHOP NOW
              </button>
              <span className="lg:w-1 w-[2%] bg-white rounded-lg  "></span>
              <img className="lg:w-[20%] w-[10%]" src={cart} alt="" />
            </div>
          </div>
          <div></div>
          <div className="w-screen h-auto">
            <img src={background} className="md:h-auto  w-screen" alt="" />
          </div>
        </div>
        <div className="SECOND p-3 bg-white flex justify-center align-middle items-center ">
          <div className=" flex md:flex-row ">
            <img className="w-[50%] " src={truck} alt="" />
            <div className=" flex flex-col justify-center align-middle ">
              <h1 className="font-extrabold lg:text-4xl">
                Get it Sooner,Not Later !!!
              </h1>
              <h2 className="lg:text-2xl font-semibold text-[#888888]">
                Your order delivered at <br /> record speed—right to your <br />
                doorstep.
              </h2>
            </div>
          </div>
        </div>
        <div className="THIRD p-3 bg-black flex justify-center align-middle items-center ">
          <div className=" flex flex-row justify-center align-middle">
            <div className=" flex flex-col  justify-center align-middle ">
              <h1 className="font-extrabold text-white lg:text-4xl">
                Secure & Private
              </h1>
              <h2 className="lg:text-2xl font-semibold text-[#888888]">
                We keep your personal <br /> information safe and <br />
                confidential—always.
              </h2>
            </div>
            <img className="w-[50%] " src={secure} alt="" />
          </div>
        </div>
        <div className="FOURTH p-3 bg-white flex justify-center align-middle items-center ">
          <div className=" flex flex-row">
            <img className="w-[50%] " src={support} alt="" />
            <div className=" flex flex-col justify-center align-middle ">
              <h1 className="font-extrabold lg:text-4xl">
                24/7 Customer Support
              </h1>
              <h2 className="lg:text-2xl font-semibold text-[#888888]">
                Because great service <br />
                makes all the
                <br /> difference.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
