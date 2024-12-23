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
  Input,
} from "antd";
import { runes } from "runes2";

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
  const [images, setImages] = useState({});
  const [colors, setColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryID, setSelectedCategoryID] = useState("");
  const [id, setId] = useState("");
  const [fetchedCategoryDetails, setFetchedCategoryDetails] = useState({});
  const [fetchedCategoryName, setFetchedCategoryName] = useState();
  const [fetchedProductDetails, setFetchedProductDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState([]); // Track the current color
  const [prevImages, setPrevImages] = useState();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
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

      if (Array.isArray(data?.product?.images)) {
        const newImages = data?.product?.images?.flatMap((imageObj) =>
          imageObj?.imageSet?.map((img) => {
            const transformedImage = {
              ...img,
              color: imageObj.colors, // Assuming each imageObj has a color field
              filePath: `http://localhost:8085/uploads/${img.filePath}`,
            };
            // Log each transformed image object with the color
            // console.log(transformedImage, "TRANSFORMED IMAGE");

            return transformedImage;
          })
        );
        setPrevImages(newImages);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(prevImages, "<<<<<<<<<<<<<<PREVIOUS IMAGES??????????????????");

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
      productData.append("category", selectedCategoryID);

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
      <div className="container flex lg:flex-row sm:flex-col lg:gap-10  sm:gap-0">
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
                  className=" placeholder:text-slate-400 font-medium block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
                  onChangeComplete={handleColorChange}
                  size="large"
                  showText
                />
              </label>
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
                <Button
                  className="bg-black text-white drop-shadow-md"
                  onClick={showLoading}
                >
                  Exisiting Images
                </Button>
                <div className="product-images flex gap-3 overflow-auto">
                  {/* Assuming fetchedProductDetails['image'] contains an array of image objects */}
                  <Modal
                    title="Previous Images"
                    loading={loading}
                    open={open}
                    onCancel={() => setOpen(false)}
                  >
                    {prevImages?.length > 0 &&
                      prevImages.map((img, index) => (
                        <Image
                          key={index}
                          width={100}
                          src={`data:${img.contentType};base64,${img.data}`} // Displaying image as base64
                          alt={img.alt || `Product Image ${index + 1}`} // Fallback alt text
                        />
                      ))}
                  </Modal>
                </div>
              </span>
              <Upload
                className="mt-2"
                onPreview={onPreview}
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
                  + Upload New Images
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

              <label className="relative flex flex-col mt-5 font-semibold">
                Description :
                <span
                  className="
              text-gray-600
            
              overflow-auto
              "
                >
                  Before:{fetchedProductDetails?.description}
                </span>
                <textarea
                  className=" placeholder:text-slate-400 font-medium   bg-white text-black w-full h-40 flex border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
                  className=" placeholder:text-slate-400 font-medium block bg-white text-black w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
                <Input
                  className=" placeholder:text-slate-400 block bg-white text-black w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  value={offer}
                  placeholder="Offer in %"
                  onChange={(e) => {
                    const value = e.target.value;
                    // Check if the input has 2 or fewer digits and is a number

                    setOffer(value);
                  }}
                  count={{
                    // show: true,
                    max: 2,
                    strategy: (txt) => runes(txt).length,
                    exceedFormatter: (txt, { max }) =>
                      runes(txt).slice(0, max).join(""),
                  }}
                  defaultValue=""
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
                  className=" placeholder:text-slate-400 font-medium block bg-white text-black w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
              {fetchedCategoryName && categoryDetails[selectedCategory] && (
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
                          className=" placeholder:text-slate-400 font-medium block bg-white text-black w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
