import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useCategory from "../../../hooks/useCategory";

const CategoryListSlider = ({ direction = "left" }) => {
  const carouselRef = useRef(null);
  const categories = useCategory();
  console.log(categories);
  useEffect(() => {
    const carousel = carouselRef.current;
    let animation;

    const startAnimation = () => {
      const transformValues =
        direction === "left"
          ? [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }]
          : [{ transform: "translateX(0)" }, { transform: "translateX(5%)" }];

      animation = carousel.animate(transformValues, {
        duration: 45000,
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
          ?.concat(categories)
          .concat(categories)
          .concat(categories)
          .concat(categories)
          .map((ct, index) => (
            <Link to={`/category/${ct.slug}`}>
              <div
                key={index}
                className="inline-block px-1 mx-1 bg-transparent text-center  text-xs "
              >
                <Link key={ct.slug} to={`/category/${ct.slug}`}>
                  <h1 className=" hover:text-gray-100 font-semibold">
                    {ct?.name}
                  </h1>
                </Link>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategoryListSlider;
