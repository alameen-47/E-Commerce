import { React, useEffect, useState } from "react";
import "./CreateCategory.css";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu.js";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../../components/Form/CategoryForm.js";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [icons, setIcons] = useState("");
  const navigate = useNavigate();

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryData = new FormData();
      categoryData.append("name", name);
      categoryData.append("icons", icons);

      const { data } = await axios.post(
        "/api/v1/category/create-category",
        categoryData
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
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

  //update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
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
      <div className="admin-createCategory-container">
        <div className="admin-createCategory-container-content">
          <div className="row">
            <div className="col-1">
              <AdminMenu />
            </div>
            <div className="col-2">
              <h1>Manage Category</h1>
              <div style={{ padding: "30px" }}>
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
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
                  {icons ? icons.name : "Upload icons"}
                  <input
                    type="file"
                    name="icons"
                    accept="icons/*"
                    onChange={(e) => setIcons(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div style={{}}>
                {icons && (
                  <div style={{ textAlign: "center" }}>
                    <img
                      className="w-16 md:w-32 lg:w-48 inline m-4"
                      src={URL.createObjectURL(icons)}
                      alt="Category_icons"
                      width="50%"
                      height="auto"
                      margin=".2rem"
                    />
                  </div>
                )}
              </div>
              <div className="table">
                <div class="table-wrapper">
                  <table className="fl-table">
                    <thead>
                      <tr className="">
                        <th>Name</th>
                        <th className="bg-gray-200 ">Icons</th>
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
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
