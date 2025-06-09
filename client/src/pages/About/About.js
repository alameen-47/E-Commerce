import React from "react";
import Layout from "../../components/Layout/Layout";
import { t } from "i18next";
import background from "../../assets/about_bg.png";
import cart from "../../assets/icons/icons8-shopping-cart-48.png";
const About = () => {
  return (
    <Layout title={"About-Us"}>
      <div className="bg-white w-screen h-screen ">
        <div className="absolute right-[10%] lg:top-[30%] md:top-[20%] sm:top-[20%]">
          <div className="contentss">
            <h2 className="lg:text-4xl sm:mb-0 md:mb-3 md:text-3xl font-bold text-xl text-white">
              Welcome to
            </h2>
            <h1 className="lg:text-7xl sm:mb-0 md:mb-3 md:text-6xl  font-extrabold text-3xl text-white">
              Rawad Mall
            </h1>
            <h3 className="text-[#D4D4D4] sm:mb-0 md:mb-3 font-bold lg:text-3xl md:text-2xl text-md">
              Your One-Stop
              <br />
              Destination for
              <br />
              Everything You Need
            </h3>
          </div>
          <div className="sm:mt-2 md:mt-0 shop-now flex flex-row md:p-3 p-1  bg-black rounded-lg justify-center md:gap-3 gap-1 md:w-[50%] w-[80%] cursor-pointer transform active:scale-95 shadow-lg ">
            <button className="text-white md:p-1 md:text-xl sm:text-sm ">
              SHOP NOW
            </button>
            <span className="md:w-1 w-[2%] bg-white rounded-lg  "></span>
            <img className="md:w-[20%] w-[10%]" src={cart} alt="" />
          </div>
        </div>
        <div></div>
        <div className="w-screen h-auto">
          <img src={background} className="md:h-auto  w-screen" alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default About;
