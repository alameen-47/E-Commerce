import React from "react";
import "./AdminMenu.css";
import { NavLink } from "react-router-dom";
<meta name="viewport" content="width=device-width, initial-scale=1.0" />


const AdminMenu = () => {
  return (
    <>
      <div className="AdminMenu">
        <h1>Admin Menu</h1>
        <ul>
          <li>
            <NavLink to="/dashboard/admin/create-category">
              <h2>Create Category</h2>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/create-product">
              <h2>Create Product</h2>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/products">
              <h2>Products</h2>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/users"><h2>Users</h2></NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
