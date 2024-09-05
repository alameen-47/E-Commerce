import React, { useState, useEffect } from "react";
import "./UpdateProduct.css";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;
const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setCategory(data.product.category._id);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();

    //eslint-disable-next-line
  }, []);

  //get all categories
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

  //update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);

      productData.append("quantity", quantity);
      productData.append("shipping", shipping);

      image && productData.append("image", image);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Succesfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  //delete product function
  const handleDelete = async (req, res) => {
    try {
      let answer = window.prompt("Are You Sure want to Delete this Product");
      if (!answer) return;
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
    <Layout title={"Admin Dashboard-Create product "}>
      <>
        <div className="container flex lg:flex-row sm:flex-col lg:gap-10 sm:gap-0">
          <div className="relative !important h-sc">
            <AdminMenu />
          </div>
          <div className="lg:w-screen sm:left-0 sm:w-screen sm:overflow-hidden !important">
            <h1 className="lg:text-3xl lg:font-extrabold sm:text-xl sm:font-bold">
              Create Products
            </h1>
            <Select
              bordered={false}
              placeholder="Select a Category"
              size="large"
              className="form-select"
              style={{
                marginBottom: "1rem",
                width: "100%",
                cursor: "pointer",
                border: "1px Solid #cccccc",
                borderRadius: "8px",
                borderShadow: " #cccccc",
              }}
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div style={{ justifyContent: "center" }}>
              <label
                style={{
                  border: "1px Solid Black",
                  padding: "0.2em",
                  backgroundColor: " rgb(206, 205, 200)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  bottom: "10px",
                }}
              >
                {image ? image.name : "Upload Image"}
                <input
                  type="file"
                  name="Image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div>
              {image ? (
                <div style={{ textAlign: "center" }}>
                  <img
                    className="w-16 md:w-32 lg:w-48 inline m-4"
                    src={URL.createObjectURL(image)}
                    alt="Product_Image"
                    width="50%"
                    height="auto"
                    margin=".2rem"
                  />
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <img
                    className="w-16 md:w-32 lg:w-48 inline m-4"
                    src={`/api/v1/product/product-image/${id}`}
                    alt="Product_Image"
                    width="50%"
                    height="auto"
                    margin=".2rem"
                  />
                </div>
              )}
            </div>

            <label className="relative block mt-5">
              <input
                className=" placeholder:text-slate-400 block bg-slate-200 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="text"
                value={name}
                placeholder="Write a Name for Product"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className=" . relative block mt-5">
              <textarea
                className=" placeholder:text-slate-400  placeholder:t-2 block bg-slate-200 w-full h-40 flex 	 border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="text"
                value={description}
                placeholder="Write a Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label className="relative block mt-5">
              <input
                className=" placeholder:text-slate-400 block bg-slate-200 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="number"
                value={price}
                placeholder="Write a Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label className="relative block mt-5">
              <input
                className=" placeholder:text-slate-400 block bg-slate-200 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="number"
                value={quantity}
                placeholder="Write the Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>
            <Select
              bordered={false}
              placeholder="Shipping"
              size="large"
              className="form-select"
              style={{
                marginBottom: "1rem",
                width: "100%",
                cursor: "pointer",
                border: "1px Solid #cccccc",
                borderRadius: "8px",
                borderShadow: " #cccccc",
                marginTop: "1rem",
              }}
              onChange={(value) => {
                setShipping(value);
              }}
              value={shipping ? "YES" : "NO"}
            >
              <Option value="1">YES</Option>
              <Option value="0">NO</Option>
            </Select>
          </div>
          <div className="my-3">
            <button className="btn btn-btn-primary" onClick={handleUpdate}>
              UPDATE PRODUCT
            </button>
          </div>
          <div className="my-3">
            <button
              className="btn btn-btn-primary !text-red-600"
              onClick={handleDelete}
            >
              DELETE PRODUCT
            </button>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default UpdateProduct;
