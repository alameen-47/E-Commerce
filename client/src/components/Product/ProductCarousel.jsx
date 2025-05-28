import React, { useEffect, useRef, useState } from "react";
import { ProductCard1 } from "./ProductCard1";

export const ProductCarousel = ({ products }) => {
  const [visibleProducts, setVisibleProducts] = useState(6); // Initially show 5 products
  const carouselRef = useRef(null); // Reference to the carousel div

  // Function to load more products when the carousel scrolls
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      // Check if user has scrolled to the end of the carousel
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        // Load more products only if there are more to load
        if (visibleProducts < products.length) {
          setVisibleProducts((prev) => Math.min(prev + 5, products.length));
        }
      }
    }
  };
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", handleScroll);
      }
    };
  }, [visibleProducts, products.length]);

  return (
    <div>
      <div
        ref={carouselRef} // Attach ref to track scrolling
        className="bg-white carousel carousel-center rounded-box rounded-t-none max-w-[70rem]  shadow-[0_4px_10px_rgba(0,0,0,0.1)]   p-4 sm:w-96 md:w-full sm:gap-2  md:gap-0 items-center mt-1"
      >
        {/* Use a wrapper div for the carousel items */}

        {products.slice(0, visibleProducts).map((p, index) => (
          <div
            key={index}
            className="carousel-item  sm:1/2 h-auto sm:object-contain md:w-1/5 "
          >
            <ProductCard1 products={p} />
          </div>
        ))}
      </div>
    </div>
  );
};
