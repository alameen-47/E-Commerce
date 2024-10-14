import React, { useState, useEffect, useRef } from "react";
import "./UpdateProduct.css";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import {
  Button,
  Select,
  UploadImage,
  ColorPicker,
  Modal,
  Popconfirm,
  Upload,
  Image,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryID, setSelectedCategoryID] = useState("");
  const [id, setId] = useState("");
  const [fetchedCategoryDetails, setFetchedCategoryDetails] = useState({});
  const [fetchedCategoryName, setFetchedCategoryName] = useState();
  const [fetchedProductDetails, setFetchedProductDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const inputRefs = useRef({});

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
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}/${params.pid}`
      );
      console.log(typeof data.product, "UPDATE VALUES", data.product);

      setFetchedProductDetails(data.product);
      setFetchedCategoryName(data.product.category.name);
      setFetchedCategoryDetails(data.product.categoryDetails);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    console.log(categoryDetails, "Categrory Details on state");
  }, []);

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

  console.log(fetchedProductDetails, "FETCHED DETAILS STORED ON STATE");
  // Create product function
  const handleUpdate = async (e) => {
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

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        navigate("/dashboard/admin/products");
        toast.success("Product Updated Successfully");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  //delete product function
  const handleDelete = async (req, res) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Succesfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title={"Admin Dashboard - Update product"}>
      <div className="container flex lg:flex-row sm:flex-col lg:gap-10 sm:gap-0">
        <div className="relative !important h-sc">
          <AdminMenu />
        </div>
        <div className="lg:w-screen sm:left-0 sm:w-screen sm:overflow-hidden !important">
          <h1 className="lg:text-3xl lg:font-extrabold sm:text-xl sm:font-bold">
            Update Products
          </h1>
          <div style={{ margin: "1px", width: "100%" }}>
            {/* {fetchedProductDetails?.map((p) => {})} */}
            <div className="flex flex-col ">
              <label
                className="
              font-semibold
              "
              >
                Category :
              </label>
              <span
                className="
              text-gray-600
              font-mono
              
              "
              >
                Before:{fetchedProductDetails?.category.name}
              </span>
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
              <label
                className="
              font-semibold
              "
              >
                Images :
              </label>
              <span
                className="
              text-gray-600
              font-mono
              
              "
              >
                Before:
                <div className="product-images flex gap-3 overflow-auto">
                  {fetchedProductDetails && fetchedProductDetails["image"] ? ( // Check if fetchedProductDetails is not null and contains the 'image' key
                    <Image.PreviewGroup
                      preview={{
                        onChange: (current, prev) =>
                          console.log(
                            `current index: ${current}, prev index: ${prev}`
                          ),
                      }}
                    >
                      {/* Assuming fetchedProductDetails['image'] contains an array of image objects */}
                      {fetchedProductDetails["image"].map((img, index) => (
                        <Image
                          key={index}
                          width={100}
                          src={`data:${img.contentType};base64,${img.data}`} // Displaying image as base64
                          alt={img.alt || `Product Image ${index + 1}`} // Fallback alt text
                        />
                      ))}
                    </Image.PreviewGroup>
                  ) : (
                    <p>No images available.</p> // Optional: Message to display if no images are found
                  )}
                </div>
              </span>
              <Upload
                className="mt-2"
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
                  + Upload New Images
                </span>
              </Upload>
              <label className="relative flex flex-col mt-5 font-semibold ">
                Name :
                <span
                  className="
              text-gray-600
              font-mono
              
              "
                >
                  Before:{fetchedProductDetails?.name}
                </span>
                <input
                  className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  type="text"
                  value={name}
                  placeholder="Enter a Name for Product"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className=" flex-col  align-middle items-start flex mt-5 font-semibold ">
                Color :
                <br />
                <span
                  className="
              text-gray-600
              font-mono "
                >
                  <div className="flex ">
                    Before:
                    {fetchedProductDetails && fetchedProductDetails?.color ? (
                      <ColorPicker
                        defaultValue={
                          fetchedProductDetails && fetchedProductDetails?.color
                        }
                        disabled
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </span>
                <ColorPicker
                  defaultValue="#000000"
                  onChange={(color) => setColor(color.hex)}
                  size="large"
                  showText
                />
              </label>
              <label className="relative flex flex-col mt-5 font-semibold">
                Description :
                <span
                  className="
              text-gray-600
              font-mono
              overflow-auto
              "
                >
                  Before:{fetchedProductDetails?.description}
                </span>
                <textarea
                  className=" placeholder:text-slate-400 placeholder:t-2  bg-white text-black w-full h-40 flex border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  type="text"
                  value={description}
                  placeholder="Enter a Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <label className="relative flex flex-col mt-5 font-semibold">
                Price:
                <span
                  className="
              text-gray-600
              font-mono
              
              "
                >
                  Before:{fetchedProductDetails?.price}
                </span>
                <input
                  className=" placeholder:text-slate-400 block bg-white text-black w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  type="number"
                  value={price}
                  placeholder="Enter a Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <label className="relative flex flex-col mt-5 font-semibold">
                Offer:
                <span
                  className="
              text-gray-600
              font-mono
              
              "
                >
                  Before:{fetchedProductDetails?.offer}%
                </span>
                <input
                  className=" placeholder:text-slate-400 block bg-white text-black w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  type="number"
                  value={offer}
                  placeholder="Offer in %"
                  onChange={(e) => setOffer(e.target.value)}
                />
              </label>
              <label className="relative flex flex-col mt-5 font-semibold">
                Quantity:
                <span
                  className="
              text-gray-600
              font-mono
              
              "
                >
                  Before:{fetchedProductDetails?.quantity}
                </span>
                <input
                  className=" placeholder:text-slate-400 block bg-white text-black w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  type="number"
                  value={quantity}
                  placeholder="Enter the Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </label>
            </div>
            <Button
              type="
            primary"
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
              {fetchedCategoryName && categoryDetails[fetchedCategoryName] && (
                <div>
                  {categoryDetails[fetchedCategoryName].map((detail, index) => (
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
              <div className="my-3">
                <button
                  className="btn btn-btn-primary hover:text-black "
                  onClick={handleUpdate}
                >
                  UPDATE PRODUCT
                </button>
              </div>

              <div className="form-buttons mt-5 mb-5">
                <Popconfirm
                  title="Delete the Product"
                  description="Are you sure to delete this Product?"
                  onConfirm={handleDelete} // Call handleDelete on confirmation
                  className="btn btn-btn-primary !text-red-600 "
                >
                  <Button className="btn btn-btn-primary !text-red-600">
                    DELETE PRODUCT
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
