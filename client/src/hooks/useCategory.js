import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../utilities/api";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const { t, i18n } = useTranslation();

  //translation
  const translateText = async (text, targetLanguage) => {
    const { data } = await axios.post("/api/v1/translate", {
      text,
      targetLanguage,
    });
    return data.translatedText;
  };

  //get categories
  const getCategories = async () => {
    try {
      let { data } = await axios.get(`${API_BASE_URL}/api/v1/category/all-category`);
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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return categories;
}
