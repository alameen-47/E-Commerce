import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCard1 } from "./Product/ProductCard1";

export const ProductHistory = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();

  const fetchHistory = () => {
    const searchHistoryProducts = localStorage.getItem("searchHistoryProducts");
    if (searchHistoryProducts) {
      const historyArray = JSON.parse(searchHistoryProducts);
      // Store the fetched data in state
      setProducts(historyArray);
      console.log(historyArray, "HISTORYYY");
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
        {products?.length > 0 ? (
          <div className="HISTORY PRODUCTS bg-white flex flex-col justify-center text-center items-center align-middle ">
            <div className="p-5  flex flex-col  bg-white justify-center items-center align-middle rounded-lg    ">
              <h1 className="text-left self-start pl-3 font-semibold text-xl">
                Your recent searches, just for you!!
              </h1>
              <div className="bg-white carousel carousel-center rounded-box max-w-[70rem] drop-shadow-2xl p-4 ">
                {/* Use a wrapper div for the carousel items */}
                {products.map((p, index) => (
                  <div key={index} className="carousel-item w-1/5">
                    <ProductCard1 products={p} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
