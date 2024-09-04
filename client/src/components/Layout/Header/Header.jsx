import React, { useEffect, useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useAuth } from "../../../context/auth";
import "./Header.css";
import logo from "../../../assets/icons/RAWAD MALL logo.png";
import profile from "../../../assets/icons/icons8-user-60.png";
import cartimg from "../../../assets/icons/icons8-shopping-cart-48.png";
import logout from "../../../assets/icons/icons8-logout-90.png";
import userdetails from "../../../assets/icons/icons8-user-details-64.png";
import dashboard from "../../../assets/icons/icons8-dashboard-layout-96.png";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import SearchInput from "../../Form/SearchInput";
import useCategory from "../../../hooks/useCategory";
import { useCart } from "../../../context/cart";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../../LanguageSwitcher";
import axios from "axios";
import i18n from "../../../i18n/index.js";
import CategoryListSlider from "./CategoryListSlider.jsx";

function Header() {
  const { t } = useTranslation();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  useEffect(() => {
    // Check if the document's direction is RTL
    const checkDirection = () => {
      if (document.body.dir === "rtl") {
        setIsRTL(true);
      } else {
        setIsRTL(false);
      }
    };

    // Run the check on component mount
    checkDirection();

    // Optionally, add an event listener if the direction might change dynamically
    window.addEventListener("load", checkDirection);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("load", checkDirection);
    };
  }, []);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Signed Out Successfully");
  };

  return (
    <div>
      <div className="rawad-mall_navbar w-full">
        <div className="rawad-mall_navbar-links p-0 left-0 right-0 sm:gap-2 lg:gap-24">
          <div className="rawad-mall_navbar-links_logo p-0 w-20 h-14">
            <img src={logo} alt="RAWAD MALL" />
          </div>
          <div>
            <LanguageSwitcher />
          </div>
          <div className="rawad-mall_navbar-links_container">
            <Link to="/">
              <p className="hover:text-gray-400 font-bold">
                {t("header.Home")}
              </p>
            </Link>
            <Link to="/allproducts">
              <p className="hover:text-gray-400 font-bold">
                {t("header.Products")}
              </p>
            </Link>
            <Link to={`/categories`}>
              <p className="hover:text-gray-400 font-bold">
                {t("header.Categories")}
              </p>
            </Link>
            <Link to="/about">
              <p className="hover:text-gray-400 font-bold">
                {t("header.About Us")}
              </p>
            </Link>
            <Link to="/contact">
              <p className="hover:text-gray-400 font-bold">
                {t("header.Contact Us")}
              </p>
            </Link>
          </div>
        </div>
        <div className="rawad-mall_navbar-icons">
          <SearchInput />

          {!auth.user ? (
            <button className="inline-flex items-center justify-center w-full p-1 text-sm font-medium text-white bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 gap-1 ">
              <Link to="/register">
                <img
                  className="sm:w-5 !important"
                  src={profile}
                  alt="profile"
                />
              </Link>
            </button>
          ) : (
            <div
              onClick={() => setDropDown(!dropDown)}
              onBlur={() => setDropDown(false)}
              className="dropdown"
            >
              <img
                className="dropdown-menu md:sm:w-6 !important"
                src={userdetails}
                alt="*"
              />
              {dropDown && (
                <div className="absolute left-0 mt-2 origin-top-left bg-black divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 text-center lg:w-[200px] sm:w-[120px] focus:outline-none z-50 px-3 py-3">
                  {auth?.user.name}

                  <div className=" flex flex-row py-[7%] ">
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      <div className="flex flex-row justify-center items-center align-middle gap-3">
                        <img src={dashboard} className="" alt="logout" />
                        <h4 className="mb-0">{t("common.Profile")}</h4>
                      </div>
                    </NavLink>
                  </div>
                  <div className=" flex flex-row py-[7%] ">
                    <NavLink onClick={handleLogout} to="/signin">
                      <div className="flex flex-row justify-center items-center align-middle gap-3">
                        <img src={logout} className="" alt="logout" />
                        <h4 className="mb-0">{t("common.Logout")}</h4>
                      </div>
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          )}

          <NavLink to={"/cart"} key="cart-link">
            <div className="flex flex-col">
              <img className="mt-3" src={cartimg} alt="cart" />
              <div className="cart-count"> {cart ? cart.length : 0}</div>
            </div>
          </NavLink>
        </div>
        <div className="rawad_mall__navbar-menu">
          {toggleMenu ? (
            <RiCloseLine
              className="icons sm:right-"
              color="#fff"
              size={27}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color="#fff"
              size={27}
              onClick={() => setToggleMenu(true)}
            />
          )}
          <>
            {toggleMenu &&
              (isRTL ? (
                <div className="absolute left-0 mt-2 origin-top-left bg-black divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 px-3">
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
                        {categories.slice(0, 4)?.map((ct) => (
                          <Link key={ct.slug} to={`/category/${ct.slug}`}>
                            {ct?.name}
                          </Link>
                        ))}
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
              ) : (
                <div className="absolute right-0 mt-2 origin-top-right bg-black divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50  px-3">
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
                        {categories.slice(0, 4)?.map((ct) => (
                          <Link key={ct.slug} to={`/category/${ct.slug}`}>
                            {ct?.name}
                          </Link>
                        ))}
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
              ))}
          </>
        </div>
      </div>
      <div className="border-2 border-gray-400 border-b-0 border-l-0 border-r-0 border-t-gray-500 w-full bg-black text-white flex flex-row lg:p-2 justify-center sm:p-1 font-semibold sm:text-[10px] lg:text-sm sm:text-center align-super">
        <CategoryListSlider />
      </div>
    </div>
  );
}

export default Header;
