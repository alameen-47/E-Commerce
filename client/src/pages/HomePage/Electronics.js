import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/cart.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { t } from "i18next";

const Electronics = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState(1);
  const [cart, setCart] = useCart();

  // Get all products from the server
  const getElectronics = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/electronics");

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = (item) => {
    const updatedCart = [...cart, ...item];
    setCart(updatedCart);
    localStorage.setItem("CART", JSON.stringify(updatedCart));
    toast.success("Item Added to cart");
  };
  useEffect(() => {
    getElectronics();
  }, []);

  return (
    <div className=" h-auto w-screen flex flex-col justify-center items-center align-middle ">
      <div className="flex justify-between  mt-9 items-center">
        <div>
          <h2 className=" lg:text-sm font-bold text-gray-800 mb-5 flex gap-2 items-center text-sm ">
            <div className="bg-black  h-[0.1rem] sm:w-12 xl:lg:w-20"></div>
            {t("home.ELECTRONICS")}
          </h2>
          <h1 className="lg:text-3xl font-semibold leading-tight tracking-tight md:w-[37.25rem] dark:text-black sm:text-xl text-pretty">
            {t("home.Discover Our Electronics Appliances")}
          </h1>
        </div>
        <div className="items-center hidden xl:block">
          <Link to={"/category/electronics"}>
            <button className="bg-black hover:bg-gray-800 focus:ring ring-black rounded-sm shadow-sm  p-3 text-white">
              {t("home.Shop Electronics")}
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center align-middle">
        {products.length < 1 && <p>{t("common.No Products Found")}</p>}

        <div className="grid gap-3 lg:grid-cols-7 md:grid-cols-4 sm:grid-cols-2 ">
          {products?.map((p) => (
            <div
              className=" flex lg:flex-col sm:flex-row 
                lg:aspect-[2/3] "
              key={p._id}
            >
              <div className="text-wrap h-60 gap-1  group py-3 lg:px-1  bg-slate-100 rounded-lg flex flex-col items-center justify-center  relative after:absolute after:h-full after:bg-[#000000] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all  h-68 lg:h-72 ">
                <img
                  onClick={() => navigate(`/product/${p.slug}`)}
                  src={`/api/v1/product/product-image/${p._id}`}
                  style={{
                    transform:
                      "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
                  }}
                  className="lg:md:w-44 md:w-40 sm:w-44  overflow-hidden object-contain aspect-square text-[#000000] group-hover:bg-white lg:text-5xl sm:text-2xl rounded-s  transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2  mx-auto h-[60%]"
                  alt=""
                />
                <p className="cardtxt font-semibold text-black tracking-wider group-hover:text-white h-2 text-lg sm:text-sm lg:md:text-[15px]">
                  {(() => {
                    const words = p.name.split(" ");
                    return words.length > 1
                      ? words.slice(0, 2).join(" ")
                      : words[0];
                  })()}
                </p>
                <p className="blueberry font-semibold text-gray-500  group-hover:text-gray-200 mb-0 lg:text-xs sm:text-xs text-center">
                  {(() => {
                    const words = p.description.split(" ");
                    return words.length > 1
                      ? words.slice(0, 4).join(" ")
                      : words[0];
                  })()}
                </p>
                {p.offer ? (
                  <>
                    <div className="flex gap-1 justify-center items-center mt-0 ">
                      <strike className="ordernow-text text-[#616161] font-semibold  group-hover:text-white text-center items-center lg:text-sm  sm:text-xs">
                        SR: {Math.floor(p.price * (1 + p.offer / 100))}/-
                      </strike>
                      <span
                        className="text-green-500 font-semibold lg:text-lg sm:text-xs
            "
                      >
                        {p.offer}% off
                      </span>
                    </div>
                    <p className="ordernow-text text-[#000000] font-bold h-2 group-hover:text-white text-center items-center lg:text-lg sm:text-md">
                      SR:{p.price}/-
                    </p>
                  </>
                ) : (
                  <p className="ordernow-text text-[#000000] font-semibold h-2 group-hover:text-white text-center items-center lg:text-lg sm:text-xs">
                    SR:{p.price}/-
                  </p>
                )}
                <button
                  onClick={() => {
                    addToCart([{ ...p, units }]);
                  }}
                  className="btun4 text-white lg:inline-flex items-center lg:gap-3 sm:gap-1 group-hover:bg-white group-hover:text-black bg-[#000] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer lg:py-2 sm:py-1 lg:px-4 sm:px-2 lg:text-sm sm:text-xs font-semibold rounded-full butn"
                >
                  {t("common.ADD TO CART")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Electronics;
