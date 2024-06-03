import React, { useEffect, useRef } from "react";
import useCategory from "../../hooks/useCategory";
import { Link } from "react-router-dom";

const Carousel = ({ direction = "left" }) => {
  const carouselRef = useRef(null);
  const categories = useCategory();

  useEffect(() => {
    const carousel = carouselRef.current;
    let animation;

    const startAnimation = () => {
      const transformValues =
        direction === "left"
          ? [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }]
          : [{ transform: "translateX(0)" }, { transform: "translateX(5%)" }];

      animation = carousel.animate(transformValues, {
        duration: 25000,
        iterations: Infinity,
        easing: "linear",
      });
    };

    startAnimation();

    const handleMouseEnter = () => {
      animation.pause();
    };

    const handleMouseLeave = () => {
      animation.play();
    };

    carousel.addEventListener("mouseenter", handleMouseEnter);
    carousel.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      carousel.removeEventListener("mouseenter", handleMouseEnter);
      carousel.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="overflow-hidden relative w-full">
      <div ref={carouselRef} className="flex whitespace-nowrap">
        {categories
          .concat(categories)
          .concat(categories)
          .concat(categories)
          .concat(categories)
          .map((ct, index) => (
            <Link to={`/category/${ct.slug}`}>
              <div
                key={index}
                className="inline-block p-1 mx-1 bg-transparent text-center   w-28 h-28 text-xs "
              >
                <img
                  src={`/api/v1/category/categories-images/${ct._id}`}
                  alt={ct?.name}
                  className="w-28 h-28 object-cover mask mask-squircle"
                />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Carousel;
