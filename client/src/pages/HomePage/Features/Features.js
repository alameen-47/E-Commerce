import React from "react";


const Features = () => {
  return (
    <>
      <div className="flex flex-col">
        <div>
          <h2 className=" lg:text-sm font-bold text-gray-800 mb-5 sm:text-sm flex gap-2 items-center ">
            <div className="bg-black  h-[0.1rem] w-16"></div>
            IF YOU WONDER
          </h2>
          <h1
            className="
        lg:text-4xl md:text-3xl text-2xl font-semibold leading-none tracking-tight m:text-3xl capitalize w-2/3"
          >
            Why Choose Us
          </h1>
        </div>
        <div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-
            x-4 sm:gap-x-8 sm:gap-y-1
                my-16">
                    <li>
                      <img src="" alt=""/>
                      <h2></h2>
                      <p></p>
                    </li>
                </ul>
        </div>
      </div>
    </>
  );
};

export default Features;
