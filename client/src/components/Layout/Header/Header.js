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

function Header() {
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
    <div className="rawad-mall_navbar">
      <div className="rawad-mall_navbar-links">
        <div className="rawad-mall_navbar-links_logo">
          <img src={logo} alt="RAWAD MALL" />
        </div>
        <div className="rawad-mall_navbar-links_container">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/allproducts">
            <p>Products</p>
          </Link>

          <div className="dropdown1">
            <Link to={"/categories"}>
              <p className="text-white">Categories</p>
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
            <p>About Us</p>
          </Link>
          <Link to="/contact">
            <p>Contact Us</p>
          </Link>
        </div>
      </div>
      <div className="rawad-mall_navbar-icons">
        <SearchInput />
        {!auth.user ? (
          <>
            <div className="profile-icon">
              <Link to="/register">
                <img src={profile} alt=" profile" />
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="dropdown">
              <img className="dropdown-menu" src={userdetails} alt="*" />
              <div className="dropdown-items">
                {auth?.user.name}
                <div className="dropdown-items-1">
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    <img src={dashboard} alt="dashboard" />

                    <h4>Dashboard</h4>
                  </NavLink>
                </div>
                <div className="dropdown-items-1">
                  <NavLink onClick={handleLogout} to="/signin">
                    <img src={logout} alt=" logout" />
                    <h4>logout</h4>
                  </NavLink>
                </div>
              </div>
            </div>
          </>
        )}
        <NavLink to={"/cart"}>
          <div className="cart-icon">
            <img src={cartimg} alt=" cart" />
            <div className="cart-count">{cart?.length}</div>
          </div>
        </NavLink>
      </div>
      <div className="rawad_mall__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
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
          <div className="rawad-mall__navbar-menu_container scale-up-center relative !important">
            <div className="rawad-mall__navbar-menu_container-links-icons ">
              <Link to="/">
                <p>Home</p>
              </Link>
              <Link to="/allproducts">
                <p>Products</p>
              </Link>
              <Link to="*">
                <p>Categories</p>
              </Link>
              <Link to="/about">
                <p>About Us</p>
              </Link>
              <Link to="/contact">
                <p>Contact Us</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
