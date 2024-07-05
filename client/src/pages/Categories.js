import React, { useState, useEffect } from "react";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Categories = () => {
  // const categories = useCategory();
  const [categories, setCategories] = useState([]);
  const { i18n } = useTranslation();

  //translation
  const translateText = async (text, targetLanguage) => {
    const { data } = await axios.post("/api/v1/translate", {
      text,
      targetLanguage,
    });
    return data.translatedText;
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        const translatedCategories = await Promise.all(
          data.categories.map(async (category) => {
            const translatedName = await translateText(
              category.name,
              i18n.language
            );

            return {
              ...category,
              name: translatedName,
            };
          })
        );
        setCategories(translatedCategories);
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
        <div className="py-10 px-6 sm:py-16 block lg:py-24 relative bg-opacity-50    ">
          <div className=" mx-auto h-full  pb-20   md:pb-10  ">
            <div className="px-0 mx-auto  relative">
              <div className=" mx-auto text-center">
                <div className="inline-flex px-4 py-1.5 mx-auto rounded-full">
                  <p className="lg:text-4xl sm:text-2xl font-semibold tracking-widest text-g uppercase">
                    CATEGORIES:
                  </p>
                </div>
                <p className="lg:mt-4 sm:text-sm lg:text-base leading-relaxed text-gray-600 group-hover:text-white">
                  "Unlocking the spectrum of consumer desires: Exploring the
                  Categories of Rawad Mall Products."
                </p>
              </div>
              <div className="grid lg:grid-cols-5 gap-2 mt-12 sm:grid-cols-3 lg:mt-20">
                {categories?.map((ct) => (
                  <Link
                    to={`/category/${ct.slug}`}
                    className="transition-all  duration-1000 bg-slate-200 hover:bg-black  hover:shadow-xl m-2 p-4 relative z-40 group  "
                  >
                    <>
                      <div className=" absolute  bg-black top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-slate-200 group-hover:w-1/2  "></div>
                      <div className="lg:py-2  relative  ">
                        <img
                          className="lg:w-16 lg:h-16 sm:w-14 sm:h-14   group-hover:invert !important"
                          src={`/api/v1/category/categories-icons/${ct?._id}`}
                          alt={ct.name}
                        ></img>
                        <h3 className="mt-8 lg:text-lg font-semibold text-black group-hover:text-white text-center ">
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
