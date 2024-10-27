import React from "react";
import { IoStarSharp } from "react-icons/io5";

export const Coupon = () => {
  return (
    <div>
      <div
        class="bg-black  md:w-[20rem] md:h-32 
      relative flex items-center justify-between "
      >
        {/* <!-- Left Side Crimps --> */}
        <div className="absolute -left-3  flex flex-col gap-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-full sm:h-2 sm:w-4 md:h-3 md:w-5"
            ></div>
          ))}
        </div>

        {/* <!-- Right Side Crimps --> */}
        <div className="absolute -right-3  flex flex-col gap-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-full sm:h-2 sm:w-4 md:h-3 md:w-5"
            ></div>
          ))}
        </div>

        {/* {/* <!-- Main Ticket Content --> */}
        <div class="w-full h-full flex items-center justify-center text-white gap-1 pl-4">
          <div className="flex  flex-row justify-between align-middle bg-red items-center w-full ">
            <IoStarSharp className=" sm:text-xl md:text-5xl sm:mr-1 md:mr-0" />
            <div className="bg-black flex flex-col justify-center align-middle items-center text-center md:gap-1 ">
              <p className=" font-bold uppercase transform   sm:text-[10px] md:text-sm  md:scale-150 sm:mb-0 md:mb-[1rem]">
                GRAB YOUr
              </p>
              <p
                className="sm:text-lg md:text-2xl font-bold font-RoadRage  tracking-wide sm:mb-0 md:mb-[1rem] scale-custom-sm md:scale-custom-md lg:scale-custom-lg"
                // style={{ transform: "scaleY(4) scaleX(2.5)" }}
              >
                55% <span className="text-sm">OFF</span>
              </p>
              <div className="flex flex-row ">
                {Array.from(
                  { length: window.innerWidth < 740 ? 5 : 10 },
                  (_, index) => (
                    <IoStarSharp
                      key={index}
                      className="text-[8px]   md:text-[10px] md:mr-[2px] sm:mt-[4px] md:mt-0"
                    />
                  )
                )}
              </div>
            </div>
            <IoStarSharp className=" sm:text-xl md:text-5xl " />
          </div>
        </div>

        {/* <!-- center Side Crimps --> */}
        <div className="flex  flex-col justify-between  items-center  h-full  ">
          <div
            className="bg-white rounded-full md:-mt-6 sm:-mt-4   sm:h-4 sm:w-4 md:h-9 md:w-9 "
            style={{ clipPath: "inset(50% 0 0 0)" }} // This will clip the right half to create a semicircle
          ></div>

          {/* Dotted line */}
          <div className=" md:h-24 sm:h-[52px] border-l-2 border-dashed border-white"></div>

          <div
            className="bg-white rounded-full md:-mb-6 sm:-mb-4   sm:h-4 sm:w-4 md:h-9 md:w-9 "
            style={{ clipPath: "inset(0 0 50% 0)" }} // This will clip the right half to create a semicircle
          ></div>
        </div>

        {/* rIGHT SIDE TEXT  */}
        <div className=" flex md:text-sm sm:text-[8px]  leading-snug">
          <div className=" flex flex-col items-center font-semibold">
            {Array.from("RUOY MEEDER").map((letter, index) => (
              <span
                key={index}
                className="text-white transform -rotate-90 w-3 sm:h-[0.32rem] md:h-[0.6rem]  flex justify-center items-center leading-snug"
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
        <div className="  flex md:text-xl sm:text-lg  font-bold leading-0 ">
          <div className="md:w-10 sm:w-6 flex  flex-col font-bold items-center ">
            {Array.from("NOPUOC").map((letter, index) => (
              <span
                key={index}
                className="text-white transform md:text-sm sm:text-[8px]  flex justify-between  items-center sm:h-[.6rem] md:h-[1.3rem] "
                style={{
                  transform:
                    window.innerWidth < 640
                      ? "rotate(-90deg) scaleX(1.5) scaleY(3)"
                      : "rotate(-90deg) scaleX(2) scaleY(2.5)",
                }}
                // Combine
                // both
                // rotate
                // and
                // scale
                // here
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
