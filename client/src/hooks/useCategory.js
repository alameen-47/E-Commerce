import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get categories
  const getCategories = async () => {
    try {
      let { data } = await axios.get("/api/v1/category/all-category");
      setCategories(data?.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return categories;
}
