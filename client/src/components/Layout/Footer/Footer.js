import React from "react";

import logo from "../../../assets/icons/RAWAD MALL logo.png";
import fb from "../../../assets/icons/icons8-facebook-50 (1).png";
import ig from "../../../assets/icons/icons8-instagram-50.png";
import yt from "../../../assets/icons/icons8-youtube-50.png";
import twitterX from "../../../assets/icons/icons8-twitterx-50 (1).png";
import wp from "../../../assets/icons/icons8-whatsapp-50.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="top-3/4 px-20 divide-y dark:bg-black dark:text-gray-100  container max-w-screen-3xl ">
      <div className="container flex flex-col justify-around py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className=" flex-auto ml-24 space-y-3 ">
          <div className="pt-2 flex-row items-center justify-center align-middle m-auto">
            <img
              src={logo}
              fill="currentColor"
              className=" dark:text-gray-900"
              alt=""
            />
            <ul className="space-y-1 my-4 text-xs">
              <li>
                <p>Rawad Mall,Al Sulaymi</p>
              </li>
              <li>
                <p>+966 546 236 589</p>
              </li>
              <li>
                <p>info@rawadmall.com</p>
              </li>
              <li>
                <p>Visit Our Store</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-lg font-bold tracki uppercase dark:text-gray-50">
              Useful links
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to={""}>Home</Link>
              </li>
              <li>
                <Link to={""}>Products</Link>
              </li>
              <li>
                <Link to={""}>Categories</Link>
              </li>
              <li>
                <Link to={""}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold tracki uppercase dark:text-gray-50">
              Products
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to={""}>Furnitures</Link>
              </li>
              <li>
                <Link to={""}>Electronics</Link>
              </li>
              <li>
                <Link to={""}>Carpets</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className=" text-lg font-bold  uppercase dark:text-gray-50">
              Stay in Touch<br></br>
              <span className="lowercase font-normal  text-xs">
                Checkout our social media{" "}
              </span>
            </div>
            <div className="flex justify-start space-x-3">
              <Link title="facebook" className="flex items-center p-1">
                <img
                  src={fb}
                  fill="currentColor"
                  className="w-5 h-5 fill-current hover:opacity-75"
                  alt=""
                />
              </Link>
              <Link title="instagram" className="flex items-center p-1">
                <img
                  src={ig}
                  fill="currentColor"
                  className="w-5 h-5 fill-current hover:opacity-75"
                  alt=""
                />
              </Link>
              <Link title="Whatsapp" className="flex items-center p-1">
                <img
                  src={wp}
                  fill="currentColor"
                  className="w-5 h-5 fill-current hover:opacity-75"
                  alt=""
                />
              </Link>
              <Link title="twitterX" className="flex items-center p-1">
                <img
                  src={twitterX}
                  fill="currentColor"
                  className="w-5 h-5 fill-current hover:opacity-75"
                  alt=""
                />
              </Link>
              <Link title="youtube" className="flex items-center p-1">
                <img
                  src={yt}
                  fill="currentColor"
                  className="w-5 h-5 fill-current hover:opacity-75"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center dark:text-gray-400">
        © 2023 Rawad Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
