import React, { useState } from "react";

export const ImageCarousel = ({ image }) => {
  return (
    <div className="carousel rounded-box w-64 bg-gray-100 overflow-y-hidden flex align-middle items-center max-w-40 h-fit">
      {image?.map((img, index) => (
        <div
          key={index}
          className="carousel-item flex flex-col h-64 overflow-hidden bg-white max-h-40 max-w-40 cursor-pointer"
        >
          <img
            src={`data:${img.contentType};base64,${img.data}`}
            alt=""
            className="px-2 object-contain transition-transform flex justify-center align-middle items-center duration-300 ease-in-out hover:scale-110 h-64 w-64 max-h-40 max-w-40"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};
