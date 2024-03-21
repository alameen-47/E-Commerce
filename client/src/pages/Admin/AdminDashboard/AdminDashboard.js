import React from "react";
import "./AdminDashboard.css";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import { useAuth } from "../../../context/auth";
const AdminDashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout title={"Admin-Dashboard - Rawad Mall"}>
      <div className="admin-container">
      <div className="admin-container-content">
        <div className="row">
          <div className="col-1">
            <AdminMenu/>
          </div>
          <div className="col-2">
            <h1>Admin Name:- {auth?.user?.name}</h1>
            <h1>Admin Email:- {auth?.user?.email}</h1>
            <h1>Admin Contact:- {auth?.user?.phone}</h1>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
