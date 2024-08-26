import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DropDown = () => {
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Check if the document's direction is RTL
    const direction = document.body.dir;
    setIsRTL(direction === "rtl");
  }, []);

  return (
    <div
      className="absolute z-50 py-3 px-4 bg-black rounded-lg h-auto"
      style={{
        top: "100%",
        left: isRTL ? "auto" : "0",
        right: isRTL ? "0" : "auto",
      }}
    >
      <div className="bg-black w-[70%] overflow-visible text-sm sm:w-fit">
        <Link to="/">
          <p>{t("header.Home")}</p>
        </Link>
        <Link to="/allproducts">
          <p>{t("header.Products")}</p>
        </Link>

        <div className="dropdown1">
          <Link to={"/categories"}>
            <p className="hover:text-gray-400 text-white">
              {t("header.Categories")}
            </p>
          </Link>
          <div className="dropdown-content">
            <Link to={`/categories`}>
              <h1 className="">All Categories</h1>
            </Link>
            {/* {categories.slice(0, 4)?.map((ct) => (
              <Link to={`/category/${ct.slug}`} key={ct.slug}>
                {ct?.name}
              </Link>
            ))} */}
          </div>
        </div>

        <Link to="/about">
          <p>{t("header.About Us")}</p>
        </Link>
        <Link to="/contact">
          <p>{t("header.Contact Us")}</p>
        </Link>
      </div>
    </div>
  );
};

export default DropDown;
