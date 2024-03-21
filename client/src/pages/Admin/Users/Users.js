import React from "react";
import "./Users.css";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";

const Users = () => {
  return (
    <Layout>
    <>
      <div className="admin-users-container">
        <div className="admin-users-container-content">
          <div className="row">
            <div className="col-1">
              <AdminMenu />
            </div>
            <div className="col-2">
              <h1>All Users</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  </Layout>
  );
};

export default Users;
