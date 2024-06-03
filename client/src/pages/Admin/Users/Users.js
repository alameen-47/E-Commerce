import React from "react";
import "./Users.css";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";

const Users = () => {
  return (
    <Layout>
      <>
        <div className=" flex lg:flex-row sm:flex-col lg:gap-10 sm:gap-0 ">
          <div className="">
            <AdminMenu />
          </div>
          <div className="">
            <h1 className="lg:text-3xl lg:font-extrabold  sm:text-xl sm:font-bold">
              All Users
            </h1>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Users;
