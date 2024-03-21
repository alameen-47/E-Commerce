import React, { useState, useEffect } from "react";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
const Categories = () => {
  // const categories = useCategory();
  const [categories, setCategories] = useState([]);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"All Categories"}>
      <section className="">
        <div className="py-10  sm:py-16 block lg:py-24 relative bg-opacity-50  z-40  ">
          <div className="relative mx-auto h-full px-4 pb-20   md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
              <div className="max-w-xl mx-auto text-center">
                <div className="inline-flex px-4 py-1.5 mx-auto rounded-full  ">
                  <p className="text-4xl font-semibold tracking-widest text-g uppercase">
                    CATEGORIES:
                  </p>
                </div>
                <p className="mt-4 text-base leading-relaxed text-gray-600 group-hover:text-white">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit..
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-3 lg:mt-20   ">
                {categories?.map((ct) => (
                  <Link to={`/category/${ct.slug}`}
                    
                    className="transition-all  duration-1000 bg-white hover:bg-black  hover:shadow-xl m-2 p-4 relative z-40 group  "
                  >
                    <>
                      <div className=" absolute  bg-black top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  "></div>
                      <div className="py-2 px-9 relative  ">
                        <img
                          className="w-16 h-16  group-hover:invert !important"
                          src={`/api/v1/category/categories-icons/${ct?._id}`}
                          alt={ct.name}
                        ></img>
                        <h3 className="mt-8 text-lg font-semibold text-black group-hover:text-white ">
                          {ct?.name}
                        </h3>
                        <p className="mt-4 text-base text-gray-600 group-hover:text-white  "></p>
                      </div>
                    </>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
