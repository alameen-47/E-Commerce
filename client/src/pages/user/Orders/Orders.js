import React from "react";
import './Orders.css'
import Layout from "../../../components/Layout/Layout";
import UserMenu from "../../../components/Layout/UserMenu/UserMenu";

const Orders = () => {
  return (
    <Layout title={"Your Orders"}>
      <div className="user-orders-container">
        <div className="user-orders-container-content">
          <div className="row">
            <div className="col-1">
              <UserMenu />
            </div>
            <div className="col-2">
              <h1>All Orders</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
