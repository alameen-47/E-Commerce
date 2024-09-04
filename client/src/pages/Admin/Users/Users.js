import React, { useEffect, useState } from "react";
import "./Users.css";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/auth/all-users");
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
            <div className="mt-4">
              {/* Display the list of users */}
              {users.length > 0 ? (
                <ul className="space-y-4">
                  {users.map((user) => (
                    <li key={user._id} className="p-4 border rounded-md">
                      <p>
                        <strong>Name:</strong> {user.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p>
                        <strong>Mobile:</strong> {user.mobile}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No users found.</p>
              )}
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Users;
