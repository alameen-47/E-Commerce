import React from "react";
import Layout from "../../components/Layout/Layout";
import Slideshow from "./Slideshow";
import CategoryListAnimation from "./CategoryListAnimation";
import Furnitures from "./Furnitures";
import CategorySlider from "./CategorySlider";
import Electronics from "./Electronics";
import Footwear from "./Footwear";
import Features from "./Features";

import ProductsList from "./ProductsList";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import OffersTop from "./OFFERS/TOPOFFERS/OffersTop";
import ElecOffers from "./OFFERS/ELECOFFERS/ElecOffers";
import { Link } from "react-router-dom";
import { t } from "i18next";

const HomePage = () => {
  return (
    <Layout title={"RAWAD-MALL-Everything you Need!"}>
      <div
        className="flex justify-center items-center align-middle  min-h-screen
       bg-white w-full overflow-x-hidden "
      >
        <div className=" w-screen max-w-full ">
          <Slideshow className="bg-gradient-to-b from-current to-transparent" />
          <br></br>
          <OffersTop />
          <br></br>
          <CategoryListAnimation />
          <br></br>
          <Electronics />
          <br></br>
          <Furnitures />
          <br></br>
          <CategorySlider />
          <br></br>
          <ProductsList start={0} end={14} />
          <br></br>
          <Footwear />
          <br></br>
          <ElecOffers />
          <br></br>
          <ProductsList start={14} end={28} />
          <p className="  top-2  max-w-max text-white bg-gradient-to-r from-black to-blue-500 px-4 my-3 rounded-md text-lg font-bold shadow-lg uppercase tracking-wide flex items-center m-auto animate-pulse duration-700 mb-1 glow-vibrant">
            <span className="font-semibold">
              <Link to={"/allproducts"}>
                {t("home.Click here to Explore More Products")}
              </Link>
            </span>
          </p>
          <br></br>
          <Features />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
