import React from "react";
import { IoStarSharp } from "react-icons/io5";

export const Coupon = () => {
  return (
    <div>
      <div
        class="bg-black  md:w-[20rem] h-32 
      relative flex items-center justify-between "
      >
        {/* <!-- Left Side Crimps --> */}
        <div className="absolute -left-3  flex flex-col gap-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-full h-3 w-5"></div>
          ))}
        </div>

        {/* <!-- Right Side Crimps --> */}
        <div className="absolute -right-3  flex flex-col gap-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-full h-3 w-5"></div>
          ))}
        </div>

        {/* {/* <!-- Main Ticket Content --> */}
        <div class="w-full h-full flex items-center justify-center text-white  pl-4">
          <div className="flex  flex-row justify-between align-middle bg-red items-center w-full  ">
            <IoStarSharp style={{ fontSize: "44px" }} />
            <div className="bg-black flex flex-col justify-center align-middle items-center text-center">
              <p
                className=" font-bold uppercase"
                style={{ transform: "scaleX(1.5) scaleY(1.5)" }}
              >
                GRAB YOUr
              </p>
              <p
                className="text-2xl font-bold font-RoadRage  tracking-wide"
                style={{ transform: "scaleY(4) scaleX(2.5)" }}
              >
                55% <span className="text-sm">OFF</span>
              </p>
              <div className="flex flex-row">
                {Array.from({ length: 10 }, (_, index) => (
                  <IoStarSharp
                    key={index}
                    style={{ fontSize: "10px", marginRight: "2px" }}
                  />
                ))}
              </div>
            </div>
            <IoStarSharp style={{ fontSize: "44px" }} />
          </div>
        </div>

        {/* <!-- center Side Crimps --> */}
        <div className="flex  flex-col justify-between  items-center  h-full">
          <div
            className="bg-white rounded-full -mt-5  h-9 w-9 "
            style={{ clipPath: "inset(50% 0 0 0)" }} // This will clip the right half to create a semicircle
          ></div>

          {/* Dotted line */}
          <div className=" h-24 border-l-2 border-dashed border-white"></div>

          <div
            className="bg-white rounded-full -mb-5 h-9 w-9 "
            style={{ clipPath: "inset(0 0 50% 0)" }} // This will clip the right half to create a semicircle
          ></div>
        </div>

        {/* rIGHT SIDE TEXT  */}
        <div className=" flex text-sm leading-0">
          <div className=" flex flex-col items-center font-semibold">
            {Array.from("RUOY MEEDER").map((letter, index) => (
              <span
                key={index}
                className="text-white transform -rotate-90 w-3 h-[0.6rem]  flex justify-center items-center"
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
        <div className="  flex text-xl  font-bold leading-0 ">
          <div className="w-10 flex flex-col font-bold items-center ">
            {Array.from("NOPUOC").map((letter, index) => (
              <span
                key={index}
                className="text-white transform -rotate-90   flex justify-between  items-center h-[1.3rem] "
                style={{ transform: "rotate(-90deg) scaleX(1.5) " }} // Combine both rotate and scale here
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
