import React, { useState } from "react";

import logo from "../../../assets/icons/RAWAD MALL logo.png";
import fb from "../../../assets/icons/icons8-facebook-50 (1).png";
import ig from "../../../assets/icons/icons8-instagram-50.png";
import yt from "../../../assets/icons/icons8-youtube-50.png";
import twitterX from "../../../assets/icons/icons8-twitterx-50 (1).png";
import wp from "../../../assets/icons/icons8-whatsapp-50.png";
import { Link } from "react-router-dom";
import MapComponent from "../../MapComponent";
import { t } from "i18next";

const Footer = () => {
  const [locations, setLocations] = useState([
    {
      id: 2,
      latitude: 26.293761005976013,
      longitude: 41.36367807952973,
      name: t("common.RAWAD MALL"),
    },
    {
      id: 1,
      latitude: 26.295750914238287,
      longitude: 41.35964185639376,
      name: t("common.RAWAD MALL"),
    },
  ]);

  const handleSelectLocation = (newLocation) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === newLocation.id
          ? {
              ...location,
              latitude: newLocation.lat,
              longitude: newLocation.lng,
            }
          : location
      )
    );
  };

  return (
    <footer className="footer w-full flex flex-col justify-center items-center p-4 divide-y dark:bg-black dark:text-gray-100 2xl:flex 2xl:flex-col 2xl:items-center">
      <div className="flex flex-wrap justify-center gap-8 lg:gap-12 xl:gap-20 w-full max-w-7xl px-4 md:px-8">
        {/* Logo & Contact */}
        <div className="flex flex-col mb-6 w-full sm:w-auto sm:min-w-[200px] md:min-w-[220px]">
          <Link to="/" className="mb-4 self-start">
            <img
              className="object-contain w-32 sm:w-20 md:w-24 h-auto md:pr-4 active:scale-75 active:shadow-md active:shadow-slate-100 duration-75"
              src={logo}
              alt="RAWAD MALL"
            />
          </Link>
          <ul className="space-y-1 text-xs">
            <li>
              <p>{t("footer.Rawad Mall, Al Sulaymi")}</p>
            </li>
            <li>
              <p>+966 546 236 589</p>
            </li>
            <li>
              <p>info@rawadmall.com</p>
            </li>
            <li>
              <p>{t("footer.Visit Our Store")}</p>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="mb-6 w-40 sm:w-44 md:w-48">
          <h3 className="text-lg font-bold tracking-wider uppercase dark:text-gray-50 mb-3">
            {t("footer.USEFUL LINKS")}
          </h3>
          <ul className="space-y-1">
            <li>
              <Link to={""} className="hover:underline">
                {t("footer.Home")}
              </Link>
            </li>
            <li>
              <Link to={""} className="hover:underline">
                {t("footer.Products")}
              </Link>
            </li>
            <li>
              <Link to={""} className="hover:underline">
                {t("footer.Categories")}
              </Link>
            </li>
            <li>
              <Link to={""} className="hover:underline">
                {t("footer.Contact Us")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Products */}
        <div className="mb-6 w-40 sm:w-44 md:w-48">
          <h3 className="text-lg font-bold tracking-wider uppercase dark:text-gray-50 mb-3">
            {t("footer.Products")}
          </h3>
          <ul className="space-y-1">
            <li>
              <Link to={""} className="hover:underline">
                {t("footer.Furnitures")}
              </Link>
            </li>
            <li>
              <Link to={""} className="hover:underline">
                {t("footer.Electronics")}
              </Link>
            </li>
            <li>
              <Link to={""} className="hover:underline">
                {t("footer.Toys")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="mb-6 w-full sm:w-auto max-w-xs">
          <div className="text-lg font-bold uppercase dark:text-gray-50 mb-2">
            {t("footer.STAY IN TOUCH")}
            <br />
            <span className="lowercase font-normal text-xs">
              {t("footer.Checkout our social media")}
            </span>
          </div>
          <div className="flex space-x-4 mt-1">
            <Link title="facebook" className="flex items-center p-1">
              <img
                src={fb}
                className="w-5 h-5 hover:opacity-75"
                alt="Facebook"
              />
            </Link>
            <Link title="instagram" className="flex items-center p-1">
              <img
                src={ig}
                className="w-5 h-5 hover:opacity-75"
                alt="Instagram"
              />
            </Link>
            <Link title="Whatsapp" className="flex items-center p-1">
              <img
                src={wp}
                className="w-5 h-5 hover:opacity-75"
                alt="WhatsApp"
              />
            </Link>
            <Link title="twitterX" className="flex items-center p-1">
              <img
                src={twitterX}
                className="w-5 h-5 hover:opacity-75"
                alt="Twitter"
              />
            </Link>
            <Link title="youtube" className="flex items-center p-1">
              <img
                src={yt}
                className="w-5 h-5 hover:opacity-75"
                alt="YouTube"
              />
            </Link>
          </div>
        </div>

        {/* Map Components */}
        <div className="w-full flex flex-col sm:flex-row sm:space-x-6 gap-6 sm:gap-0 justify-center">
          <div className="flex-1 min-w-[280px] h-48 sm:h-56">
            <MapComponent
              onSelectLocation={handleSelectLocation}
              latitude={26.295750914238287}
              longitude={41.35964185639376}
            />
          </div>
          <div className="flex-1 min-w-[280px] h-48 sm:h-56">
            <MapComponent
              onSelectLocation={handleSelectLocation}
              locations={locations}
            />
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="py-6 text-sm text-center flex justify-center align-middle items-center dark:text-gray-400 w-full max-w-7xl px-4 md:px-8">
        &copy; 2023 Rawad Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
