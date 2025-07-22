import React, { useEffect, useState } from "react";
import "./Users.css";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";
import { API_BASE_URL } from "../../../utilities/api";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/auth/all-users`
        );
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching all Users", error);
      }
    };
    fetchUsers();
  }, []);

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
            <div className="mt-4 h-screen overflow-scroll">
              {/* Display the list of users */}
              {users.length > 0 ? (
                <ul className="space-y-4 grid grid-cols-1 sm:grid-cols- md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {users.map((user) => (
                    <li
                      key={user._id}
                      className="p-5 bg-white w-full max-w-xs mx-auto border border-gray-200 rounded-md hover:bg-gray-100 shadow-lg"
                    >
                      <p className="mb-1 break-words">
                        <strong>Name:</strong> {user.name}
                      </p>
                      <p className="mb-1 break-words">
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p className="mb-1 break-words">
                        <strong>Mobile:</strong> {user.phone}
                      </p>
                      <p className="mb-1 break-words">
                        <strong>Address:</strong> {user.address}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mb-0">No users found.</p>
              )}
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Users;
