import React, { useState, useEffect, useRef } from "react";
import "./CreateProducts.css";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import { Button, ColorPicker, Modal, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import slug from "slugify";
import { SketchPicker } from "react-color"; // Import color picker
import slugify from "slugify";

const { Option } = Select;

const CreateProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryID, setSelectedCategoryID] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputRefs = useRef({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  useEffect(() => {
    const category = categories.find(
      (category) => category.name === selectedCategory
    );
    if (category) {
      setSelectedCategoryID(category._id);
    } else {
      setSelectedCategoryID("");
    }
  }, [selectedCategory, categories]);

  // Watch for changes to selectedCategoryID and log it when updated
  useEffect(() => {
    if (selectedCategoryID) {
      console.log("Selected Category ID:", selectedCategoryID);
    }
  }, [selectedCategoryID]);
  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops!!Something Went Wrong in getting Category!");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const categoryDetails = {
    Electronics: [
      { key: "brand", value: "" },
      { key: "model", value: "" },
      { key: "warranty", value: "" },
      { key: "power", value: "" },
    ],
    Furnitures: [
      { key: "material", value: "" },
      { key: "dimensions", value: "" },
      { key: "brand", value: "" },
      { key: "warranty", value: "" },
    ],
    "Home Appliances": [
      { key: "brand", value: "" },
      { key: "model", value: "" },
      { key: "warranty", value: "" },
      { key: "energy efficiency", value: "" },
      { key: "power", value: "" },
    ],
    Footwears: [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "material", value: "" },
      { key: "type", value: "" },
    ],
    "Ladies Footwear": [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "material", value: "" },
      { key: "type", value: "" },
    ],
    "Gents Footwear": [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "material", value: "" },
      { key: "type", value: "" },
    ],

    Garments: [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "fabric", value: "" },
      { key: "type", value: "" },
    ],
    "Ladies Collection": [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "fabric", value: "" },
      { key: "type", value: "" },
    ],
    "Gents Collection": [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "fabric", value: "" },
      { key: "type", value: "" },
    ],
    "Kids Collection": [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "fabric", value: "" },
      { key: "type", value: "" },
    ],

    "Kitchen Appliances": [
      { key: "brand", value: "" },
      { key: "model", value: "" },
      { key: "power", value: "" },
      { key: "warranty", value: "" },
      { key: "capacity", value: "" },
    ],
    Cookwares: [
      { key: "brand", value: "" },
      { key: "material", value: "" },
      { key: "size", value: "" },
      { key: "coating", value: "" },
      { key: "type", value: "" },
    ],
    "Cleaning Products": [
      { key: "brand", value: "" },
      { key: "type", value: "" },
      { key: "fragrance", value: "" },
      { key: "size", value: "" },
      { key: "material compatibility", value: "" },
    ],
    "Plastic Appliances": [
      { key: "brand", value: "" },
      { key: "material", value: "" },

      { key: "durability", value: "" },
      { key: "size", value: "" },
    ],
    "Camping Products": [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "material", value: "" },
      { key: "weight", value: "" },
      { key: "type", value: "" },
    ],
    Mobiles: [
      { key: "brand", value: "" },
      { key: "model", value: "" },
      { key: "storage", value: "" },

      { key: "battery capacity", value: "" },
    ],
    Gadgets: [
      { key: "brand", value: "" },
      { key: "model", value: "" },
      { key: "type", value: "" },
      { key: "features", value: "" },
    ],
    Perfumes: [
      { key: "brand", value: "" },
      { key: "fragrance", value: "" },
      { key: "volume", value: "" },
      { key: "gender", value: "" },
      { key: "type", value: "" },
    ],
    "Beauty Products": [
      { key: "brand", value: "" },
      { key: "skin type", value: "" },
      { key: "ingredients", value: "" },
      { key: "type", value: "" },
      { key: "volume", value: "" },
    ],
    Toys: [
      { key: "brand", value: "" },
      { key: "age group", value: "" },
      { key: "material", value: "" },
      { key: "safety certifications", value: "" },
      { key: "type", value: "" },
    ],
    "Stationary Products": [
      { key: "brand", value: "" },
      { key: "type", value: "" },
      { key: "size", value: "" },
      { key: "material", value: "" },
      { key: "usage", value: "" },
    ],
    // Add more categories as needed
  };

  console.log(selectedCategory, "SELECTED VALUE");
  console.log(color, "SELECTED COLOR");
  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("slug", slugify(name));
      productData.append("description", description);
      productData.append("price", price);
      productData.append("offer", offer);
      productData.append("quantity", quantity);
      productData.append("color", color);
      productData.append("category", selectedCategoryID);

      // Append images to FormData
      image.forEach((img) => {
        productData.append("image", img);
      });

      // Append category details to FormData
      categoryDetails[selectedCategory]?.forEach((detail) => {
        const value = inputRefs.current[detail.key]?.value || ""; // Get values from refs
        productData.append(detail.key, value); // Append to FormData
      });

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        navigate("/dashboard/admin/products");
        toast.success("Product Created Successfully");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout title={"Admin Dashboard - Create product"}>
      <div className="container flex lg:flex-row sm:flex-col lg:gap-10 sm:gap-0">
        <div className="relative !important h-sc">
          <AdminMenu />
        </div>
        <div className="lg:w-screen sm:left-0 sm:w-screen sm:overflow-hidden !important">
          <h1 className="lg:text-3xl lg:font-extrabold sm:text-xl sm:font-bold">
            Create Products
          </h1>
          <div style={{ margin: "1px", width: "100%" }}>
            <Select
              bordered={false}
              placeholder="Select a Category"
              size="large"
              className="form-select text-black"
              style={{
                marginBottom: "1rem",
                width: "100%",
                cursor: "pointer",
                border: "1px solid #cccccc",
                borderRadius: "8px",
                boxShadow: "0 0 5px #cccccc",
                backgroundColor: "white",
              }}
              onChange={(e) => setSelectedCategory(e)}
            >
              {categories?.map((c) => (
                <Option className="text-[#0e0c0c]" key={c._id} value={c.name}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <Upload
              onPreview={onPreview}
              listType="picture-card"
              multiple
              beforeUpload={(file) => {
                setImage((prevImages) => [...prevImages, file]); // Append selected file to the array
                return false; // Prevent automatic upload
              }}
            >
              <span
                className="
              text-[#0e0c0c]
              shadow-black"
              >
                + Upload Images
              </span>
            </Upload>

            <label className="relative block mt-5 ">
              Name:
              <input
                className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="text"
                value={name}
                placeholder="Enter a Name for Product"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="relative block mt-5">
              Color:
              <ColorPicker
                defaultValue="#000000"
                onChange={(color) => setColor(color.hex)}
                size="large"
                showText
              />
            </label>
            <label className="relative block mt-5">
              Description
              <textarea
                className=" placeholder:text-slate-400 placeholder:t-2  bg-white text-black w-full h-40 flex border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="text"
                value={description}
                placeholder="Enter a Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label className="relative block mt-5">
              Price:
              <input
                className=" placeholder:text-slate-400 block bg-white text-black w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="number"
                value={price}
                placeholder="Enter a Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label className="relative block mt-5">
              Offer:
              <input
                className=" placeholder:text-slate-400 block bg-white text-black w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="number"
                value={offer}
                placeholder="Offer in %"
                onChange={(e) => setOffer(e.target.value)}
              />
            </label>
            <label className="relative block mt-5">
              Quantity:
              <input
                className=" placeholder:text-slate-400 block bg-white text-black w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="number"
                value={quantity}
                placeholder="Enter the Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>

            {/* <Select
              bordered={false}
              placeholder="Shipping"
              size="large"
              className="form-select"
              style={{
                marginBottom: "1rem",
                width: "100%",
                cursor: "pointer",
                border: "1px solid #cccccc",
                borderRadius: "8px",
                boxShadow: "0 0 5px #cccccc",
                marginTop: "1rem",
                backgroundColor: "white",
              }}
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <Option value="1">YES</Option>
              <Option value="0">NO</Option>
            </Select> */}

            {/* Additional Fields for Category-Specific Details */}

            <Button
              type="default"
              variant="solid"
              onClick={showModal}
              className="bg-gray-300 mt-2 font-semibold"
            >
              Additonal Details
            </Button>
            <Modal
              title="Additional Details"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okButtonProps={{
                style: {
                  backgroundColor: "#000000", // Change to your desired color
                  color: "white",
                  border: "none", // Optional: Remove border
                },
              }}
            >
              {/* Additional Fields for Category-Specific Details */}
              {selectedCategory && categoryDetails[selectedCategory] && (
                <div>
                  {categoryDetails[selectedCategory].map((detail, index) => (
                    <div key={index}>
                      <label>
                        {detail.key.charAt(0).toUpperCase() +
                          detail.key.slice(1)}

                        <input
                          type="text"
                          name={detail.key}
                          ref={(el) => (inputRefs.current[detail.key] = el)} // Assign ref
                          placeholder={`Enter ${detail.key}`}
                          className=" placeholder:text-slate-400 block bg-white text-black w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </Modal>

            <div className="form-buttons mt-5 mb-5">
              <button
                className="p-2 text-white w-auto bg-neutral-900 hover:bg-black hover:text-blue-200 rounded-lg shadow-md"
                onClick={handleCreate}
              >
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProducts;
