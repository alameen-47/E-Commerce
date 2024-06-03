import React from "react";
import f1 from "./Features/medal-.gif";
import f2 from "./Features/sales.gif";
import f3 from "./Features/best-choice.gif";
import f4 from "./Features/24-hours-support.gif";

const Features = () => {
  return (
    <>
      <div className="lg:px-36 sm:px-16 flex flex-col justify-center  h-auto lg:mt-20 sm:mt-28">
        <div>
          <h2 className=" lg:text-sm font-bold text-gray-800 mb-5 flex gap-2 items-center text-sm ">
            <div className="bg-black  h-[0.1rem] sm:w-12 xl:lg:w-20"></div>
            IF YOU WONDER
          </h2>
          <h1 className="lg:text-3xl font-semibold leading-tight tracking-tight md:w-[37.25rem] dark:text-black sm:text-xl text-pretty">
            Why Choose Us
          </h1>
        </div>
        <div>
          <ul
            className=" lg:p-4 grid  grid-cols-1 md:grid-cols-4 gap-x-4 sm:gap-x-8 sm:gap-y-1
                lg:my-16 items-center
                justify-items-start bg-white rounded-md shadow-lg sm:px-6 "
          >
            <li>
              <img src={f1} alt="f1" className=" lg:h-24 sm:h-16" />
              <h2 className="font-bold lg:text-xl sm:text-lg">
                Verified Products
              </h2>
              <p className="leading-7 sm:text-sm lg:text-base pt-2">
                "Elevate your confidence with our verified products, Quality
                assurance you can rely on."
              </p>
            </li>
            <li>
              <img src={f2} alt="f1" className=" lg:h-24 sm:h-16" />
              <h2 className="font-bold lg:text-xl sm:text-lg">Best Value</h2>
              <p className="leading-7 sm:text-sm lg:text-base pt-2">
                "Unlock unbeatable value with our best price guarantee, Shop
                smart, save big, and indulge guilt-free."
              </p>
            </li>
            <li>
              <img src={f3} alt="f1" className=" lg:h-24 sm:h-16" />
              <h2 className="font-bold lg:text-xl sm:text-lg">Top pick</h2>
              <p className="leading-7 sm:text-sm lg:text-base pt-2">
                "Embrace excellence, make the best choice today, Elevate your
                selection, redefine your way."
              </p>
            </li>
            <li>
              <img src={f4} alt="f1" className=" lg:h-24 sm:h-16" />
              <h2 className="font-bold lg:text-xl sm:text-lg">24/7 Support</h2>
              <p className="leading-7 sm:text-sm lg:text-base pt-2">
                "Always here, day or night, for your needs, Expert assistance,
                whenever you seek."
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Features;
