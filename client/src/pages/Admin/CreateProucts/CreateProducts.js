import React, { useState, useEffect, useRef } from "react";
import "./CreateProducts.css";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import { Button, ColorPicker, Image, Modal, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";
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
  const [images, setImages] = useState({});
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]); // Track the current color

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
      { key: "energy efficiency", value: "" }, // Replaced battery life with energy efficiency
      { key: "connectivity", value: "" },
    ],
    Furnitures: [
      { key: "material", value: "" },
      { key: "dimensions", value: "" },
      { key: "brand", value: "" },
      { key: "warranty", value: "" },
      { key: "weight capacity", value: "" }, // Replacing "weight" with capacity
      { key: "assembly required", value: "" },
    ],
    "Home Appliances": [
      { key: "brand", value: "" },
      { key: "model", value: "" },
      { key: "warranty", value: "" },
      { key: "energy efficiency", value: "" },
      { key: "power", value: "" },
      { key: "capacity", value: "" },
    ],
    Footwears: [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "material", value: "" },
      { key: "type", value: "" },
      { key: "sole type", value: "" },
      { key: "closure type", value: "" },
    ],
    "Ladies Footwear": [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "material", value: "" },
      { key: "type", value: "" },
      { key: "heel height", value: "" },
      { key: "occasion", value: "" },
    ],
    "Gents Footwear": [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "material", value: "" },
      { key: "type", value: "" },
      { key: "sole material", value: "" },
      { key: "water resistance", value: "" },
    ],
    Garments: [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "fabric", value: "" },
      { key: "type", value: "" },
      { key: "care instructions", value: "" },
      { key: "fit type", value: "" },
    ],
    "Ladies Collection": [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "fabric", value: "" },
      { key: "type", value: "" },
      { key: "pattern", value: "" },
      { key: "occasion", value: "" },
    ],
    "Gents Collection": [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "fabric", value: "" },
      { key: "type", value: "" },
      { key: "style", value: "" },
      { key: "fit type", value: "" },
    ],
    "Kids Collection": [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "fabric", value: "" },
      { key: "type", value: "" },
      { key: "care instructions", value: "" },
      { key: "age group", value: "" },
    ],
    "Kitchen Appliances": [
      { key: "brand", value: "" },
      { key: "model", value: "" },
      { key: "power", value: "" },
      { key: "warranty", value: "" },
      { key: "capacity", value: "" },
      { key: "energy efficiency", value: "" },
    ],
    Cookwares: [
      { key: "brand", value: "" },
      { key: "material", value: "" },
      { key: "size", value: "" },
      { key: "coating", value: "" },
      { key: "type", value: "" },
      { key: "heat compatibility", value: "" },
    ],
    "Cleaning Products": [
      { key: "brand", value: "" },
      { key: "type", value: "" },
      { key: "fragrance", value: "" },
      { key: "size", value: "" },
      { key: "material compatibility", value: "" },
      { key: "eco-friendly", value: "" },
    ],
    "Plastic Appliances": [
      { key: "brand", value: "" },
      { key: "material", value: "" },
      { key: "durability", value: "" },
      { key: "size", value: "" },
      { key: "recyclable", value: "" },
      { key: "heat resistance", value: "" },
    ],
    "Camping Products": [
      { key: "brand", value: "" },
      { key: "size", value: "" },
      { key: "material", value: "" },
      { key: "waterproof", value: "" },
      { key: "type", value: "" },
      { key: "durability", value: "" },
    ],
    Mobiles: [
      { key: "brand", value: "" },
      { key: "model", value: "" },
      { key: "storage", value: "" },
      { key: "battery capacity", value: "" },
      { key: "camera", value: "" },
      { key: "operating system", value: "" },
    ],
    Gadgets: [
      { key: "brand", value: "" },
      { key: "model", value: "" },
      { key: "type", value: "" },
      { key: "features", value: "" },
      { key: "battery life", value: "" },
      { key: "connectivity", value: "" },
    ],
    Perfumes: [
      { key: "brand", value: "" },
      { key: "fragrance", value: "" },
      { key: "volume", value: "" },
      { key: "gender", value: "" },
      { key: "type", value: "" },
      { key: "lasting hours", value: "" },
    ],
    "Beauty Products": [
      { key: "brand", value: "" },
      { key: "skin type", value: "" },
      { key: "ingredients", value: "" },
      { key: "type", value: "" },
      { key: "volume", value: "" },
      { key: "SPF protection", value: "" },
    ],
    Toys: [
      { key: "brand", value: "" },
      { key: "age group", value: "" },
      { key: "material", value: "" },
      { key: "type", value: "" },
      { key: "features", value: "" }, // Removed safety certifications
      { key: "color", value: "" },
    ],
    "Stationary Products": [
      { key: "brand", value: "" },
      { key: "type", value: "" },
      { key: "size", value: "" },
      { key: "material", value: "" },
      { key: "usage", value: "" },
      { key: "color", value: "" },
    ],
    // Add more categories as needed
  };

  const handleColorChange = (newColor) => {
    if (newColor && newColor.metaColor && newColor.metaColor.isValid) {
      const { r, g, b } = newColor.metaColor; // Extract RGB values
      // Convert RGB to Hex
      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .padStart(6, "0")}`;

      setSelectedColor(hex);

      // setColors(hex); // Set the color state to the hex value
      setColors((prevColors) => {
        // Add the new color only if it's not already in the array
        if (hex && !prevColors.includes(hex)) {
          return [...prevColors, hex]; // Add the new color to the array
        }
        return prevColors; // If color is already in the array, return the array unchanged
      });

      setImages((prevImages) => ({
        ...prevImages,
        [hex]: prevImages[hex] || [],
      }));
    }
  };
  // console.log(colors, "COLORS ARRAY");
  const handleBeforeUpload = (file) => {
    if (selectedColor) {
      // Use selectedColor instead of colors array or combination
      setImages((prevImages) => {
        const newImages = prevImages[selectedColor]
          ? [...prevImages[selectedColor], file]
          : [file];
        return {
          ...prevImages,
          [selectedColor]: newImages,
        };
      });
    } else {
      // Handle case where color is not set
      console.error("Please select a color before uploading an image.");
    }
    return false; // Prevent automatic upload
  };
  // Create product function
  // console.log(images, " IMAGES DATA");

  // Delete a color and its associated images
  const handleDeleteColor = (colorToDelete) => {
    setColors((prevColors) =>
      prevColors.filter((colors) => colors !== colorToDelete)
    );
    setImages((prevImages) => {
      const newImages = { ...prevImages };
      delete newImages[colorToDelete]; // Remove images for this color
      return newImages;
    });
  };
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
      // productData.append("color", color);
      productData.append("category", selectedCategoryID);

      // // Append images to FormData
      // images.forEach((img) => {
      //   productData.append("images", img);
      // });
      // Iterate over each color and its associated images
      let colorsArray = [];

      Object.keys(images).forEach((color) => {
        images[color].forEach((img) => {
          // Append color and image to the FormData
          productData.append("imageSet", img); // Append the image
          colorsArray.push(color); // Collect color for each image
          console.log(img, "------IMAGES------", color, "-------COLORS------");
        });
      });
      productData.append("colorsSet", JSON.stringify(colorsArray));

      console.log(images, " IMAGES DATA INSIDE");
      for (let [key, value] of productData.entries()) {
        console.log("KEY", key, "VALUE", value);
      }

      // Append category details to FormData
      categoryDetails[selectedCategory]?.forEach((detail) => {
        const value = inputRefs.current[detail.key]?.value || ""; // Get values from refs
        productData.append(detail.key, value); // Append to FormData
      });

      for (let pair of productData.entries()) {
        console.log(pair[0], pair[1]); // Logs each key-value pair in FormData
      }

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
                // onChange={handleColorChange}
                onChangeComplete={handleColorChange}
                size="large"
                showText
              />
            </label>

            <Upload
              // onPreview={onPreview}
              listType="picture-card"
              multiple
              beforeUpload={handleBeforeUpload}
              showUploadList={false} // This hides the uploaded images
            >
              <span
                className="
              text-[#0e0c0c]
              shadow-black"
              >
                + Upload Images
              </span>
            </Upload>

            <div>
              {Object.keys(images).map((colorKey) => (
                <div key={colorKey}>
                  <h3 className="flex items-center ">
                    Images for Color:
                    <span
                      className="inline-block w-5 h-5 rounded-lg border border-gray-400 ml-2 shadow-2xl drop-shadow-lg"
                      style={{ backgroundColor: colorKey }}
                    ></span>
                    <button
                      className="hover:bg-red-700/90 ml-4 px-[.2rem] bg-red-500 text-white rounded-lg"
                      onClick={() => handleDeleteColor(colorKey)}
                    >
                      Remove
                    </button>
                  </h3>
                  <div className="flex gap-4 rounded-lg">
                    {images[colorKey].map((image, index) => (
                      <Image
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="rounded-lg"
                        style={{ width: "100px", height: "100px" }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

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
                          className=" placeholder:text-slate-400 block bg-white text-black w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-black focus:ring-gray-300 focus:ring-1 sm:text-sm"
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
