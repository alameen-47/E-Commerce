import React from "react";
import { ProductCard1 } from "./Product/ProductCard1";

export const ProductCarousel = ({ products }) => {
  return (
    <div>
      {" "}
      <div className="bg-white carousel carousel-center rounded-box max-w-[70rem] drop-shadow-2xl p-4 sm:w-96 md:w-full sm:gap-2  md:gap-0 items-center">
        {/* Use a wrapper div for the carousel items */}

        {products.map((p, index) => (
          <div key={index} className="carousel-item  sm:1/2 md:w-1/5 ">
            <ProductCard1 products={p} />
          </div>
        ))}
      </div>
    </div>
  );
};
