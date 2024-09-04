import { React, useEffect, useState } from "react";
import "./CreateCategory.css";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu.js";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../../components/Form/CategoryForm.js";
import { Modal, Upload } from "antd";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [icons, setIcons] = useState("");
  const [updatedicons, setUpdatedIcons] = useState("");
  const [images, setImages] = useState("");
  const [updatedimages, setUpdatedImages] = useState("");
  const navigate = useNavigate();

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryData = new FormData();
      categoryData.append("name", name);
      categoryData.append("icons", icons);
      categoryData.append("images", images);

      const { data } = await axios.post(
        "/api/v1/category/create-category",
        categoryData
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setName("");
        setIcons("");
        setImages("");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong in Input Form");
    }
  };

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

  // //update Category
  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const categoryData = new FormData();
  //     categoryData.append("name", updatedName);
  //     categoryData.append("icons", updatedicons);
  //     categoryData.append("images", updatedimages);

  //     const { data } = await axios.put(
  //       `/api/v1/category/update-category/${selected._id}`,
  //       categoryData
  //     );
  //     if (data.success) {
  //       toast.success(`${updatedName} is updated`);
  //       setSelected(null);
  //       setUpdatedName("");
  //       setUpdatedIcons("");
  //       setUpdatedImages("");
  //       setVisible(false);
  //       getAllCategory();
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Something Went Wrong");
  //   }
  // };

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //delete Category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout title={"Admin Dashboard-Create category "}>
      <div className=" flex lg:flex-row sm:flex-col  sm:gap-0 ">
        {/* Menu */}
        <div className="flex">
          <AdminMenu />
        </div>
        {/* Content */}
        <div className="lg:w-screen sm:left-0 sm:w-screen sm:overflow-hidden !important ">
          <h1 className="lg:text-3xl lg:font-extrabold  sm:text-xl sm:font-bold">
            Manage Category
          </h1>
          <div style={{ padding: "30px" }}>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setIcons(file); // Save the selected icon file
              return false; // Prevent automatic upload
            }}
          >
            + Upload Icon
          </Upload>
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setImages(file); // Save the selected image file
              return false; // Prevent automatic upload
            }}
          >
            + Upload Image
          </Upload>

          <div className="flex justify-center align-middle gap-4">
            <div className=" overflow-y-auto  sm:flex sm:items-center sm:align-middle sm:justify-center w-screen">
              <div class="table-wrapper" className=" h-[80vh] w-screen ">
                <table className="fl-table">
                  <thead className="">
                    <tr className="sm:w-screen  sticky">
                      <th>Name</th>
                      <th className="bg-gray-200 ">Icons</th>
                      <th className="bg-gray-200 ">Images</th>
                      <th className="bg-black text-white ">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <img
                              src={`/api/v1/category/categories-icons/${c._id}`}
                              style={{
                                transform:
                                  "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
                              }}
                              className="w-14 card1img aspect-square text-[#000000] group-hover:bg-gray-200 text-5xl rounded-s p-2 transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2  mx-auto"
                              alt=""
                            ></img>
                          </td>
                          <td>
                            <img
                              src={`/api/v1/category/categories-images/${c._id}`}
                              style={{
                                transform:
                                  "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
                              }}
                              className="w-14 card1img aspect-square text-[#000000] group-hover:bg-gray-200 text-5xl rounded-s p-2 transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2  mx-auto"
                              alt=""
                            ></img>
                          </td>

                          <td>
                            <button
                              className="btn-btn-primary"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn-btn-primary"
                              style={{ color: "red", marginLeft: "1em" }}
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Modal
          onCancel={() => setVisible(false)}
          footer={null}
          visible={visible}
        >
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setUpdatedIcons(file); // Save the selected icon file
              return false; // Prevent automatic upload
            }}
          >
            + Upload Icon
          </Upload>
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setUpdatedImages(file); // Save the selected image file
              return false; // Prevent automatic upload
            }}
          >
            + Upload Image
          </Upload>
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;
