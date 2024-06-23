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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFootwear();
  }, []);

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
          <div className=" lg:h-60 lg:w-[35rem] sm:w-[18rem] sm:h-24 flex  sm:justify-center sm:align-bottom sm:m-auto  ">
            <div className="shadow-2xl carousel rounded-b-lg">
              {gentsFootwear.map((p) => (
                <div key={p._id} className="carousel-item">
                  <img
                    onClick={() => navigate(`/product/${p.slug}`)}
                    src={`/api/v1/product/product-image/${p._id}`}
                    alt="footwear"
                    className="object-fit"
                  />
                </div>
              ))}
              {ladiesFootwear.map((p) => (
                <div key={p._id} className="carousel-item">
                  <img
                    onClick={() => navigate(`/product/${p.slug}`)}
                    src={`/api/v1/product/product-image/${p._id}`}
                    alt="footwear"
                    className="object-fit"
                  />
                </div>
              ))}
              {kidsFootwear.map((p) => (
                <div key={p._id} className="carousel-item">
                  <img
                    onClick={() => navigate(`/product/${p.slug}`)}
                    src={`/api/v1/product/product-image/${p._id}`}
                    alt="footwear"
                    className="object-fit"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footwear;
