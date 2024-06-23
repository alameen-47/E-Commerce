import React, { useState } from "react";
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

function Header() {
  const { t } = useTranslation();

  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [toggleMenu, setToggleMenu] = useState(false);
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
      <div className="rawad-mall_navbar w-full  ">
        <div className="rawad-mall_navbar-links p-0 left-0 right-0 sm:gap-2 lg:gap-24">
          <div className="rawad-mall_navbar-links_logo p-0 w-20 h-14">
            <img src={logo} alt="RAWAD MALL" />
          </div>
          <div
          // className={`language-switcher ${toggleMenu ? "hidden" : "block"}`}
          >
            <LanguageSwitcher />
          </div>
          <div className="rawad-mall_navbar-links_container ">
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
            <>
              <button className=" inline-flex items-center justify-center w-full p-1 text-sm font-medium text-white bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 gap-1">
                <Link to="/register">
                  <img
                    className="sm:w-5 !important"
                    src={profile}
                    alt=" profile"
                  />
                </Link>
              </button>
            </>
          ) : (
            <>
              <div className="dropdown z-1000">
                <img
                  className="dropdown-menu md:sm:w-6 !important"
                  src={userdetails}
                  alt="*"
                />
                <div className="dropdown-items lg:w-52 sm:w-40">
                  {auth?.user.name}
                  <div className="dropdown-items-1">
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      <img className="icons" src={dashboard} alt="dashboard" />

                      <h4>{t("common.Profile")}</h4>
                    </NavLink>
                  </div>
                  <div className="dropdown-items-1">
                    <NavLink onClick={handleLogout} to="/signin">
                      <img src={logout} className="icons" alt=" logout" />
                      <h4>{t("common.Logout")}</h4>
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          )}
          <NavLink to={"/cart"} key="cart-link">
            <div className="cart-icon">
              <img className="icons" src={cartimg} alt=" cart" />
              <div className="cart-count"> {cart ? cart.length : 0}</div>
            </div>
          </NavLink>
        </div>
        <div className="rawad_mall__navbar-menu">
          {toggleMenu ? (
            <RiCloseLine
              className="icons sm:right-3"
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
          {toggleMenu && (
            <>
              <div className="rounded-lg absolute z-50 rawad-mall__navbar-menu_container scale-up-center  bg-black!important h-auto">
                <div className="rawad-mall__navbar-menu_container-links-icons  bg-black p-1 overflow-visible text-sm">
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
                    <div className="dropdown-content ">
                      <Link to={`/categories`}>
                        <h1 className="">All Categories</h1>
                      </Link>
                      {categories.slice(0, 4)?.map((ct) => (
                        <Link to={`/category/${ct.slug}`}>{ct?.name}</Link>
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
            </>
          )}
        </div>
      </div>
      <div className="   border-2 border-gray-400 border-b-0 border-l-0 border-r-0 border-t-gray-500 w-full bg-black text-white  flex flex-row lg:p-2 justify-center sm:p-1 font-semibold sm:text-[10px] lg:text-sm sm:text-center align-super  ">
        <div className=" flex justify-between lg:gap-9 sm:gap-2 align-middle">
          <Link to={`/categories`}>
            <h1 className="hover:text-gray-100 font-semibold">
              {t("common.All Categories")}
            </h1>
          </Link>

          {categories.slice(0, window.innerWidth > 768 ? 10 : 5)?.map((ct) => (
            <Link to={`/category/${ct.slug}`}>{ct?.name}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;

// !!!!!!!!
// import React, { useState } from "react";
// import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
// import { useAuth } from "../../../context/auth";
// import "./Header.css";
// import logo from "../../../assets/icons/RAWAD MALL logo.png";
// import profile from "../../../assets/icons/icons8-user-60.png";
// import cartimg from "../../../assets/icons/icons8-shopping-cart-48.png";
// import logout from "../../../assets/icons/icons8-logout-90.png";
// import userdetails from "../../../assets/icons/icons8-user-details-64.png";
// import dashboard from "../../../assets/icons/icons8-dashboard-layout-96.png";
// import toast from "react-hot-toast";
// import { Link, NavLink } from "react-router-dom";
// import SearchInput from "../../Form/SearchInput";
// import useCategory from "../../../hooks/useCategory";
// import { useCart } from "../../../context/cart";

// function Header() {
//   const [auth, setAuth] = useAuth();
//   const [cart] = useCart();
//   const categories = useCategory();
//   const [toggleMenu, setToggleMenu] = useState(false);
//   const handleLogout = () => {
//     setAuth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     localStorage.removeItem("auth");
//     toast.success("Signed Out Successfully");
//   };
//   return (
//     <div>
//       <div className="rawad-mall_navbar w-full  ">
//         <div className="rawad-mall_navbar-links p-0 left-0 right-0">
//           <div className="rawad-mall_navbar-links_logo p-0 w-20 h-14">
//             <img src={logo} alt="RAWAD MALL" />
//           </div>
//           <div className="rawad-mall_navbar-links_container">
//             <Link to="/">
//               <p className="hover:text-gray-400">Home</p>
//             </Link>
//             <Link to="/allproducts">
//               <p className="hover:text-gray-400 ">Products</p>
//             </Link>

//             <Link to="/about">
//               <p className="hover:text-gray-400">About Us</p>
//             </Link>
//             <Link to="/contact">
//               <p className="hover:text-gray-400">Contact Us</p>
//             </Link>
//           </div>
//         </div>
//         <div className="rawad-mall_navbar-icons">
//           <SearchInput />
//           {!auth.user ? (
//             <>
//               <div className="profile-icon ">
//                 <Link to="/register">
//                   <img
//                     className="sm:w-5 !important"
//                     src={profile}
//                     alt=" profile"
//                   />
//                 </Link>
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="dropdown ">
//                 <img
//                   className="dropdown-menu md:sm:w-6 !important"
//                   src={userdetails}
//                   alt="*"
//                 />
//                 <div className="dropdown-items lg:w-52 sm:w-40">
//                   {auth?.user.name}
//                   <div className="dropdown-items-1">
//                     <NavLink
//                       to={`/dashboard/${
//                         auth?.user?.role === 1 ? "admin" : "user"
//                       }`}
//                     >
//                       <img className="icons" src={dashboard} alt="dashboard" />

//                       <h4>Dashboard</h4>
//                     </NavLink>
//                   </div>
//                   <div className="dropdown-items-1">
//                     <NavLink onClick={handleLogout} to="/signin">
//                       <img src={logout} className="icons" alt=" logout" />
//                       <h4>logout</h4>
//                     </NavLink>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//           <NavLink to={"/cart"} key="cart-link">
//             <div className="cart-icon">
//               <img className="icons" src={cartimg} alt=" cart" />
//               <div className="cart-count"> {cart ? cart.length : 0}</div>
//             </div>
//           </NavLink>
//         </div>
//         <div className="rawad_mall__navbar-menu">
//           {toggleMenu ? (
//             <RiCloseLine
//               className="icons sm:right-3"
//               color="#fff"
//               size={27}
//               onClick={() => setToggleMenu(false)}
//             />
//           ) : (
//             <RiMenu3Line
//               color="#fff"
//               size={27}
//               onClick={() => setToggleMenu(true)}
//             />
//           )}
//           {toggleMenu && (
//             <div className="rawad-mall__navbar-menu_container scale-up-center relative bg-black!important h-auto">
//               <div className="rawad-mall__navbar-menu_container-links-icons absolute bg-black p-1 overflow-visible text-sm">
//                 <Link to="/">
//                   <p>Home</p>
//                 </Link>
//                 <Link to="/allproducts">
//                   <p>Products</p>
//                 </Link>

//                 <div className="dropdown1">
//                   <Link to={"/categories"}>
//                     <p className="hover:text-gray-400 text-white">Categories</p>
//                   </Link>
//                   <div className="dropdown-content ">
//                     <Link to={`/categories`}>
//                       <h1 className="">All Categories</h1>
//                     </Link>
//                     {categories.slice(0, 4)?.map((ct) => (
//                       <Link to={`/category/${ct.slug}`}>{ct?.name}</Link>
//                     ))}
//                   </div>
//                 </div>

//                 <Link to="/about">
//                   <p>About Us</p>
//                 </Link>
//                 <Link to="/contact">
//                   <p>Contact Us</p>
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="border-2 border-gray-400 border-b-0 border-l-0 border-r-0 border-t-gray-500 w-full bg-black text-white  flex flex-row lg:p-2 justify-center sm:p-1 font-semibold sm:text-[10px] lg:text-sm sm:text-center align-super">
//         <div className=" flex justify-between lg:gap-9 sm:gap-2 align-middle">
//           <Link to={`/categories`}>
//             <h1 className="hover:text-gray-100 font-semibold">
//               All Categories
//             </h1>
//           </Link>

//           {categories.slice(0, window.innerWidth > 768 ? 10 : 5)?.map((ct) => (
//             <Link to={`/category/${ct.slug}`}>{ct?.name}</Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;
