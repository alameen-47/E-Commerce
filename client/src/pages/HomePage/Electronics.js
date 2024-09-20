import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/cart.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { Badge, Skeleton } from "antd";
import i18n from "../../i18n/index.js";
import { ImageCarousel } from "../../components/Product/ImageCarousel.js";
import { ProductCard1 } from "../../components/Product/ProductCard1.jsx";

const Electronics = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState(1);
  const [cart, setCart] = useCart();

  //translation
  const translateText = async (text, targetLanguage) => {
    const { data } = await axios.post("/api/v1/translate", {
      text,
      targetLanguage,
    });
    return data.translatedText;
  };
  // Get all products from the server
  const getElectronics = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/electronics");
      console.log("Electronics data", data);
      if (data.products.length > 0) {
        const translatedProducts = await Promise.all(
          data.products.map(async (product) => {
            const translatedName = await translateText(
              product.name,
              i18n.language
            );
            const translatedDescription = await translateText(
              product.description,
              i18n.language
            );

            const updatedImages = product?.image.map((img) => ({
              ...img,
              filePath: `http://localhost:8085/uploads/${img.filePath}`,
            }));

            return {
              ...product,
              name: translatedName,
              description: translatedDescription,
              image: updatedImages,
            };
          })
        );
        setProducts(translatedProducts);
        // Initialize active image state for all products
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getElectronics();
  }, []);

  return (
    <div className=" h-auto  w-screen flex flex-col justify-center items-center align-middle ">
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
      <div className="flex justify-center align-middle ">
        {products.length < 1 && <p>{t("common.No Products Found")}</p>}

        <div className="md:mx-3 mt-5 justify-center align-middle grid lg:grid-cols-7 md:grid-cols-4 sm:grid-cols-2  xs:grid-cols-2 sm:mx-0 gap-2">
          {products?.map((p) => (
            <div
              className=" flex lg:flex-col sm:flex-row 
        lg:aspect-[2/3] "
              key={p._id}
            >
              <ProductCard1 products={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Electronics;
