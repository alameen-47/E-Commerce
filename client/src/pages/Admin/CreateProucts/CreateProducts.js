import React, { useState, useEffect } from "react";
import "./CreateProducts.css";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import slug from "slugify";

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

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("slug", slug);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("offer", offer);
      productData.append("quantity", quantity);
      productData.append("image", image);
      productData.append("category", category);

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
        <div className="relative !important">
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
              className="form-select"
              style={{
                marginBottom: "1rem",
                width: "100%",
                cursor: "pointer",
                border: "1px solid #cccccc",
                borderRadius: "8px",
                boxShadow: "0 0 5px #cccccc",
              }}
              onChange={(value) => {
                setCategory(value);
              }}
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
                  border: "1px solid Black",
                  padding: "0.2em",
                  backgroundColor: "rgb(206, 205, 200)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem",
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
            <div style={{ textAlign: "center" }}>
              {image && (
                <img
                  className="w-16 md:w-32 lg:w-48 inline m-4"
                  src={URL.createObjectURL(image)}
                  alt="Product_Image"
                  width="50%"
                  height="auto"
                  style={{ margin: ".2rem" }}
                />
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
            <label className="relative block mt-5">
              <textarea
                className=" placeholder:text-slate-400 placeholder:t-2  bg-slate-200 w-full h-40 flex border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
                value={offer}
                placeholder="Offer in %"
                onChange={(e) => setOffer(e.target.value)}
              />
            </label>
            <label className="relative block mt-5">
              <input
                className=" placeholder:text-slate-400 block bg-slate-200 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="number"
                value={quantity}
                placeholder="Enter the Quantity"
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
                border: "1px solid #cccccc",
                borderRadius: "8px",
                boxShadow: "0 0 5px #cccccc",
                marginTop: "1rem",
              }}
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <Option value="1">YES</Option>
              <Option value="0">NO</Option>
            </Select>
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

// import React, { useState, useEffect } from "react";
// import "./CreateProducts.css";
// import toast from "react-hot-toast";
// import axios from "axios";
// import Layout from "../../../components/Layout/Layout";
// import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
// import { Select } from "antd";
// import { useNavigate } from "react-router-dom";
// // import { text } from "express";
// const { Option } = Select;

// const CreateProducts = () => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [offer, setOffer] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [shipping, setShipping] = useState("");
//   const [image, setImage] = useState("");

//   // New states for translations
//   const [translations, setTranslations] = useState({
//     en: { name: "", description: "" },
//     es: { name: "", description: "" },
//     fr: { name: "", description: "" },
//     de: { name: "", description: "" },
//   });

//   const handleTranslationChange = (lang, field, value) => {
//     setTranslations((prev) => ({
//       ...prev,
//       [lang]: {
//         ...prev[lang],
//         [field]: value,
//       },
//     }));
//   };

//   //get all categories
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/all-category");
//       if (data?.success) {
//         setCategories(data?.categories);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Oops!!Something Went Wrong in getting Category!");
//     }
//   };
//   useEffect(() => {
//     getAllCategory();
//   }, []);

//   //create product function
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const productData = new FormData();
//       productData.append("name", name);
//       productData.append("description", description);
//       productData.append("price", price);
//       productData.append("offer", offer);
//       productData.append("quantity", quantity);
//       productData.append("image", image);
//       productData.append("category", category);
//       productData.append("translations", JSON.stringify(translations));

//       const { data } = await axios.post(
//         "/api/v1/product/create-product",
//         productData
//       );
//       if (data?.success) {
//         navigate("/dashboard/admin/products");
//         toast.success("Product Created Succesfully");
//       } else {
//         toast.error(data?.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something Went Wrong");
//     }
//   };

//   return (
//     <Layout title={"Admin Dashboard-Create product "}>
//       <>
//         <div className="container flex lg:flex-row sm:flex-col lg:gap-10 sm:gap-0 ">
//           <div className="relative !important">
//             <AdminMenu />
//           </div>
//           <div className="lg:w-screen sm:left-0 sm:w-screen sm:overflow-hidden !important ">
//             <h1 className="lg:text-3xl lg:font-extrabold  sm:text-xl sm:font-bold">
//               Create Products
//             </h1>
//             <div style={{ margin: "1px", width: "100%" }}>
//               <Select
//                 bordered={false}
//                 placeholder="Select a Category"
//                 size="large"
//                 className="form-select"
//                 style={{
//                   marginBottom: "1rem",
//                   width: "100%",
//                   cursor: "pointer",
//                   border: "1px Solid #cccccc",
//                   borderRadius: "8px",
//                   borderShadow: " #cccccc",
//                 }}
//                 onChange={(value) => {
//                   setCategory(value);
//                 }}
//               >
//                 {categories?.map((c) => (
//                   <Option key={c._id} value={c._id}>
//                     {c.name}
//                   </Option>
//                 ))}
//               </Select>
//               <div style={{ justifyContent: "center" }}>
//                 <label
//                   style={{
//                     border: "1px Solid Black",
//                     padding: "0.2em",
//                     backgroundColor: " rgb(206, 205, 200)",
//                     cursor: "pointer",
//                     display: "flex",
//                     justifyContent: "center",
//                     bottom: "10px",
//                   }}
//                 >
//                   {image ? image.name : "Upload Image"}
//                   <input
//                     type="file"
//                     name="Image"
//                     accept="image/*"
//                     onChange={(e) => setImage(e.target.files[0])}
//                     hidden
//                   />
//                 </label>
//               </div>
//               <div style={{}}>
//                 {image && (
//                   <div style={{ textAlign: "center" }}>
//                     <img
//                       className="w-16 md:w-32 lg:w-48 inline m-4"
//                       src={URL.createObjectURL(image)}
//                       alt="Product_Image"
//                       width="50%"
//                       height="auto"
//                       margin=".2rem"
//                     />
//                   </div>
//                 )}
//               </div>
//               <label className="relative block mt-5">
//                 <input
//                   className=" placeholder:text-slate-400 block bg-slate-200 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
//                   type="text"
//                   value={name}
//                   placeholder="Write a Name for Product"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </label>
//               <label className="relative block mt-5">
//                 <textarea
//                   className=" placeholder:text-slate-400  placeholder:t-2 block bg-slate-200 w-full h-40 flex 	 border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
//                   type="text"
//                   value={description}
//                   placeholder="Write a Description"
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </label>
//               <label className="relative block mt-5">
//                 <input
//                   className=" placeholder:text-slate-400 block bg-slate-200 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
//                   type="number"
//                   value={price}
//                   placeholder="Write a Price"
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </label>
//               <label className="relative block mt-5">
//                 <input
//                   className=" placeholder:text-slate-400 block bg-slate-200 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
//                   type="number"
//                   value={offer}
//                   placeholder="Offer in %"
//                   onChange={(e) => setOffer(e.target.value)}
//                 />
//               </label>
//               <label className="relative block mt-5">
//                 <input
//                   className=" placeholder:text-slate-400 block bg-slate-200 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
//                   type="number"
//                   value={quantity}
//                   placeholder="Enter the Quantity"
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//               </label>
//               <Select
//                 bordered={false}
//                 placeholder="Shipping"
//                 size="large"
//                 className="form-select"
//                 style={{
//                   marginBottom: "1rem",
//                   width: "100%",
//                   cursor: "pointer",
//                   border: "1px Solid #cccccc",
//                   borderRadius: "8px",
//                   borderShadow: " #cccccc",
//                   marginTop: "1rem",
//                 }}
//                 onChange={(value) => {
//                   setShipping(value);
//                 }}
//               >
//                 <Option value="1">YES</Option>
//                 <Option value="0">NO</Option>
//               </Select>
//             </div>
//             <div className="my-3">
//               <button className="btn btn-btn-primary" onClick={handleCreate}>
//                 CREATE PRODUCT
//               </button>
//             </div>
//           </div>
//         </div>
//       </>
//     </Layout>
//   );
// };

// export default CreateProducts;
