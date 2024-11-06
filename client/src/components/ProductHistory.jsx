import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCard1 } from "./Product/ProductCard1";
import { ProductCarousel } from "./Product/ProductCarousel";
import { t } from "i18next";

export const ProductHistory = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();

  const fetchHistory = () => {
    const searchHistoryProducts = localStorage.getItem("searchHistoryProducts");
    if (searchHistoryProducts) {
      const historyArray = JSON.parse(searchHistoryProducts);
      // Store the fetched data in state
      setProducts(historyArray);
    } else {
      setProducts([]); // If no history found, set an empty array
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);
  return (
    <div>
      <div className="bg-blue-600  ">
        {products?.length > 1 ? (
          <div className="HISTORY PRODUCTS bg-white flex flex-col justify-center text-center items-center align-middle ">
            <div className="px-5  flex flex-col  bg-white justify-center items-center align-middle rounded-lg ">
              <h1 className="text-left self-start pl-3 font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl sm:mb-0">
                {t("productDetails.Your recent searches, just for you!!")}
              </h1>
              <ProductCarousel products={products} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
