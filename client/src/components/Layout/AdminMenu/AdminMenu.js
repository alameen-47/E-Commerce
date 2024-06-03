import React, { useState } from "react";
import p1 from "./icons8-admin-90.png";
import p2 from "./icons8-create-order-90.png";
import p3 from "./noun-add-product-3848212.png";
import p4 from "./noun-products-2804214.png";
import p5 from "./icons8-users-90.png";
import p6 from "./order-delivery.png";
import "flowbite";

import { Link, NavLink } from "react-router-dom";

<meta name="viewport" content="width=device-width, initial-scale=1.0" />;

const AdminMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="items-center   p-2 text-sm text-gray-500 rounded-lg md:hidden  hover:bg-gray-100 ">
        {open ? (
          <svg
            color="black"
            onClick={() => setOpen(false)}
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="2em"
            width="2em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 0 0 0 13.8z"></path>
          </svg>
        ) : (
          <svg
            className=""
            color="black"
            size={27}
            onClick={() => setOpen(true)}
            stroke="black"
            fill="currentColor"
            stroke-width="3"
            viewBox="0 0 1024 1024"
            height="2em"
            width="2em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path>
          </svg>
        )}
      </div>

      <aside
        className={`${open ? "hidden" : "block   left-0    w-screen"}`}
        id="sidebar-multi-level-sidebar"
        class="flex top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-full sm:translate-x-0 "
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 relative overflow-y-auto bg-black">
          <ul class="space-y-2 font-medium ">
            <li className="border-b">
              <div class="flex text-center items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ">
                <img
                  src={p1}
                  alt=""
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white invert"
                />
                <span class="ms-3 align-middle text-base font-semibold">
                  <NavLink to="">
                    <h2 className="m-0">ِAdmin Dashboard</h2>
                  </NavLink>
                </span>
              </div>
            </li>
            <li>
              <div class="flex text-center items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img
                  src={p2}
                  alt=""
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white invert"
                />

                <span class="ms-3 align-middle text-base font-semibold">
                  <NavLink to="/dashboard/admin/create-category">
                    <h2 className="m-0">Create Category</h2>
                  </NavLink>
                </span>
              </div>
            </li>
            <li>
              <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img
                  src={p3}
                  alt=""
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white invert"
                />
                <span class="flex-1 ms-3   whitespace-nowrap">
                  <NavLink to="/dashboard/admin/create-product">
                    <h2 className="mb-0">Create Product</h2>
                  </NavLink>
                </span>
              </div>
            </li>
            <li>
              <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img
                  src={p4}
                  alt=""
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white invert"
                />
                <span class="flex-1 ms-3 whitespace-nowrap">
                  <NavLink to="/dashboard/admin/products">
                    <h2 className="mb-0">Products</h2>
                  </NavLink>
                </span>
              </div>
            </li>
            <li>
              <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img
                  src={p5}
                  alt=""
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white invert"
                />
                <span class="flex-1 ms-3 whitespace-nowrap">
                  <NavLink to="/dashboard/admin/users">
                    <h2 className="mb-0">Users</h2>
                  </NavLink>
                </span>
              </div>
            </li>
            <li>
              <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img
                  src={p6}
                  alt=""
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white invert"
                />

                <span class="flex-1 ms-3 whitespace-nowrap">
                  <NavLink to="/dashboard/admin/orders">
                    <h2 className="mb-0">Orders</h2>
                  </NavLink>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminMenu;
