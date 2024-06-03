import React from "react";
import OfferBanner1 from "./1OfferBanner";
import OfferBanner2 from "./2OfferBanner";
import OfferBanner from "./OfferBanner";
import OfferBanner4 from "./4OfferBanner";
import OfferBanner5 from "./5OfferBanner";

const OffersTop = () => {
  return (
    <div class=" offerzone grid lg:grid-cols-9 lg:grid-rows-4 lg:gap-4 px-3 sm:grid-cols-4  sm:gap-1">
      <div class="  lg:col-span-2 lg:row-span-4 h-200 w-200  sm:row-start-1 sm:row-span-2 sm:col-span-2">
        <OfferBanner1 />
      </div>
      <div class="  lg:col-span-2 lg:row-span-2 lg:col-start-3 h-100 w-100 sm:col-start-3 sm:col-span-2 sm:row-start-1 sm:row-span-1">
        <OfferBanner2 />
      </div>
      <div class="  lg:col-span-2 lg:row-span-2 lg:col-start-5 h-100 w-100 sm:row-start-2 sm:row-span-1 sm:col-start-3 sm:col-span-2  h-full">
        <OfferBanner />
      </div>
      <div class=" lg:col-span-3 lg:row-span-4   w-200 sm:row-span-3 sm:row-start-3 sm:col-start-1 sm:col-span-2 h-full">
        <OfferBanner4 />
      </div>
      <div class=" lg:col-span-4 lg:row-span-2  sm:row-span-1 sm:row-start-3 sm:col-start-3 sm:col-span-2 h-full w-200">
        <OfferBanner5 />
      </div>
    </div>
  );
};

export default OffersTop;
