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
        <div className=" flex">
          <input
            className="bg-black w-36"
            type="search"
            placeholder="Search Products"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          ></input>
          <button className="btn btn-outline-success" type="submit">
            <div className="">
              <img src={search} alt="" />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
