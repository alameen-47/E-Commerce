import React from "react";

import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="UserMenu">
        <div class="grid  gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
          <div className="min-h-screen flex flex-row bg-gray-100">
            <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
              <div className="flex items-center justify-center h-20 shadow-md">
                <h1 className="text-3xl uppercase text-indigo-500">Logo</h1>
              </div>
              <ul className="flex flex-col py-4">
                <li>
                  <li className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className="bx bx-home" />
                    </span>
                    <span className="text-sm font-medium">
                      <NavLink to="/dashboard/user">
                        <h2>Profile</h2>
                      </NavLink>
                    </span>
                  </li>
                </li>
                <hr className="my-2 border-separate dark:border-gray-400" />
                <li>
                  <li className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className="bx bx-log-out" />
                    </span>
                    <span className="text-sm font-medium">
                      <NavLink to="/dashboard/user/edit-profile">
                        Edit Profile
                      </NavLink>
                    </span>
                  </li>
                </li>
                <hr className="my-2 border-separate dark:border-gray-400" />
                <li>
                  <li className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className="bx bx-log-out" />
                    </span>
                    <span className="text-sm font-medium">All Orders</span>
                  </li>
                </li>
                <hr className="my-2 border-separate dark:border-gray-400" />
                <li>
                  <li className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className="bx bx-log-out" />
                    </span>
                    <span className="text-sm font-medium">Logout</span>
                  </li>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
