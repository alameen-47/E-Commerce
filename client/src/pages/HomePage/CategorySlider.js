import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../utilities/api";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const { t, i18n } = useTranslation();

  //translation
  const translateText = async (text, targetLanguage) => {
    const { data } = await axios.post("/api/v1/translate", {
      text,
      targetLanguage,
    });
    return data.translatedText;
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/category/all-category`);
      console.log("Data:", data);
      if (data?.success) {
        const translatedCategories = await Promise.all(
          data.categories.map(async (category) => {
            const translatedName = await translateText(
              category.name,
              i18n.language
            );

            return {
              ...category,
              name: translatedName,
            };
          })
        );
        setCategories(translatedCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  console.log("Categories:", categories);

  return (
    <Carousel
      infinite={true}
      autoPlay={true}
      rewind={true}
      autoPlaySpeed={2000}
      centerPadding="0px"
      responsive={responsive}
      draggable={!isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {categories?.map((ct) => (
        <Link to={`/category/${ct.slug}`}>
          <div className="lg:w-2/12 shadow-2xl">
            <div className="flex flex-wrap relative w-full sm:w-64 sm:h-72  shadow-md  bg-black bg-opacity-50 overflow-hidden bg-blend-darken">
              <div className="h-80 w-full relative">
                <img
                  src={`/api/v1/category/categories-images/${ct._id}`}
                  alt={ct?.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black opacity-40"></div>
              </div>
              <h2 className="absolute bottom-4 left-4  text-white font-semibold lg:text-xl sm:text-lg leading-tight stroke-blacktruncate shadow-xl">
                {ct?.name}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default CategorySlider;
