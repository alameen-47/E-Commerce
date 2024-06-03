import { React, useState } from "react";

import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/auth";

const UserMenu = () => {
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Signed Out Successfully");
  };
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
      <div className={`${open ? "hidden" : "block    left-0 h-[40%] w-auto"}`}>
        <div class="grid lg:block   gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
          <div className="lg:h-screen  flex flex-row bg-gray-100">
            <div className="flex flex-col lg:w-56 sm:w-screen bg-slate-200 rounded-sm overflow-hidden">
              <div className="flex items-center justify-center h-20 shadow-md">
                <h1 className="lg:text-3xl sm:text-2xl uppercase text-black font-bold">
                  Dashboard
                </h1>
              </div>
              <ul className="flex flex-col py-4">
                <li>
                  <li className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className="bx bx-home" />
                    </span>
                    <span className="sm:text-sm lg:text-lg font-medium">
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
                    <span className="sm:text-sm lg:text-lg font-medium">
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
                    <span className="sm:text-sm lg:text-lg font-medium">
                      <NavLink to="/dashboard/user/orders">Orders</NavLink>
                    </span>
                  </li>
                </li>
                <hr className="my-2 border-separate dark:border-gray-400" />
                <li>
                  <li className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className="bx bx-log-out" />
                    </span>
                    <button
                      onClick={handleLogout}
                      className="sm:text-sm lg:text-lg font-medium"
                    >
                      <NavLink to="/signin">Logout</NavLink>
                    </button>
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
