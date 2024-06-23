import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import search from "../../assets/icons/search icon.png";
import { t } from "i18next";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <div className=" flex px-1 bg-white lg:md:h-11 sm:h-8 sm:lg:px-2 lg:rounded-lg sm:rounded-md rounded-xl ">
          <input
            className=" focus:outline-none rounded-xl bg-white w-10 lg:w-72 sm:w-24 font-semibold sm:text-xs text-xs md:lg:xl:text-base text-black "
            type="search"
            placeholder={t("common.Search")}
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          ></input>
          <button
            className=" rounded-md hover:!bg-black  border-none px-0 bg-black invert  "
            type="submit"
          >
            <div>
              <img
                className="h-[1rem] w-[0.2rem] lg:xl:w-6 lg:xl:h-screen  sm:w-[1rem] sm:h-[1.5rem] "
                src={search}
                alt=""
              />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
