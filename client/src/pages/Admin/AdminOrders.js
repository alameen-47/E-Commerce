import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/orders/all-orders");
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("----------", orders, "============");
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `/api/v1/auth/orders-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders"}>
      <>
        <div className=" flex lg:flex-row sm:flex-col lg:gap-10 sm:gap-0 ">
          <div className="">
            <AdminMenu />
          </div>

          <div class="bg-slate-300 lg:w-screen h-screen overflow-y-scroll shadow rounded-lg border">
            <div class="lg:col-span-2 px-4 py-5 sm:px-0">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <p className="sm:text-lg lg:text-2xl">Your Orders</p>
              </div>
              {/* <p className="text-pretty">{JSON.stringify(orders, null, 4)}</p> */}
              {orders?.map((o, i) => {
                return (
                  <div class="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                    <table class="w-full table-fixed">
                      <thead>
                        <tr class="bg-gray-100 ">
                          <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                            #
                          </td>
                          <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                            Status
                          </td>
                          <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                            Buyer
                          </td>
                          <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                            Ordered Date
                          </td>
                          <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                            Payment
                          </td>
                          <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                            Quantity
                          </td>
                        </tr>
                      </thead>
                      <tbody className="py-5">
                        <th class="lg:w-1/4 lg:py-4 sm:text-[0.55rem] lg:text-base ">
                          {i + 1}
                        </th>
                        <th class="lg:w-1/4  lg:py-4 lg:text-base ">
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                <div className="lg:text-lg  sm:text-[0.5rem] sm:font-bold">
                                  {s}
                                </div>
                              </Option>
                            ))}
                          </Select>
                        </th>
                        <th class="lg:w-1/4 lg:py-4 sm:text-[0.55rem] lg:text-base ">
                          {o?.buyer?.name}
                        </th>

                        <th class="lg:w-1/4 lg:py-4 sm:text-[0.55rem] lg:text-base ">
                          {moment(o?.createAt).fromNow()}
                        </th>
                        <th class="lg:w-1/4 lg:py-4 sm:text-[0.55rem] lg:text-base ">
                          {o?.payment.success ? "Success" : "Failed"}
                        </th>
                        <th class="lg:w-1/4 lg:py-4 sm:text-[0.55rem] lg:text-base ">
                          {o?.products?.length}
                        </th>
                      </tbody>
                    </table>
                    {o?.products.map((units, index) => (
                      <div
                        key={units._id}
                        className="flex items-center border-b border-t lg:py-4 lg:pl-4 sm:pl-4 sm:pt-2"
                      >
                        <div className="flex lg:w-1/4">
                          {/* product */}
                          <div className="lg:w-20 sm:w-12">
                            <img
                              className="lg:h-auto sm:h-20  lg:aspect-auto object-contain  "
                              src={`/api/v1/product/product-image/${units._id}`}
                              alt={units.name}
                            />
                          </div>
                          <div className="flex flex-col  ml-4 flex-grow">
                            <span className="font-bold lg:text-sm sm:text-[0.5rem]">
                              {units.name}
                            </span>
                            <span className="text-gray-600 lg:text-xs sm:text-[0.4rem]">
                              {units.description
                                ? units.description.substring(0, 50)
                                : ""}
                            </span>
                          </div>
                        </div>
                        <span className="text-center w-1/5 font-semibold lg:text-sm sm:text-[0.5rem]">
                          SAR: {units.price}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default AdminOrders;
