import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import search from "../../assets/icons/search icon.png";
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
        <div className=" flex  bg-white  px-2 rounded-lg">
          <input
            className=" focus:outline-none bg-white lg:w-72 sm:w-24 sm:text-xs md:lg:xl:text-base text-black "
            type="search"
            placeholder="Search Products"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          ></input>
          <button
            className=" rounded-md hover:!bg-black btn border-none bg-black invert  "
            type="submit"
          >
            <div>
              <img
                className="lg:xl:w-6 lg:xl:h-screen  sm:w-[1rem] sm:h-[1.5rem] "
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
