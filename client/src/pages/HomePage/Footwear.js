import React, { useEffect, useState } from "react";
import fimage from "./posters/Screenshot 2024-02-15 164700.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

const Footwear = () => {
  const [gentsFootwear, setGentsFootwear] = useState([]);
  const [ladiesFootwear, setLadiesFootwear] = useState([]);
  const [kidsFootwear, setKidsFootwear] = useState([]);
  const navigate = useNavigate();

  const fetchFootwear = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/footwear");
      console.log(data);
      if (data.success) {
        setGentsFootwear(data.gentsFootwear);
        setLadiesFootwear(data.ladiesFootwear);
        setKidsFootwear(data.kidsFootwear);
      }
    } catch (error) {
      console.log("Error fetching footwear:", error);
    }
  };

  useEffect(() => {
    fetchFootwear();
  }, []);

  const renderCarouselItems = (footwearArray) => {
    return footwearArray.map((product) => (
      <div key={product._id} className="carousel-item">
        {product.image &&
          product.image.length > 0 &&
          product.image[0] &&
          product.image.map((img, index) => (
            <img
              onClick={() => navigate(`/product/${product.slug}`)}
              key={index}
              src={`data:${img.contentType};base64,${img.data}`}
              alt={`${product.category.name} footwear`}
              className="object-fit"
            />
          ))}
      </div>
    ));
  };

  return (
    <div className="px-8 flex align-middle items-center justify-center">
      <div className="flex rounded-2xl md:flex-row-reverse sm:flex-col lg:items-center bg-slate-300">
        <img
          src={fimage}
          alt="footwear"
          className="opacity-80 lg:w-3/5 lg:h-1/3"
        />
        <div className="mx-3 lg:relative lg:mt-0  sm:absolute sm:mt-20 sm:ml-7 ">
          <div className="text-center  flex justify-center align-middle items-center font-semibold bg-indigo-400 lg:md:h-11 rounded-t-lg lg:md:text-xl bg-gradient-to-r from-teal-400 to-purple-800 sm:h-7 sm:text-xs sm:w-[18rem] lg:md:w-auto">
            {t("home.BEST QUALITY AND BEST PRICES ON EVERY PAIR")}
          </div>
          {/* Carousel starts */}
          <div className="carousel shadow-2xl rounded-b-lg lg:h-60 lg:w-[35rem] sm:w-[18rem] sm:h-24">
            {gentsFootwear.length > 0 && renderCarouselItems(gentsFootwear)}
            {ladiesFootwear.length > 0 && renderCarouselItems(ladiesFootwear)}
            {kidsFootwear.length > 0 && renderCarouselItems(kidsFootwear)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footwear;
